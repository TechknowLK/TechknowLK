import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const projects = [
  {
    title: "Interlock Shop System",
    description: "Custom ERP solution integrating inventory management, sales tracking, and financial reporting with real-time analytics.",
    overview: "A comprehensive ERP solution designed for interlock manufacturing and sales businesses. This system streamlines daily operations by integrating inventory tracking, sales management, and financial reporting into a single platform. It provides real-time insights into stock levels and sales performance, helping business owners make informed decisions.",
    features: ["Real-time Inventory Tracking", "Automated Billing & Invoicing", "Financial Reporting Dashboard", "Supplier Management", "Multi-user Access Control"],
    images: ["/assets/Img/ProjectImages/interlock_system_01.jfif", "/assets/Img/ProjectImages/interlock_system_02.jfif", "/assets/Img/ProjectImages/interlock_system_03.jfif"],
    technologies: ["JavaFX", "Java", "MySQL"],
    category: "Software Solutions",
  },
  {
    title: "Loan Management System",
    description: "Smart financial solution for managing money collections, client verifications, and data analysis with automated reporting and insights.",
    overview: "This Loan Management System is tailored for micro-finance institutions. It automates the entire loan lifecycle from application to disbursement and repayment. The system includes robust tools for client verification, payment scheduling, and arrears management, ensuring efficient portfolio management.",
    features: ["Client Verification Module", "Automated Repayment Scheduling", "Arrears & Penalty Calculation", "Daily Collection Reports", "SMS Reminders for Due Payments"],
    images: ["/assets/Img/ProjectImages/loan_system_01.jpg", "/assets/Img/ProjectImages/loan_system_02.jpg", "/assets/Img/ProjectImages/loan_system_03.jpg"],
    technologies: ["Java", "MySQL"],
    category: "Software Solutions",
  },
  {
    title: "Smart Home System",
    description: "IoT-based home automation system with remote control, energy management, and security features accessible via mobile app.",
    overview: "A state-of-the-art home automation system that allows users to control appliances, lighting, and security systems remotely. Built on a robust IoT architecture, it features energy consumption monitoring and automated scheduling to enhance convenience and energy efficiency.",
    features: ["Remote Appliance Control", "Energy Usage Monitoring", "Automated Lighting Schedules", "Security Alert System", "Mobile App Integration"],
    images: ["/assets/Img/ProjectImages/smart_home_system_03.jfif", "/assets/Img/ProjectImages/smart_home_system_02.jfif", "/assets/Img/ProjectImages/smart_home_system_01.jfif"],
    technologies: ["Arduino", "Raspberry Pi", "MQTT"],
    category: "IoT & Automation",
  },
  {
    title: "Pharmacy Management System",
    description: "Comprehensive pharmacy platform for handling prescriptions, inventory, and billing with secure role-based access and real-time stock tracking.",
    overview: "Specific for retail pharmacies, this system ensures accurate inventory management and fast point-of-sale functionality. It handles prescription tracking, expiry date alerts, and reorder level notifications to prevent stockouts and reduce wastage.",
    features: ["Prescription Management", "Expiry Date Tracking & Alerts", "Fast POS Billing", "Drug Interaction Warnings", "Inventory Reorder Notifications"],
    images: ["/assets/Img/ProjectImages/ph_System_01.jpeg", "/assets/Img/ProjectImages/ph_System_02.png", "/assets/Img/ProjectImages/ph_System_03.png"],
    technologies: ["JavaFX", "Java", "MySQL"],
    category: "Software Solutions",
  },
  {
    title: "CCTV Surveillance System",
    description: "Advanced security solution with monitoring capabilities, threat detection, and real-time alerts.",
    overview: "A complete end-to-end security setup involving high-definition IP cameras and Network Video Recorders (NVR). This system provides 24/7 surveillance with motion detection capabilities and remote viewing options for business owners and homeowners.",
    features: ["HD Video Recording", "Motion Detection Alerts", "Remote Mobile Viewing", "Night Vision Capabilities", "Cloud Storage Backup"],
    images: ["/assets/Img/ProjectImages/cctv_setup_01.jfif", "/assets/Img/ProjectImages/cctv_setup_02.jfif"],
    technologies: ["IP Cameras", "NVR", "Networking"],
    category: "Electrical & Networking",
  },
  {
    title: "Tourism website",
    description: "Interactive tourism platform with travel packages, booking management, and user reviews.",
    overview: "An engaging web platform for a travel agency, featuring immersive destination galleries and an easy-to-use booking engine. Users can browse travel packages, read reviews, and customize their itineraries. The backend provides a cms for managing content and bookings.",
    features: ["Dynamic Booking Engine", "Destination Galleries", "User Reviews & Ratings", "Secure Payment Gateway", "Admin Content Management System"],
    images: ["/assets/Img/ProjectImages/tourism_01.jfif", "/assets/Img/ProjectImages/tourism_02.jfif", "/assets/Img/ProjectImages/tourism_03.jfif"],
    technologies: ["React", "Node.js", "MongoDB"],
    category: "Software Solutions",
    demoUrl: "https://tourinlanka.vercel.app/",
  },
  {
    title: "IT Consulting",
    description: "Strategic IT consulting services to optimize infrastructure, enhance cybersecurity, and drive digital transformation for business growth.",
    overview: "Professional IT consultancy aimed at helping businesses align their technology strategy with business goals. Services include infrastructure auditing, cybersecurity risk assessment, and digital transformation roadmaps.",
    features: ["Infrastructure Audits", "Cybersecurity Assessments", "Digital Transformation Strategy", "Cloud Migration Planning", "IT Support & Maintenance"],
    images: ["/assets/Img/ProjectImages/It_consulting_01.jpg", "/assets/Img/ProjectImages/It_consulting_02.jpg"],
    technologies: ["IT Strategy", "Cybersecurity", "Cloud Solutions"],
    category: "IT Consulting",
  },
  {
    title: "Bilingual Case Management Mobile App",
    description: "Arbitem is a mobile-based case management system designed to transform how loan-related legal cases are tracked and handled.",
    overview: "Arbitem revolutionizes legal case management for financial institutions. It provides a mobile-first interface for legal officers to track case progress, manage documentation, and communicate with clients. The system ensures all legal proceedings are documented and easily accessible.",
    features: ["Case Progress Timeline", "Document Repository", "Client Communication Tools", "Hearing Date Reminders", "Secure Data Encryption"],
    images: ["/assets/Img/ProjectImages/arbitem_01.png", "/assets/Img/ProjectImages/arbitem_02.png"],
    technologies: ["Flutter", "Express js"],
    category: "Software Solutions",
  },
  {
    title: "Computer shop website",
    description: "Products & Accessories accurate stock management. Sales, Invoices & Profit real-time track. Customer details & history securely store. Daily shop work fast, simple & professional.",
    overview: "STC Computer Shop is a specialized e-commerce platform engineered to bridge the gap between complex inventory management and a high-end customer purchasing experience. Unlike standard retail templates, this project serves as a comprehensive 'Sales Machine' that turns a standard hardware store into a professional digital storefront. The core innovation of the platform is the Custom PC Builder Engine. This feature transforms the user journey by allowing customers to design their own machines with live compatibility checks, see real-time pricing updates as components are swapped, and instantly generate and download formal PDF Quotations. On the backend, the application solves the nightmare of managing thousands of technical products with a smart Inventory Command Center. Shop owners can utilize advanced Excel/CSV import tools to update stock levels and prices en masse, ensuring the shop is always up to date. The entire platform is wrapped in a high-performance 'Dark Mode' aesthetic, optimized with React and Vite to ensure zero-lag browsing even with heavy image loads.",
    features: [
      "Step-by-step interactive component selection that guides customers through building a custom rig",
      "Real-time price calculation that updates totals instantly as parts are added or removed",
      "One-click professional PDF quotation generator with valid dates and branding",
      "Smart logic system that categories parts (CPU, GPU, RAM) to ensure component compatibility",
      "Persistent shopping cart system and Wishlist functionality for long-term user engagement",
      "Visual dashboard analytics displaying total stock value, category distribution, and sales trends",
      "'Serve as Part' toggle that allows admins to instantly mark any inventory item as compatible with the PC Builder"
    ],
    images: ["/assets/Img/ProjectImages/computer_shop_01.PNG", "/assets/Img/ProjectImages/computer_shop_02.PNG"],
    technologies: ["React", "Vite", "Next.js"],
    category: "Software Solutions",
    demoUrl: "https://p09demo.techknowlk.com/",
  },
  {
    title: "Learning Management System (LMS)",
    description: "Comprehensive Learning Management System for student progress tracking, course delivery, and simple administration. this system specially design for A/L teachers ",
    overview: "This LMS is a modern learning platform built specifically for the Sri Lankan A/L education system. It features a fully bilingual interface (Sinhala & English), so students learn comfortably in their preferred language. Powered by Next.js 16, React 19, and MySQL, the system delivers fast, secure, enterprise-level performance. Teachers can easily manage content using a visual, drag-and-drop system—no technical skills needed. More than just an LMS, it supports multiple institutes, smart timetabling, and a free-resources marketing system that helps attract new students through “try-before-you-buy” content.",
    features: [
      "Full bilingual support (English & Sinhala)",
      "No-code customisation with visual tools",
      "Centralised multi-institute management",
      "Student rankings and achievements showcase",
      "Smart timetable with conflict detection",
      "Free lessons and quizzes for student acquisition",
      "Dynamic feature builder",
      "Secure storage for videos, PDFs, past papers, and quizzes"
    ],
    images: ["/assets/Img/ProjectImages/lms_01.PNG", "/assets/Img/ProjectImages/lms_02.PNG"],
    technologies: ["Next.js 16", "React 19", "MySQL"],
    category: "Software Solutions",
  }
];

async function main() {
  console.log('Start seeding...');
  
  // Optional: clear existing projects to avoid duplicates if run multiple times
  await prisma.project.deleteMany({});
  console.log('Cleared existing projects.');

  for (const p of projects) {
    const project = await prisma.project.create({
      data: p
    });
    console.log(`Created project with id: ${project.id}`);
  }
  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
