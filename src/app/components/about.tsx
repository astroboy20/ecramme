"use client";
import React, { useState } from "react";
import { X, Info } from "lucide-react";

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
  <div className="h-1  bg-blue-400 w-[950px] left-16"></div>

            
            <div className="  mb-2">
            <button 
              onClick={toggleModal}
              className="absolute top-10 right-9 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>
 
            <h2 className="text-2xl text-blue-400 top-10 font-bold mb-4 text-start ml-5 mt-3">
              ECRAMME
            </h2>
            </div>

            <div className="h-1 mb-4 bg-blue-400 w-[950px] left-16"></div>

            <div className="space-y-4">
              <p className="text-black text-center">
                The Enhancing Climate Resilience, Adaptation and Mitigation to the Impacts and Vulnerability of West Africa's Marine and Coastal Ecosystems (ECRAMME) project commenced in December 2024 and was publicly launched in April, 2025 through the funding from the UNESCO IOC Sub-commission for Africa and Adjacent Island States (IOCAFRICA).
              </p>

              <p className="text-black text-center">
                ECRAMME provides free online mapping service that hosts publicly available spatial information to support evidence-based decision making, 1 monitor coastal hazards, protect the marine and coastal ocean environment in West Africa. With increased coastal erosion, floods, and sea level change is exacerbating existing challenges in West African coastal areas, with significant impacts on ecosystems, livelihoods, and human populations.
              </p>

              <p className="text-black text-center">
                Therefore, there is the need to create innovative strategies to help all communities with climate adaptation and mitigation. ECRAMME promotes regional coordination, community-based literacy approaches, and citizen participation, which encourages coastal communities to take charge of their own self-preparation, create resilience, and involve public safety and disaster relief partners in long-term action planning and prosperity.
              </p>
            </div>


      
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutModal;