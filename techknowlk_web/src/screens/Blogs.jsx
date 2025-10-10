import React from 'react'
import { NavBar } from '../components/NavBar'
import Footer from '../components/Footer'
import Blog from '../components/Blogs/BlogsViewSection'
import BlogHeroSection from '../components/Blogs/BlogHeroSection'

export default function Blogs() {
  return (
    <div>
        <NavBar/>
        <BlogHeroSection/>
        <Blog/>
        <Footer/>
    </div>
  )
}
