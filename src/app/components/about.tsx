"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

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
        className="px-4 py-2 text-xl text-slate-500"
      >
        About
      </button>

      
      {isModalOpen && (
        <div 
          className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out flex justify-center items-center z-50 p-4 
            ${isModalVisible ? 'bg-opacity-50' : 'bg-opacity-0'}`}
          onClick={toggleModal}
        >
         
          <div 
            className={`bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto p-6 relative 
              transition-all duration-300 ease-in-out transform
              ${isModalVisible 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-95'}`}
            onClick={(e) => e.stopPropagation()}
          >
            
            <button 
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>

            
            <h2 className="text-2xl text-black font-bold mb-4 text-center">
              ECRAMME
            </h2>

            
            <div className="space-y-4">
              <p className="text-black text-xl text-center">
                Welcome to Ecramme dashboard. This platform was co-developed to Help track extreme weather events, analyze historical trends, and receive early warnings, supporting decision-making for climate resilience and disaster preparedness.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutModal;