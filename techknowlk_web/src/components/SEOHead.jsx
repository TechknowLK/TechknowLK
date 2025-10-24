import React, { useEffect } from 'react';

const SEOHead = ({ 
  title = "TechKnowLK - Smart Technology Solutions",
  description = "Transform your business with TechKnowLK's cutting-edge technology solutions. Specializing in IoT, software development, networking, and digital transformation services in Sri Lanka.",
  keywords = "TechKnowLK, Techknow Lanka Engineers , technology solutions, IoT, software development, networking, digital transformation, smart solutions, automation, tech consulting, Sri Lanka",
  image = "https://techknowlk.com/techknow_lk_64x64_logo.png", 
  url = "https://techknowlk.com",
  type = "website"
}) => {
  useEffect(() => {
    // --- Set document title ---
    document.title = title;

    // --- Update or create meta tags ---
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let metaTag = document.querySelector(selector);
      
      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (property) {
          metaTag.setAttribute('property', name);
        } else {
          metaTag.setAttribute('name', name);
        }
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };


    // --- Canonical ---
     const updateCanonical = (href) => {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', href);
    };

    // --- Remove existing JSON-LD (if re-render) ---
    const existingJsonLd = document.querySelector('script[type="application/ld+json"]');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    // --- Inject JSON-LD (structured data) ---
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "TechKnowLK",
      "url": url,
      "logo": image,
      "sameAs": [
        "https://www.facebook.com/share/16M8QTiZDD/",
        "https://www.instagram.com/tech_knowlk?igsh=dnN6ODRjOTl5a3dn",
        "https://www.linkedin.com/company/techknowlk/"
      ]
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    // --- Apply meta tags ---
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:site_name', 'TechKnowLK', true);
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateCanonical(url);

  }, [title, description, keywords, image, url, type]);

  return null;
};

export default SEOHead;