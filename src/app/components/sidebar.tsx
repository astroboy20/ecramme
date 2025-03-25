"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp, } from "lucide-react";
import Image from "next/image";
import AboutModal from "./about";

const Sidebar = () => {
  const pathname = usePathname();

  // Separate state for each collapsible section
  const [isOpenCoastal, setIsOpenCoastal] = useState(false);
  const [isOpenForecast, setIsOpenForecast] = useState(false); 
  const [isOpenImpactAndVulnerability,  setIsOpenImpactAndVulnerability] = useState(false);

  return (
    <div className="bg-[#18252F] text-white mt-[-40px] ml-[-30px] px-10 w-[350px] h-[630px]">
      {/* Coastal Hazards Section */}
      <div className="flex flex-col gap-[10px]">
        <button
          onClick={() => setIsOpenCoastal(!isOpenCoastal)}
          className="flex flex-col items-start focus:outline-none"
        >
          <p className="text-[14px] flex gap-5 items-center mb-1 mt-2 h-14 rounded-md w-72  hover:bg-slate-700"><span className="ml-4">COASTAL HAZARDS</span> {isOpenCoastal ? <ChevronUp /> : <ChevronDown />} </p>
         
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
           Harmful Algal Bloom
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
          <p className="text-[14px] flex gap-5 items-center  h-14 rounded-md w-72  hover:bg-slate-700"> <span className="ml-4">EARLY WARNING SYSTEMS</span> {isOpenForecast ? <ChevronUp /> : <ChevronDown />}</p>
         
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
            Flood Forecast
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


      <div className="flex flex-col gap-[10px]">
        <button
          onClick={() => setIsOpenImpactAndVulnerability(!isOpenImpactAndVulnerability)}
          className="flex flex-col items-start focus:outline-none"
        >
          <p className="text-[14px] flex gap-5 items-center  h-14 rounded-md w-72  hover:bg-slate-700"> <span className="ml-4">IMPACT & VULNERABILITY</span> {isOpenForecast ? <ChevronUp /> : <ChevronDown />}</p>
         
        </button>

        {/* Animated collapsible container */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isOpenImpactAndVulnerability ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <Link
            className={`block ${
              pathname === "/projected-forecasting"
                ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]"
                : "p-2"
            }`}
            href="/land-cover"
          >
            Land Cover
          </Link>
          <Link
            className={`block ${
              pathname === "/projected-sea-level"
                ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]"
                : "p-2"
            }`}
            href="/population-growth"
          >
           Population Growth
          </Link> 
          <Link
            className={`block ${
              pathname === "/projected-sea-level"
                ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]"
                : "p-2"
            }`}
            href="/socioeconomic-status"
          >
            Socioeconomic Status
          </Link>
  
        </div>
      </div>

<div className="h-[1px] w-56 bg-slate-500 mt-14"></div>

  <div className="w-[200px]  ">
            <Image
              src="/images/image1.jpg"
              width={500}
              height={500}
              alt="brand-logo"
              className="h-[40px] w-auto object-contain mt-10"
            />
            <Image
              src="/images/image2.png"
              width={500}
              height={500}
              alt="bra-logo"
              className="h-[40px] w-auto object-contain mt-9"
            />
           
          </div>

          <div className="h-[1px] w-56 bg-slate-500 mt-10"></div>

          <div className="mt-20 ml-28 h-14 w-24 hover:bg-slate-700 rounded transition-all duration-75">
            
            <AboutModal/>
          </div>
       
    </div>
  );
};

export { Sidebar };
