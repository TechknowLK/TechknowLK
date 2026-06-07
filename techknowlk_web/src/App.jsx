import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './screens/Home';
import { AboutUs } from './screens/AboutUs';
import Services from './screens/Services';
import Projects from './screens/Projects';
import Products from './screens/Products';
import ProductDetails from './screens/ProductDetails';
import Blogs from './screens/Blogs';
import Contact from './screens/Contact';
import { NavBar } from './components/NavBar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CartDrawer from './components/CartDrawer';
import NotFound from './screens/NotfoundPage';
import SmoothScroll from './components/SmoothScroll';
import { AuthProvider } from './lib/AuthContext';
import Login from './screens/Login';
import Register from './screens/Register';
import Profile from './screens/Profile';

import { ToastContainer } from "react-toastify";

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="bottom-center" theme="colored" />
        <SmoothScroll />
        <ScrollToTop />
        <NavBar />
        <CartDrawer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/services' element={<Services />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer/>
      </Router>
    </AuthProvider>
  )
}
