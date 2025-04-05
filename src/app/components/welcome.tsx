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
          className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out flex justify-center items-center z-[9999] p-4 ${
            isModalVisible ? 'bg-opacity-70' : 'bg-opacity-0'
          }`}
          onClick={closeModal}
        >
          <div
            className={`bg-white rounded-lg shadow-xl mt-20  w-[500px] p-6 relative transition-all duration-300 ease-in-out transform ${
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

            <div className="flex flex-col items-center justify-center">
              <div className="mb-10  top-36"> 
                <Image
                  height={80}
                  width={100}
                  src="/images/ecramme_logo.png"
                  alt={"logo"}
                />
              </div>
              <div style={{ overflow: 'hidden', maxHeight: 'calc(70vh - 150px)' }}> 
                <p className="text-gray-700 font-bold text-center text-sm sm:text-base" style={{ whiteSpace: 'pre-wrap' }}>
                  Welcome to the ECRAMME Dashboard.

                  This platform was co-developed to enhance adaptation, mitigation and resilience against climate change and coastal multi-hazards along the West Africa's marine and coastal ecosystems.

                  ECRAMME provides access to a detailed database of past extreme events, organized along several risk indicators, and a unique repository of coastal hazard information to support end-users for both emergency and long term risk planning actions.

                  The project is funded by the UNESCO’s Intergovernmental Oceanographic Commission (IOC) Sub-Commission for Africa and the Adjacent Island States (IOCAFRICA).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomeModal;