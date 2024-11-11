'use client'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import axios from 'axios'
import { AiOutlineSave, AiOutlineClose } from 'react-icons/ai'

export default function EditPage() {
  const router = useRouter()
  const {id} = useParams()
  /* Fetch current book data */
  const [book, setBook] = React.useState(null)
  const [title, setTitle] = React.useState('')
  const [author, setAuthor] = React.useState('')
  const [publishYear, setPublishYear] = React.useState('')
  React.useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`)
        const bookData = response.data
        setBook(bookData)
        setTitle(bookData.title)
        setAuthor(bookData.author)
        setPublishYear(bookData.publishYear)
      } catch (error) {
        alert('Error fetching book details')
      }
    }
    fetchBook()
  }, [id])
  const handleUpdate =  async () => {
    if (!title || !author || !publishYear) {
      alert('Please fill in all fields')
      return
    }
    try {
      await axios.put(`http://localhost:5000/api/books/${id}`, {
        title, author, publishYear, image: book.image
      })
      alert('Book updated successfully')
      router.push('/')
    } catch (error) {
      alert('Error updating book: ' + error.message)
    }
  }
  const handleCancel = () => {
    router.push('/')
  }
  return (
    <div className='min-h-screen bg-gray-900 p-8'>
      <div className='max-w-6xl mx-auto'>
        {book && (
          <div className='grid md:grid-cols-2 gap-8 bg-gray-800 p-8 rounded-lg shadow-xl'>
            {/* Previous Values */}
            <div className='flex flex-col items-center space-y-4'>
              <div className='w-1/2 h-[400px] bg-gray-700 rounded-lg overflow-hidden'>
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className='m-auto pt-20 object-contain' 
                />
              </div>
              <div className='text-center'>
                <p className='text-2xl font-bold text-white mb-2'>{book.title}</p>
                <p className='text-xl text-gray-300 mb-1'>{book.author}</p>
                <p className='text-md text-gray-400'>{book.publishYear}</p>
              </div>
            </div>

            {/* New Values */}
            <div className='flex flex-col space-y-6'>
              <h1 className='text-3xl font-bold text-white text-center mb-4'>Update Book</h1>
              
              <div className='space-y-4'>
                <input 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  type='text' 
                  placeholder='Title' 
                  className='w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all'
                />
                <input 
                  value={author} 
                  onChange={(e) => setAuthor(e.target.value)} 
                  type='text' 
                  placeholder='Author' 
                  className='w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all'
                />
                <input 
                  value={publishYear} 
                  onChange={(e) => setPublishYear(e.target.value)} 
                  type='text' 
                  placeholder='Publish Year' 
                  className='w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all'
                />
              </div>

              <div className='flex gap-4 justify-center pt-4'>
                <button 
                  onClick={handleUpdate} 
                  className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors'
                >
                  <AiOutlineSave className="text-xl" />
                  Save Changes
                </button>
                <button 
                  onClick={handleCancel} 
                  className='flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors'
                >
                  <AiOutlineClose className="text-xl" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
