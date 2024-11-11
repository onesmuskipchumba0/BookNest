"use client";
import Link from 'next/link'
import React from 'react'
import { BiBookAdd, BiSearch } from 'react-icons/bi'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BiHomeAlt2 } from 'react-icons/bi'

const Navbar = () => {
const [search, setSearch] = React.useState("");
  return (
    <nav className='flex flex-col space-y-4 sm:flex-col md:flex-row lg:flex-row justify-between items-center p-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg'>
        <Link 
          href="/" 
          className='flex justify-center  items-center gap-2 text-xl font-bold hover:text-blue-400 transition-colors duration-200'
        >
            <BiHomeAlt2 className="text-2xl" />
            Book Nest
        </Link>
        {/* Search Bar */}
        <div className='flex justify-center sm:w-full md:w-1/2 lg:w-1/2 w-full items-center gap-2'>
            <input 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search...' 
                className='p-2 rounded-md w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
            />
            <Link href={{pathname:`/search`, query:{ q: search }}}>
            <BiSearch 
                size={24} 
                
                className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors duration-200"
            />
            </Link>
        </div>
        <div className='flex gap-6'>
            <Link 
              href="/create" 
              className='flex items-center gap-2 hover:text-blue-400 hover:scale-105 transition-all duration-200 px-3 py-1 rounded-md hover:bg-gray-700'
            >
                <BiBookAdd className="text-xl" />
                Create
            </Link>
            
        </div>
    </nav>
  )
}

export default Navbar