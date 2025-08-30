'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  ChevronUp,
  Menu,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { sidebarSections } from './sidebar-data';

interface SidebarProp {
  isLightMode: boolean;
}

interface SidebarSectionProps {
  title: string;
  links: { href: string; label: string }[];
  isLightMode: boolean;
  toggleSidebar: () => void;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, links, isLightMode, toggleSidebar }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const linkTextColor = isLightMode ? 'text-[#121212]' : 'text-white';
  const hoverBgColor = isLightMode ? 'hover:bg-blue-300' : 'hover:bg-blue-400';
  const categoryTextColor = isLightMode ? 'text-blue-800' : 'text-white';

  return (
    <div className="flex flex-col gap-[10px] mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-start focus:outline-none"
      >
        <p className={`text-[12px] font-bold flex gap-5 items-center h-10 rounded-md w-full ${hoverBgColor} ${categoryTextColor}`}>
          <span className="ml-4">{title}</span>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </p>
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {links.map((item) => (
          <Link
            key={item.href}
            className={`block ${
              pathname === item.href
                ? 'bg-blue-400 text-black p-2 rounded-[4px]'
                : `p-1 text-xs ${linkTextColor}`
            } ml-4`}
            href={item.href}
            onClick={toggleSidebar}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Sidebar: React.FC<SidebarProp> = ({ isLightMode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const HamburgerButton = () => (
    <button
      onClick={toggleSidebar}
      className={`fixed top-4 left-4 z-50 p-2 rounded-md transition-all ${isLightMode ? 'text-blue-500' : 'text-white'}`}>
      {isSidebarOpen ? null : <Menu className="text-blue-400 hover:text-blue-500 transition-colors" size={24} />}
    </button>
  );

  return (
    <>
      <HamburgerButton />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 z-50
          ${isLightMode ? 'bg-[#F5F5F5] text-[#121212]' : 'bg-[#18252F] text-white'}
          border-r-4 border-blue-400
          lg:w-[350px] sm:w-[200px] w-full h-full
          transform transition-transform duration-500 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          overflow-y-auto pb-10
        `}>
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={toggleSidebar}
            className="text-blue-400 hover:text-blue-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="h-14 mt-1">
          <Image
            height={100}
            width={150}
            src="/images/ecramme_logo.png"
            alt="logo"
            className="py-0 mt-[-17px] ml-10"
          />
        </div>

        <div className="px-6 pt-12">
          {sidebarSections.map((section) => (
            <SidebarSection
              key={section.title}
              title={section.title}
              links={section.links}
              isLightMode={isLightMode}
              toggleSidebar={toggleSidebar}
            />
          ))}

          <div className="h-[1px] w-full bg-slate-500 mt-14"></div>

          <div className="w-full">
            {/* <h2 className={`text-sm font-bold mt-4 ${categoryTextColor}`}>PROUDLY SPONSORED BY:</h2>
            <Image
              src="/images/image2.png"
              width={500}
              height={500}
              alt="bra-logo"
              className="h-[40px] w-auto object-contain mt-4"
            />

            <Image
              src="/images/Eccral.png"
              width={500}
              height={500}
              alt="bra-logo"
              className="h-[150px] w-auto object-contain -mt-2"
            />

            <Image
              src="/images/UN_Ocean.jpg"
              width={700}
              height={700}
              alt="bra-logo"
              className="h-[100px] w-auto object-contain -mt-2"
            /> */}
          </div>

          <div className="h-[1px] w-full bg-slate-500 mt-10"></div>
        </div>
      </div>
    </>
  );
};

export { Sidebar };
