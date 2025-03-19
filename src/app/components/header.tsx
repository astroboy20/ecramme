"use client";
import { AlignJustify, X } from "lucide-react";
import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      onClick={handleIsOpen}
      className="flex justify-between items-center bg-[#18252F] text-[#ECF5FB] text-[25px] font-[700] leading-[100%] px-7 py-5 "
    >
      ECRAMME{" "}
      {isOpen ? (
        <X className="cursor-pointer" />
      ) : (
        <AlignJustify className="cursor-pointer" />
      )}

      {isOpen && (
        <div className="absolute bg white ">
          hfhhfhf
        </div>
      )}
    </div>
  );
};

export { Header };
