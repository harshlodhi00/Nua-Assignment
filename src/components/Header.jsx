import React from "react";
import { IoNotifications } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { IoMail } from "react-icons/io5";
import { IoMenuSharp } from "react-icons/io5";

const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center py-4 px-[3vw] border-b-[1px] fixed top-0 w-[100%] bg-white z-[2]">
      <div className="flex flex-row items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3389/3389081.png"
          alt="book"
          className="mr-6 object-contain h-full w-[40px]"
        />

        <h3 className="font-[600]">Book Management Dashboard</h3>
      </div>

      <div className="flex flex-row items-center justify-center gap-5 cursor-pointer ">
        <div>
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
          className="w-[35px] h-[35px] rounded-full"
        />

        <div>
          <IoMenuSharp size={25} />
        </div>
      </div>
    </div>
  );
};

export default Header;
