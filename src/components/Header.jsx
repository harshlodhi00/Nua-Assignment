import React, { useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { IoMail } from "react-icons/io5";
import { IoMenuSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";

import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";

const Header = () => {
  const [SideMenuOpen, setSideMenuOpen] = useState(false);

  return (
    <div className="flex flex-row justify-between items-center py-4 px-[3vw] border-b-[1px] fixed top-0 w-[100%] bg-white z-[2]">
      <div className="flex flex-row items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3389/3389081.png"
          alt="book"
          className=" mr-2 sm:mr-6 object-contain h-full w-[40px]"
        />

        <h3 className="font-[600]">Book Management Dashboard</h3>
      </div>

      <div className="flex flex-row items-center justify-center gap-3 sm:gap-5 cursor-pointer ">
        <div className=" hidden sm:block ">
          <IoSearch size={25} />
        </div>
        <div className="relative">
          <IoNotifications size={25} />
          <div className=" absolute top-[-6px] right-[-6px] block w-[18px] h-[18px] rounded-full bg-red-500 text-center text-[12px] text-white">
            1
          </div>
        </div>
        <div className="relative">
          <IoMail size={25} />
          <div className=" absolute top-[-6px] right-[-6px] block w-[18px] h-[18px] rounded-full bg-green-500 text-center text-[12px] text-white">
            2
          </div>
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
          alt="User Icon"
          className="w-[35px] h-[35px] rounded-full hidden sm:block"
        />

        <div onClick={() => setSideMenuOpen(!SideMenuOpen)}>
          <IoMenuSharp size={25} />
        </div>
      </div>

      {SideMenuOpen && (
        <div className="flex sm:hidden flex-col justify-start items-center fixed top-0 right-0 gap-2 h-full bg-[#6ab2f5] bg-opacity-[0.8] px-4 py-10 ">
          <div className="flex flex-row justify-end items-center w-[100%] mb-4">
            <button onClick={() => setSideMenuOpen(!SideMenuOpen)}>
              <IoIosCloseCircle size={25} />
            </button>
          </div>

          <Link
            className="bg-[#6ab2f5] px-4 py-2 rounded-md "
            to="/search-a-book"
          >
            Search A Book
          </Link>
          <Link
            className="bg-[#6ab2f5] px-4 py-2 rounded-md"
            to="/all-saved-books"
          >
            All Saved Book
          </Link>

          <div className="flex flex-row items-center justify-between w-[100%] mt-12  ">
            <a
              target="_blank"
              href="https://www.linkedin.com/in/harsh-lodhi-a54281196/"
            >
              <FaLinkedin size={26} />
            </a>
            <a target="_blank" href="https://github.com/harshlodhi00/">
              <FaGithub size={26} />
            </a>
            <a target="_blank" href="https://harshlodhi.netlify.app/">
              <FaExternalLinkAlt size={24} />
            </a>
            <a target="_blank" href="mailto:harsh.lodhi.19e@iitram.ac.in">
              <IoMdMail size={26} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
