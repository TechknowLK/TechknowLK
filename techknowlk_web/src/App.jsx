import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './screens/Home';
import { AboutUs } from './screens/AboutUs';
import Services from './screens/Services';
import Products from './screens/Products';
import Blogs from './screens/Blogs';
import Contact from './screens/Contact';
import { NavBar } from './components/NavBar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import NotFound from './screens/NotfoundPage';
import SmoothScroll from './components/SmoothScroll';

import { ToastContainer } from "react-toastify";

export const App = () => {
  return (
    <Router>
      <ToastContainer position="bottom-center" theme="colored" />
      <SmoothScroll />
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/services' element={<Services />} />
        <Route path='/products' element={<Products />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer/>
    </Router>
  )
}
