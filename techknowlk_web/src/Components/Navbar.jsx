import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="p-4 bg-gray-800 text-white">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-blue-300">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-300">About</Link>
          </li>
        </ul>
    </nav>
    
  )
}

export default Navbar