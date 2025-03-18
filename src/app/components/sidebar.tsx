"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-[40px] bg-[#18252F] py-10 px-5 font-[500] leading-[100%] text-white h-fit w-[300px]">
      <Link
        className={`${
          pathname === "/costal-flood"
            ? "bg-[#ECF5FB] text-black p-3 rounded-[4px]"
            : ""
        }`}
        href="/costal-flood"
      >
        Coastal Floods
      </Link>
      <Link
        className={`${
          pathname === "/flash-flood"
            ? "bg-[#ECF5FB] text-black p-3 rounded-[4px]"
            : ""
        }`}
        href="/flash-flood"
      >
        Flash Flood
      </Link>
      <Link
        className={`${
          pathname === "/sea-level"
            ? "bg-[#ECF5FB] text-black p-3 rounded-[4px]"
            : ""
        }`}
        href="/sea-level"
      >
        Sea Level Rise
      </Link>
      <Link
        className={`${
          pathname === "/marine-heatwaves"
            ? "bg-[#ECF5FB] text-black p-3 rounded-[4px]"
            : ""
        }`}
        href="/marine-heatwaves"
      >
        Marine Heatwaves
      </Link>
      <Link
        className={`${
          pathname === "/storm-surges"
            ? "bg-[#ECF5FB] text-black p-3 rounded-[4px]"
            : ""
        }`}
        href="/storm-surges"
      >
        Storm Surges
      </Link>
      <Link
        className={`${
          pathname === "/costal-flood"
            ? "bg-[#ECF5FB] text-black p-3 rounded-[4px]"
            : ""
        }`}
        href="/"
      >
        Land Cover
      </Link>
      <Link
        className={`${
          pathname === "/costal-flood"
            ? "bg-[#ECF5FB] text-black p-3 rounded-[4px]"
            : ""
        }`}
        href="/"
      >
        Coastal Erosion
      </Link>
    </div>
  );
};

export { Sidebar };
