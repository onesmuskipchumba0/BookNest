'use client'
import { useParams } from 'next/navigation'
import React from 'react'
import axios from 'axios'
export default function EditPage() {
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
      window.location.href = '/'
    } catch (error) {
      alert('Error updating book: ' + error.message)
    }
  }
  const handleCancel = () => {
    window.location.href = '/'
  }
  return (
    <div className='flex flex-row mt-10 justify-center w-full'>
      <div className='flex flex-col  h-full w-full'>
        {/* Previous Values */}
        {book && (
          <div className='flex flex-row justify-center w-full'>
          <div className='flex flex-col items-center space-y-3 justify-center  h-full w-1/2'>
            <img src={book.image} alt={book.title} className='w-full h-[300px] object-contain' />
            <p className='text-2xl font-bold'>{book.title}</p>
            <p className='text-xl'>{book.author}</p>
            <p className='text-md'>{book.publishYear}</p>
          </div>
          {/* New Values */}
          <div className='flex flex-col items-center space-y-3 justify-center  h-full w-1/2'>
            <h1 className='text-2xl font-bold'>Update Book</h1>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type='text' placeholder='Title' className='w-full p-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none' />
            <input value={author} onChange={(e) => setAuthor(e.target.value)} type='text' placeholder='Author' className='w-full p-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none' />
            <input value={publishYear} onChange={(e) => setPublishYear(e.target.value)} type='text' placeholder='Publish Year' className='w-full p-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none' />
            <div className='flex flex-row justify-center w-full'>
              <button onClick={handleUpdate} className='bg-blue-400 text-white p-2 rounded-md'>Update Book</button>
              <button onClick={handleCancel} className='bg-red-400 text-white p-2 rounded-md'>Cancel</button>
            </div>
          </div>
          </div>
        )}
        {/* Submit Button */}
      </div>
    </div>
  )
}
