"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from 'next/navigation';

const WelcomeModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === '/') {
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalVisible(true);
      }, 10);
    } else {
      setIsModalOpen(false);
      setIsModalVisible(false);
    }
  }, [pathname]);

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <>
      {isModalOpen && (
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out flex justify-center items-center z-[9999] ] ${
            isModalVisible ? 'bg-opacity-70' : 'bg-opacity-0'
          }`}
          onClick={closeModal}
        >
          <div
            className={`bg-white rounded-lg shadow-xl mt-7  w-[600px]  relative transition-all duration-300 ease-in-out transform ${
              isModalVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: 'auto' }} 
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>

            
            <div className="mb-10 mt-[-40px] lg:mr-[100px]  flex justify-center items-center object-center  h-[some-height]">
  <Image
    height={80}
    width={200}
    src="/images/ecramme_logo.png"
    alt={"logo"}
  />
</div>
              <div className="mt-[-100px]"> 
                <p className="text-gray-700 font-sm text-center text-sm sm:text-base" style={{ whiteSpace: 'pre-wrap' }}>
                  Welcome to the ECRAMME Dashboard.

                  This platform was co-developed to enhance adaptation, mitigation and resilience against climate change and coastal multi-hazards along the West Africa's marine and coastal ecosystems.

                  ECRAMME provides access to a detailed database of past extreme events, organized along several risk indicators, and a unique repository of coastal hazard information to support end-users for both emergency and long term risk planning actions.

                </p>
              </div>
            
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomeModal;