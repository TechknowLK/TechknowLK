import React from 'react'
import { NavBar } from '../components/NavBar'
import Footer from '../components/Footer'
import Blog from '../components/Blogs/BlogsViewSection'
import BlogHeroSection from '../components/Blogs/BlogHeroSection'
import SEOHead from '../components/SEOHead'

export default function Blogs() {
  return (
    <div>
        <SEOHead 
        title="Tech Blog & Articles - Latest Technology Trends | TechKnow Lanka Engineers"
        description="Stay updated with the latest technology trends, IoT innovations, software development insights, and digital transformation strategies. Expert articles and tech news from TechKnow Lanka's industry professionals."
        keywords="tech blog, technology articles, IoT trends, software development blog, digital transformation insights, tech news Sri Lanka, technology updates, automation trends, smart solutions blog, tech industry news"
        url="https://techknowlk.com/blogs"
      />
        <BlogHeroSection/>
        <Blog/>
        
    </div>
  )
}
