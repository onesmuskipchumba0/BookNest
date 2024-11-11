'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

export default function SearchPage() {
    const query = useSearchParams().get('q');
    const [books, setBooks] = React.useState([])
    const router = useRouter()

    const fetchBooks = async () => {
        const response = await axios.get(`http://localhost:5000/api/books/search?q=${query}`)
        setBooks(response.data)
    }

    React.useEffect(() => {
        fetchBooks()
    }, [query])

    const handleDelete = async (id) => {
      if (!id) {
          console.error('Invalid book ID')
          return
      }
      try {
          console.log('Deleting book with ID:', id)
          const response = await axios.delete(`http://localhost:5000/api/books/${id}`)
          if (response.status === 200) {
              setBooks(books.filter(book => book._id !== id))
          } else {
              throw new Error('Failed to delete book')
          }
      } catch (error) {
          console.error('Error deleting book:', error.response?.data || error.message)
          alert('Failed to delete book. Please try again.')
      }
  }
    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <h1 className="text-3xl font-bold mb-6 text-white">Search Results for: {query}</h1>
            <div className="grid gap-4">
                {books.map((book) => (
                    <div key={book._id} className="bg-gray-800 rounded-lg shadow-lg p-4 flex text-white">
                        {/* Image Section */}
                        <div className="w-48 h-64 flex-shrink-0 bg-gray-700 rounded-md overflow-hidden">
                            <img 
                                src={book.image || '/placeholder-book.jpg'} 
                                alt={book.title}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="ml-6 flex-grow">
                            <h2 className="text-xl font-semibold mb-2 text-white">{book.title}</h2>
                            <p className="text-gray-300 mb-2">By {book.author}</p>
                            <p className="text-gray-400">Published: {book.publishYear}</p>

                            {/* Buttons */}
                            <div className="mt-4 flex gap-3">
                                <button
                                    onClick={() => router.push(`/update/${book._id}`)}
                                    className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                                >
                                    <AiOutlineEdit /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(book._id)}
                                    className="flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                                >
                                    <AiOutlineDelete /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
