import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // modern icons
import logo from "/assets/Img/logo02.png";

export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Service", path: "/services" },
    { name: "Product", path: "/products" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#012A3A]/90 backdrop-blur-md shadow-md transition-all duration-300">
      <div className="w-full mx-auto flex items-center justify-between px-6 md:px-[5%] py-3">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 rounded-full   scale-150"
          />
          <span className="text-white font-bold text-xl tracking-wide">
            Techknow<span className="text-[#33A1E0]">LK</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-[17px] font-medium transition-all duration-200 
                  ${
                    isActive
                      ? "text-[#33A1E0] after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#33A1E0] after:left-0 after:bottom-0"
                      : "text-gray-300 hover:text-white hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-[2px] hover:after:bg-white hover:after:left-0 hover:after:bottom-0"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden absolute top-[68px] left-0 w-full bg-[#012A3A]/95 backdrop-blur-md shadow-md transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-3 py-4">
          {navLinks.map((link) => (
            <li key={link.name} onClick={() => setMenuOpen(false)}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block px-4 py-2 text-lg font-medium transition ${
                    isActive
                      ? "text-[#33A1E0]"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
