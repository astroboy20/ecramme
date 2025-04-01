"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ChevronDown, 
  ChevronUp, 
  Menu, 
  X, 
  Image as ImageIcon 
} from "lucide-react";
import Image from "next/image";
//import AboutModal from "./about";

const Sidebar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Separate state for each collapsible section
  const [isOpenCoastal, setIsOpenCoastal] = useState(false);
  const [isOpenForecast, setIsOpenForecast] = useState(false); 
  const [isOpenImpactAndVulnerability, setIsOpenImpactAndVulnerability] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  
  const HamburgerButton = () => (
    <button 
      onClick={toggleSidebar} 
      className="fixed top-4 left-4 z-50 text-white p-2 rounded-md hover:text-blue-500 transition-all"
    >
      {isSidebarOpen ? null : <Menu className="text-white hover:text-blue-500" size={24} />}
    </button>
  );

  return (
    <>
      <HamburgerButton />

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0  z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed top-0 left-0 z-50 bg-[#18252F] text-white 
          lg:w-[350px] sm:w-[200px] h-full 
          transform transition-transform duration-500 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          overflow-y-auto pb-10
        `}
      >
        {/* Close Button within Sidebar */}
        <div className="absolute top-4 right-4 z-60">
          <button 
            onClick={toggleSidebar} 
            className="text-white hover:text-blue-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="h-14 mt-1">
        <Image
                  height={100}
                  width={150}
                  src="/images/ecramme_logo.png"
                  alt={"logo"}
                  className="py-0 px-[-1px] pb-0 mt-[-40px] ml-10 mb-0"
                />
        </div>

        <div className="px-6 pt-20">
          {/* Coastal Hazards Section */}
          <div className="flex flex-col gap-[10px]">
            <button
              onClick={() => setIsOpenCoastal(!isOpenCoastal)}
              className="flex flex-col items-start focus:outline-none"
            >
              <p className="text-[12px] flex gap-5 items-center  h-10 rounded-md w-72 hover:bg-slate-700">
                <span className="ml-4">COASTAL HAZARDS</span> 
                {isOpenCoastal ? <ChevronUp /> : <ChevronDown />}
              </p>
            </button>

            {/* Animated collapsible container */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isOpenCoastal ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {[
                { href: "/", label: "Coastal Floods" },
                { href: "/flash-flood", label: "Flash Flood" },
                { href: "/sea-level", label: "Sea Level Rise" },
                { href: "/marine-heatwaves", label: "Marine Heatwaves" },
                { href: "/storm-surges", label: "Storm Surges" },
                { href: "/land-cover", label: "Harmful Algal Bloom" },
                { href: "/costal-erosion", label: "Coastal Erosion" }
              ].map((item) => (
                <Link
                  key={item.href}
                  className={`block ${
                    pathname === item.href 
                      ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]" 
                      : "p-1 text-xs"
                  }`}
                  href={item.href}
                  onClick={toggleSidebar}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Early Warning Systems Section */}
          <div className="flex flex-col gap-[10px]">
            <button
              onClick={() => setIsOpenForecast(!isOpenForecast)}
              className="flex flex-col items-start focus:outline-none"
            >
              <p className="text-[12px] flex gap-5 items-center h-10 rounded-md w-72 hover:bg-slate-700">
                <span className="ml-4">EARLY WARNING SYSTEMS</span> 
                {isOpenForecast ? <ChevronUp /> : <ChevronDown />}
              </p>
            </button>

            <div
              className={`transition-all duration-300 overflow-hidden ${
                isOpenForecast ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {[
                { href: "/projected-forecasting", label: "Flood Forecast" },
                { href: "/projected-sea-level", label: "Projected Sea Level Rise" },
                { href: "/projected-marine-heatwaves", label: "Projected Marine Heatwaves" },
                { href: "/projected-storm", label: "Projected Storms" }
              ].map((item) => (
                <Link
                  key={item.href}
                  className={`block ${
                    pathname === item.href 
                      ? "bg-[#ECF5FB] text-black p-2 rounded-[4px]" 
                      : "p-1 text-xs"
                  }`}
                  href={item.href}
                  onClick={toggleSidebar}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Impacts & Vulnerability Section */}
          <div className="flex flex-col gap-[10px]">
            <button
              onClick={() => setIsOpenImpactAndVulnerability(!isOpenImpactAndVulnerability)}
              className="flex flex-col items-start focus:outline-none"
            >
              <p className="text-[12px] flex gap-5 items-center h-10 rounded-md w-72 hover:bg-slate-700">
                <span className="ml-4">IMPACTS & VULNERABILITY</span> 
                {isOpenImpactAndVulnerability ? <ChevronUp /> : <ChevronDown />}
              </p>
            </button>

            <div
              className={`transition-all duration-300 overflow-hidden ${
                isOpenImpactAndVulnerability ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {[
                { href: "/land-cover", label: "Land Cover" },
                { href: "/population-growth", label: "Population Growth" },
                { href: "/socioeconomic-status", label: "Socioeconomic Status" },
                { href: "/integrated-coastal-vulnerability-index", label: "Integrated Coastal Vulnerability Index" }
              ].map((item) => (
                <Link
                  key={item.href}
                  className={`block ${
                    pathname === item.href 
                      ? "bg-[#ECF5FB] text-black p-1 rounded-[4px]" 
                      : "p-1 text-xs"
                  }`}
                  href={item.href}
                  onClick={toggleSidebar}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="h-[1px] w-56 bg-slate-500 mt-14"></div>

          <div className="w-[200px]">
            <h2 className="text-sm mt-4">PROUDLY SPONSORED BY:</h2>
            <Image
              src="/images/image2.png"
              width={500}
              height={500}
              alt="bra-logo"
              className="h-[40px] w-auto object-contain mt-4"
            />
          </div>

          <div className="h-[1px] w-56 bg-slate-500 mt-10"></div>

          {/* <div className="mt-20 ml-2 h-9 text-center flex space-x-2">
            <div className=" hover:bg-slate-800 rounded transition-all ease-linear duration-75">
              <AboutModal />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export { Sidebar };