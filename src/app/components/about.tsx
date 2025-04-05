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

            
            <div className="mb-2">
            <button 
              onClick={toggleModal}
              className="absolute top-10 right-9 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>
 
            <div className="text-xl text-blue-400 top-10 font-bold  text-start ml-5">
              {/* ECRAMME */}
              <Image
            height={200}
            width={100}
            src="/images/ecramme_logo.png"
            alt={"logo"}
            className="py-0  pb-0 mt-[-17px] ml-10 top-5 "
          />
            </div>
            </div>

            <div className="h-1 mb-24 bg-blue-400 lg:w-[950px] sm:w-52 left-16"></div>
  
           
            <div className="space-y-4 mt-[-70px] text-xl sm:text-[10px]">
              <p className="text-black text-[14px] font-bold text-center">

              The Enhancing Climate Resilience, Adaptation and Mitigation to the Impacts and Vulnerability of West Africa's Marine and Coastal Ecosystems (ECRAMME) project commenced in December 2024 and was publicly launched in April 1, 2025 through funding from the UNESCO IOC Sub-commission for Africa and Adjacent Island States (IOCAFRICA).

                 </p> 
                 
                 <p className="text-black text-[14px]  font-bold text-center">

                 ECRAMME provides free online mapping services that host locally available spatial information to support evidence-based decision-making for West African marine and coastal ecosystem management and planning. West African coastal areas, with significant impacts on ecosystems, livelihoods, and human populations.
                 </p>  
                 
                 <p className="text-black text-[14px]  font-bold text-center">

                 Therefore, there is the need to create innovative strategies to help all communities with climate adaptation and mitigation. ECRAMME promotes regional coordination, community-based learning, innovations and citizen participation, which encourages coastal communities to take charge of their own development efforts and promote knowledge sharing, which could foster more effective long-term action planning and prosperity.
                 </p>

              

            </div>


      
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutModal;