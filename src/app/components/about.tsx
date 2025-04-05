"use client";
import React, { useState } from "react";
import { X, Info } from "lucide-react";
import Image from "next/image";

const AboutModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalVisible(true);
      }, 10);
    } else {
      setIsModalVisible(false);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 300);
    }
  };

  return (
    <div>
      <button 
        onClick={toggleModal}
        className="fixed z-[1000] bottom-10 left-20 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors group"
      >
        <Info/>
      </button>

      {isModalOpen && (
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out flex justify-center items-center z-[1000] p-4 
            ${isModalVisible ? 'bg-opacity-50' : 'bg-opacity-0'}`}
          onClick={toggleModal}
        >
          <div 
            className={`bg-white rounded-lg shadow-xl w-[1000px] max-h-[80vh] overflow-y-auto p-6 relative 
              transition-all duration-300 ease-in-out transform
              ${isModalVisible 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-95'}`}
            onClick={(e) => e.stopPropagation()}
          >
  <div className="h-1  bg-blue-400 lg:w-[950px] sm:w-52  left-16"></div>

            
            <div className="  mb-2">
            <button 
              onClick={toggleModal}
              className="absolute top-10 right-9 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>
 
            <h2 className="text-2xl text-blue-400 top-10 font-bold  text-start ml-5">
              {/* ECRAMME */}
              <Image
            height={200}
            width={100}
            src="/images/ecramme_logo.png"
            alt={"logo"}
            className="py-0  pb-0 mt-[-17px] ml-10 top-5 "
          />
            </h2>
            </div>

            <div className="h-1 mb-24 bg-blue-400 lg:w-[950px] sm:w-52 left-16"></div>

            <div className="space-y-4 text-xl sm:text-[10px]">
              <p className="text-black text-xl mb-10 font-bold text-center">
              Welcome to the ECRAMME Dashboard. This platform was co-developed to enhance adaptation, mitigation and resilience against climate change and coastal multi-hazards along the West Africa's marine and coastal ecosystems. ECRAMME provides access to a detailed database of past extreme events, organized along several risk indicators, and a unique repository of coastal hazard information to support end-users for both emergency and long term risk planning actions. The project is funded by the UNESCO’s Intergovernmental Oceanographic Commission (IOC) Sub-Commission for Africa and the Adjacent Island States (IOCAFRICA).
                 </p>

            </div>


      
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutModal;