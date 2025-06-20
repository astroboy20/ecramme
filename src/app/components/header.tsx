"use client";
import { AlignJustify, X, Sun, Moon } from "lucide-react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sidebar } from "./sidebar";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLightMode, setIsLightMode] = useState<boolean>(false); 

  useEffect(() => {
   
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light") {
      setIsLightMode(true);
      document.documentElement.classList.add("light"); 
    } else {
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleLightMode = () => {
    setIsLightMode((prev) => !prev);
    document.documentElement.classList.toggle("light"); 
    localStorage.setItem("theme", !isLightMode ? "light" : "dark"); 
  };

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  

  return (
    <div className={`relative border-b-4 border-blue-400 bg-[#18252F] text-[#ECF5FB] z-[100] leading-[100%] px-7 py-5 ${isLightMode ? 'bg-[#F5F5F5] text-[#121212]' : ''}`}>
      {/* Header Container */}
      <div className=" flex gap-2 justify-between items-center">
        <div className={`mb-4 h-[20px] ${isLightMode ? 'bg-[#F5F5F5] text-[#121212]' : ''}`} >
          <Sidebar isLightMode={isLightMode} /> 
        </div>
        {/* <span className="text-[25px] lg:mr-[1120px] font-[700] sm:mr-[12px]">ECRAMME</span> */}
       <div className="h-14 lg:gap-x-4 lg:items-start  flex lg:top-[5px] lg:mr-[1150px] font-[700] sm:mr-[120px] sm:mt-[-10px] sm:p-0 sm:h-10 w-[150px] mt-[-10px] mr-[100px] ">
  <Image
    height={700}
    width={700}
    src="/images/ecramme_logo.png"
    alt={"logo"}
  className="py-2 px-[-1px] pb-0 mt-[-50px] ml-10 mb-0 "
  />
  <Image
    height={700}
    width={400}
    src="/images/image1.jpg"
    alt={"logo2"}
  //  className="py-0 px-[-1px] pb-0 mt-[-40px] ml-10 mb-0 "
  />
</div>

        <button
          onClick={toggleLightMode}
          className="rounded-full  focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 transition-colors duration-70"
        >
          {isLightMode ? <Moon className="h-5 w-5 text-gray-700" /> : <Sun className="h-5 w-5 text-yellow-400" />}
        </button>
      </div>
    </div>
  );
};

export { Header };