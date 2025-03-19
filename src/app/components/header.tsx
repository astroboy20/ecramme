import { AlignJustify } from 'lucide-react';
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-[#18252F] text-[#ECF5FB] text-[25px] font-[700] leading-[100%] px-7 py-5 ">
      ECRAMME <AlignJustify />
    </div>
  );
};

export { Header };
