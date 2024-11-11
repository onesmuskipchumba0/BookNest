'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function CreatePage() {
    const router = useRouter()
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        publishYear: '',
        image: ''
    })
    const [showCard, setShowCard] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/api/books', bookData)
            setShowCard(true)
        } catch (error) {
            console.error('Error creating book:', error)
        }
    }

    const handleChange = (e) => {
        setBookData({
            ...bookData,
            [e.target.name]: e.target.value
        })
    }

    const handleAddAnother = () => {
        setBookData({
            title: '',
            author: '',
            publishYear: '',
            image: ''
        })
        setShowCard(false)
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center m-0 p-0">
            <div className="max-w-4xl mx-auto p-4 w-full -mt-16">
                {!showCard ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-2 text-gray-300">Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={bookData.title}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-800 border border-gray-700 
                                         text-gray-100 focus:border-blue-500 focus:ring-1 
                                         focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-gray-300">Author:</label>
                            <input
                                type="text"
                                name="author"
                                value={bookData.author}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-800 border border-gray-700 
                                         text-gray-100 focus:border-blue-500 focus:ring-1 
                                         focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-gray-300">Publish Year:</label>
                            <input
                                type="number"
                                name="publishYear"
                                value={bookData.publishYear}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-800 border border-gray-700 
                                         text-gray-100 focus:border-blue-500 focus:ring-1 
                                         focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-gray-300">Image URL:</label>
                            <input
                                type="url"
                                name="image"
                                value={bookData.image}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-800 border border-gray-700 
                                         text-gray-100 focus:border-blue-500 focus:ring-1 
                                         focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded 
                                     hover:bg-blue-700 transition duration-200"
                        >
                            Add Book
                        </button>
                    </form>
                ) : (
                    <div className="border border-gray-700 rounded-lg p-6 bg-gray-800 shadow-xl">
                        <div className="flex gap-6">
                            {/* Left side - Image */}
                            <div className="w-1/3">
                                <img
                                    src={bookData.image}
                                    alt={bookData.title}
                                    className="w-full h-72 object-contain rounded"
                                />
                            </div>
                            
                            {/* Right side - Content */}
                            <div className="w-2/3 flex flex-col">
                                <h2 className="text-3xl font-bold mb-4 text-blue-400">
                                    {bookData.title}
                                </h2>
                                <p className="mb-2 text-lg text-gray-300">
                                    <strong className="text-gray-100">Author:</strong> {bookData.author}
                                </p>
                                <p className="mb-4 text-lg text-gray-300">
                                    <strong className="text-gray-100">Published:</strong> {bookData.publishYear}
                                </p>
                                
                                {/* Push buttons to bottom of flex container */}
                                <div className="mt-auto flex space-x-4">
                                    <button
                                        onClick={handleAddAnother}
                                        className="bg-green-600 text-white px-6 py-3 rounded 
                                                 hover:bg-green-700 transition duration-200 text-lg"
                                    >
                                        Add Another Book
                                    </button>
                                    <button
                                        onClick={() => router.push('/')}
                                        className="bg-gray-700 text-white px-6 py-3 rounded 
                                                 hover:bg-gray-600 transition duration-200 text-lg"
                                    >
                                        Back to Home
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
