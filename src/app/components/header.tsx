"use client";
import { AlignJustify, X } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative bg-[#18252F] text-[#ECF5FB]  leading-[100%] px-7 py-5">
      {/* Header Container */}
      <div className="flex justify-between items-center">
        <span className="text-[25px] font-[700]">ECRAMME</span>
        <button onClick={handleIsOpen} className="cursor-pointer">
          {isOpen ? <X /> : <AlignJustify />}
        </button>
      </div>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-full left-[75%] w-fit bg-[white] text-black p-10 shadow-lg rounded-b-lg transition-all duration-300 z-[100000] ${
          isOpen
            ? " opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-5"
        }`}
      >
        <div className="flex flex-col gap-7">
          <h2 className="text-[24px] font-[700]">ECRAMME</h2>
          <p>
            Helps to track extreme weather events, analyze historical trends,
            and receive early warnings, supporting decision-making for climate
            resilience and disaster preparedness.
          </p>
          <div className="w-[200px]  ">
            <Image
              src="/images/a.svg"
              width={50}
              height={50}
              alt="brand-logo"
              className="h-[40px] w-auto object-contain"
            />
            <Image
              src="/images/b.svg"
              width={50}
              height={50}
              alt="brand-logo"
              className="h-[40px] w-auto object-contain"
            />
            <Image
              src="/images/c.svg"
              width={50}
              height={50}
              alt="brand-logo"
              className="h-[40px] w-auto object-contain"
            />
            <div className="text-[10px] font-[700]">The Sixth Avi</div>
          </div>
          <div className="flex flex-col gap-5 text-[16px] font-[700]">
            <p>Help</p>
            <p>About</p>
            <p>Feedback</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Header };
