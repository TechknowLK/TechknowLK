import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './screens/Home';
import { AboutUs } from './screens/AboutUs';
import Services from './screens/Services';
import Products from './screens/Products';
import Blogs from './screens/Blogs';
import Contact from './screens/Contact';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/services' element={<Services />} />
        <Route path='/products' element={<Products />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </Router>
  )
}
