"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-[40px] bg-[#18252F] py-10 px-5 font-[500] leading-[100%] text-white w-[300px] h-fit overflow-y-auto">
      <div className="flex flex-col gap-[10px]">
        COASTAL HAZARDS AND VULNERABILITY
        <Link
          className={`${
            pathname === "/" ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]" : ""
          }`}
          href="/"
        >
          Coastal Floods
        </Link>
        <Link
          className={`${
            pathname === "/flash-flood"
              ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]"
              : ""
          }`}
          href="/flash-flood"
        >
          Flash Flood
        </Link>
        <Link
          className={`${
            pathname === "/sea-level"
              ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]"
              : ""
          }`}
          href="/sea-level"
        >
          Sea Level Rise
        </Link>
        <Link
          className={`${
            pathname === "/marine-heatwaves"
              ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]"
              : ""
          }`}
          href="/marine-heatwaves"
        >
          Marine Heatwaves
        </Link>
        <Link
          className={`${
            pathname === "/storm-surges"
              ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]"
              : ""
          }`}
          href="/storm-surges"
        >
          Storm Surges
        </Link>
        <Link
          className={`${
            pathname === "/land-cover"
              ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]"
              : ""
          }`}
          href="/land-cover"
        >
          Land Cover
        </Link>
        <Link
          className={`${
            pathname === "/costal-erosion"
              ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]"
              : ""
          }`}
          href="/costal-erosion"
        >
          Coastal Erosion
        </Link>
      </div>
      <div className="flex flex-col gap-[10px]">
        FORECASTING & EARLY WARNING SYSTEMS
        <Link
          className={`${
            pathname === "/projected-forecasting" ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]" : ""
          }`}
          href="/projected-forecasting"
        >
          Projected Forecasting & Prediction
        </Link>
        <Link
          className={`${
            pathname === "/projected-sea-level"
              ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]"
              : ""
          }`}
          href="/projected-sea-level"
        >
          Projected Sea Level Rise
        </Link>
        <Link
          className={`${
            pathname === "/projected-marine-heatwaves"
              ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]"
              : ""
          }`}
          href="/projected-marine-heatwaves"
        >
          Projected Marine Heatwaves
        </Link>
        <Link
          className={`${
            pathname === "/projected-storm"
              ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]"
              : ""
          }`}
          href="/projected-storm"
        >
          Projected Storms
        </Link>
      </div>
    </div>
  );
};

export { Sidebar };
