import React, { useEffect, useState } from "react";

import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineMenuFold } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { PiBooksDuotone } from "react-icons/pi";
import { IoSearchSharp } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";

const SideMenu = () => {
  const [isTabletView, setIsTabletView] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsTabletView(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`hidden sm:block bg-[#6ab2f5] bg-opacity-[0.2] shadow-lg py-[3vh] h-[90vh] relative ${
        isTabletView
          ? "w-[90px]  transition-all duration-300 ease-in-out transform "
          : "w-[300px] transition-all duration-300 ease-in-out transform"
      } `}
    >
      <div className=" flex flex-row justify-between items-center px-6 pb-6 mt-4 h-[36px] border-b-[1px] border-[#ACD7EC]  ">
        <div
          className={`font-[600] text-[24px] text-nowrap  ${
            isTabletView
              ? "hidden transition-all duration-300 ease-in-out transform"
              : "transition-all duration-300 ease-in-out transform"
          }`}
        >
          <div className="flex flex-row items-center justify-between">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
              alt="User Icon"
              className="w-[40px] h-[40px] mr-[10px]"
            />

            <h4>User Name</h4>
          </div>
        </div>

        {isTabletView ? (
          <button onClick={() => setIsTabletView(!isTabletView)}>
            <AiOutlineMenuUnfold size={30} />
          </button>
        ) : (
          <button onClick={() => setIsTabletView(!isTabletView)}>
            <AiOutlineMenuFold size={30} />
          </button>
        )}
      </div>

      <div className="flex flex-col w-[100%] justify-between">
        <div className=" w-[100%]">
          <NavLink
            to="/search-a-book"
            className={({ isActive }) =>
              isActive
                ? "flex flex-row justify-start items-center bg-[#6ab2f5] bg-opacity-[0.4] py-2 px-6 mb-[8px] "
                : "flex flex-row justify-start items-center hover:bg-[#6ab2f5] hover:bg-opacity-[0.2] py-2 px-6 mb-[8px] "
            }
          >
            <div>
              <IoSearchSharp size={35} />
            </div>

            <h5
              className={`ml-6 font-[600] text-[18px] text-nowrap ${
                isTabletView
                  ? "hidden transition-all duration-300 ease-in-out transform "
                  : "transition-all duration-300 ease-in-out transform"
              } `}
            >
              Search Book
            </h5>
          </NavLink>

          <NavLink
            to="/all-saved-books"
            className={({ isActive }) =>
              isActive
                ? "flex flex-row justify-start items-center bg-[#6ab2f5] bg-opacity-[0.4] py-2 px-6 mb-[8px]"
                : "flex flex-row justify-start items-center hover:bg-[#6ab2f5] hover:bg-opacity-[0.2] py-2 px-6 mb-[8px] "
            }
          >
            <div>
              <PiBooksDuotone size={35} />
            </div>

            <h5
              className={`ml-6 font-[600]  text-[18px] text-nowrap ${
                isTabletView
                  ? "hidden transition-all duration-300 ease-in-out transform "
                  : "transition-all duration-300 ease-in-out transform"
              } `}
            >
              All Saved Books
            </h5>
          </NavLink>
        </div>

        <div className=" w-[100%] absolute bottom-0 pb-[8px]  ">
          <div
            className={`flex  justify-start items-center hover:bg-[#6ab2f5] hover:bg-opacity-[0.2] my-[8px] ${
              isTabletView
                ? "flex-col transition-all duration-300 ease-in-out transform "
                : "flex-row py-4 px-6 transition-all duration-300 ease-in-out transform"
            } `}
          >
            <a
              className={`${
                isTabletView
                  ? "mt-6 transition-all duration-300 ease-in-out transform "
                  : "transition-all duration-300 ease-in-out transform"
              } `}
              target="_blank"
              href="https://www.linkedin.com/in/harsh-lodhi-a54281196/"
            >
              <FaLinkedin size={26} />
            </a>
            <a
              target="_blank"
              className={`${
                isTabletView
                  ? "my-6 transition-all duration-300 ease-in-out transform "
                  : "mx-6 transition-all duration-300 ease-in-out transform"
              } `}
              href="https://github.com/harshlodhi00/"
            >
              <FaGithub size={26} />
            </a>
            <a
              className={`${
                isTabletView
                  ? "mb-6 transition-all duration-300 ease-in-out transform "
                  : "mr-6 transition-all duration-300 ease-in-out transform"
              } `}
              target="_blank"
              href="https://harshlodhi.netlify.app/"
            >
              <FaExternalLinkAlt size={24} />
            </a>
            <a
              className={`${
                isTabletView
                  ? "mb-6 transition-all duration-300 ease-in-out transform "
                  : "transition-all duration-300 ease-in-out transform"
              } `}
              target="_blank"
              href="mailto:harsh.lodhi.19e@iitram.ac.in"
            >
              <IoMdMail size={26} />
            </a>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("email");
              navigate("/login");
            }}
            className=" w-full flex flex-row justify-start items-center hover:bg-[#6ab2f5] hover:bg-opacity-[0.2] py-2 px-6 "
          >
            <div>
              <RiLogoutBoxLine size={35} />
            </div>

            <h5
              className={`ml-6 font-[600] text-[18px] text-nowrap ${
                isTabletView
                  ? "hidden transition-all duration-300 ease-in-out transform "
                  : "transition-all duration-300 ease-in-out transform"
              } `}
            >
              Logout
            </h5>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
