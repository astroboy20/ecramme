"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  // Separate state for each collapsible section
  const [isOpenCoastal, setIsOpenCoastal] = useState(false);
  const [isOpenForecast, setIsOpenForecast] = useState(false);

  return (
    <div className="flex flex-col gap-[40px] bg-[#18252F] py-10 px-5 text-[10px] font-[500] leading-[100%] text-white w-[300px] h-[500px] overflow-y-auto">
      {/* Coastal Hazards Section */}
      <div className="flex flex-col gap-[10px]">
        <button
          onClick={() => setIsOpenCoastal(!isOpenCoastal)}
          className="flex flex-col items-start focus:outline-none"
        >
          <p className="text-[14px]">COASTAL HAZARDS AND </p>
         
        </button>

        {/* Animated collapsible container */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isOpenCoastal ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <Link
            className={`block ${
              pathname === "/" ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]" : "p-2"
            }`}
            href="/"
          >
            Coastal Floods
          </Link>
          <Link
            className={`block ${
              pathname === "/flash-flood"
                ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]"
                : "p-2"
            }`}
            href="/flash-flood"
          >
            Flash Flood
          </Link>
          <Link
            className={`block ${
              pathname === "/sea-level"
                ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]"
                : "p-2"
            }`}
            href="/sea-level"
          >
            Sea Level Rise
          </Link>
          <Link
            className={`block ${
              pathname === "/marine-heatwaves"
                ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]"
                : "p-2"
            }`}
            href="/marine-heatwaves"
          >
            Marine Heatwaves
          </Link>
          <Link
            className={`block ${
              pathname === "/storm-surges"
                ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]"
                : "p-2"
            }`}
            href="/storm-surges"
          >
            Storm Surges
          </Link>
          <Link
            className={`block ${
              pathname === "/land-cover"
                ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]"
                : "p-2"
            }`}
            href="/land-cover"
          >
            Land Cover
          </Link>
          <Link
            className={`block ${
              pathname === "/costal-erosion"
                ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]"
                : "p-2"
            }`}
            href="/costal-erosion"
          >
            Coastal Erosion
          </Link>
        </div>
      </div>

      {/* Forecasting & Early Warning Systems Section */}
      <div className="flex flex-col gap-[10px]">
        <button
          onClick={() => setIsOpenForecast(!isOpenForecast)}
          className="flex flex-col items-start focus:outline-none"
        >
          <p className="text-[14px]">FORECASTING & EARLY WARNING SYSTEMS {isOpenForecast ? <ChevronUp /> : <ChevronDown />}</p>
         
        </button>

        {/* Animated collapsible container */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isOpenForecast ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <Link
            className={`block ${
              pathname === "/projected-forecasting"
                ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]"
                : "p-2"
            }`}
            href="/projected-forecasting"
          >
            Projected Forecasting & Prediction
          </Link>
          <Link
            className={`block ${
              pathname === "/projected-sea-level"
                ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]"
                : "p-2"
            }`}
            href="/projected-sea-level"
          >
            Projected Sea Level Rise
          </Link>
          <Link
            className={`block ${
              pathname === "/projected-marine-heatwaves"
                ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]"
                : "p-2"
            }`}
            href="/projected-marine-heatwaves"
          >
            Projected Marine Heatwaves
          </Link>
          <Link
            className={`block ${
              pathname === "/projected-storm"
                ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]"
                : "p-2"
            }`}
            href="/projected-storm"
          >
            Projected Storms
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Sidebar };
