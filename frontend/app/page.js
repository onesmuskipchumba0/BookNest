'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function BooksPage() {
    const [books, setBooks] = useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/books')
                setBooks(response.data)
            } catch (error) {
                console.error('Error fetching books:', error)
            }
        }
        fetchBooks()
    }, [])

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
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-blue-400 text-center">Book Collection</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {books.map((book) => (
                        <div 
                            key={book._id}
                            className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden
                                     transform transition duration-300 hover:scale-102 hover:shadow-2xl
                                     hover:border-blue-500 flex flex-col"
                        >
                            {/* Image Container */}
                            <div className="relative h-80 bg-gray-900 p-4">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="w-full h-full object-contain rounded-lg
                                             transition duration-300"
                                />
                            </div>

                            {/* Content Container */}
                            <div className="p-6 flex-1 flex flex-col">
                                <h2 className="text-2xl font-bold mb-3 text-blue-400 line-clamp-2">
                                    {book.title}
                                </h2>
                                <div className="space-y-2 flex-1">
                                    <p className="text-gray-300">
                                        <span className="text-gray-400 font-semibold">Author: </span>
                                        {book.author}
                                    </p>
                                    <p className="text-gray-300">
                                        <span className="text-gray-400 font-semibold">Published: </span>
                                        {book.publishYear}
                                    </p>
                                </div>

                                {/* Buttons Container */}
                                <div className="flex space-x-4 mt-6">
                                    <button
                                        onClick={() => router.push(`/update/${book._id}`)}
                                        className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg
                                                 hover:bg-blue-700 transition duration-200
                                                 transform hover:-translate-y-1 font-medium"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(book._id)}
                                        className="flex-1 bg-red-600 text-white px-4 py-2.5 rounded-lg
                                                 hover:bg-red-700 transition duration-200
                                                 transform hover:-translate-y-1 font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}