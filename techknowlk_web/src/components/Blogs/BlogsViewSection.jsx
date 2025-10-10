import React, { useEffect } from "react";
import BlogCard from "./BlogCard";
import AOS from "aos";
import "aos/dist/aos.css";

const blogPosts = [
  {
    id: 1,
    title: "The Future of IoT in Industrial Automation",
    excerpt:
      "Discover how Internet of Things technology is revolutionizing manufacturing processes and increasing operational efficiency across industries.",
    category: "IoT & Automation",
    date: "March 15, 2024",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    slug: "future-of-iot-industrial-automation",
  },
  {
    id: 2,
    title: "Building Scalable Software Solutions for Modern Businesses",
    excerpt:
      "Learn the best practices for developing enterprise-grade software that grows with your business needs and adapts to changing market demands.",
    category: "Software Solutions",
    date: "March 10, 2024",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    slug: "building-scalable-software-solutions",
  },
  {
    id: 3,
    title: "Network Security Best Practices for 2024",
    excerpt:
      "Essential strategies to protect your business infrastructure from emerging cyber threats and ensure data integrity in an interconnected world.",
    category: "Electronic & Networking",
    date: "March 5, 2024",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    slug: "network-security-best-practices-2024",
  },
  {
    id: 4,
    title: "AI and Machine Learning in Business Operations",
    excerpt:
      "Explore how artificial intelligence is transforming decision-making processes and automating complex business operations for better outcomes.",
    category: "Innovation",
    date: "February 28, 2024",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    slug: "ai-machine-learning-business-operations",
  },
  {
    id: 5,
    title: "Smart Home Technology: From Concept to Reality",
    excerpt:
      "A comprehensive guide to implementing smart home solutions that enhance comfort, security, and energy efficiency for residential spaces.",
    category: "IoT & Automation",
    date: "February 20, 2024",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
    slug: "smart-home-technology-concept-to-reality",
  },
  {
    id: 6,
    title: "Digital Transformation Strategies for SMEs",
    excerpt:
      "Practical approaches for small and medium enterprises to embrace digital technologies and compete effectively in the modern marketplace.",
    category: "Consultation",
    date: "February 15, 2024",
    image:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
    slug: "digital-transformation-strategies-smes",
  },
];

const Blog = () => {
  useEffect(() => {
    AOS.init({ duration: 500, once: true, easing: "ease-in-out" });
    AOS.refresh();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <section className="py-16 flex-1">
        <div className="container mx-auto px-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div
                key={post.id}
                data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
              >
                <BlogCard {...post} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
