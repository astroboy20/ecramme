import { Hammer } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-[#18252F] text-[#ECF5FB] text-[25px] font-[700] leading-[100%] p-5">
      ECRAMME <Hammer />
    </div>
  );
};

export { Header };
