"use client";
import { AlignJustify, X } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { Sidebar } from "./sidebar";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAbout, SetAbout] = useState<boolean>(false)
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const About = () => {
    SetAbout(!isAbout)
  }


  return (
    <div className="relative bg-[#18252F] text-[#ECF5FB] z-[100]  leading-[100%] px-7 py-5">
      {/* Header Container */}
      <div className=" flex gap-2 justify-between items-center">
        <div className="mb-4 h-[20px]"
        onClick={About}
        >
          <Sidebar/>
        </div>
        {/* <span className="text-[25px] lg:mr-[1120px] font-[700] sm:mr-[12px]">ECRAMME</span> */}
        <div className="h-14 mt-[-17px] lg:mr-[1150px] font-[700] sm:mr-[120px] ">
        <Image
                  height={400}
                  width={200}
                  src="/images/ecramme_logo.png"
                  alt={"logo"}
                  className="py-0 px-[-1px] pb-0 mt-[-40px] ml-10 mb-0 mt-10"
                />
        </div>

      </div>

    
    </div>
  );
};

export { Header };
