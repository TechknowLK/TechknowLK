import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";

export const NavBar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Service", path: "/services" },
    { name: "Product", path: "/products" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
    
  ];

  return (
    <nav className="w-full bg-gradient-to-r from-[#00213A] to-[#024d68] border-b border-[#00213A] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-2">
        {/* Logo Section */}
        <div className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center text-white font-bold text-lg">
          <img src={logo} alt="Logo" className="w-[50px] h-[50px]" />
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-row items-center ">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative px-7 py-2 pb-5  text-[18px] font-normal transition duration-200 ${
                    isActive
                      ? "text-white bg-white/5 after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-white after:left-0 after:bottom-[-3px]"
                      : "text-gray-200 hover:text-white hover:bg-white/10"
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
