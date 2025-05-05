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
            className={`bg-white rounded-lg shadow-xl w-[1000px] max-h-[90vh] overflow-y-auto p-2 mt-24 relative 
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

            <div className="h-1 mb-20 bg-blue-400 lg:w-[950px] sm:w-52 left-16"></div>
  
           
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


                 <p className="text-black text-[14px]  font-bold text-center">
                 The ECRAMME dashboard provides a central repository for marine and coastal data with intelligent in-built graphical user interface tools which supports zooming, maps overlay, feature identification outputs generate, data visualization and retrieval, in various formats (e.g Geojson, Raster and CSV), based on the user-defined specifications.
                 </p>

                <p className="text-black text-[14px]  font-bold text-center">
                The ECRAMME displays four major components, which are the coastal hazards, impacts and vulnerability,early warning systems, and adaptation and mitigation. The sub-components under the coastal hazards include flash flood, sea level rise, marine heatwaves, storm surges, harmful algal bloom, and coastal erosion; while the sub-components under the early warning systems include the flood forecast, projected sea level rise, projected marine heatwaves and projected storms. The sub-components under the impacts and vulnerability include the land cover, population growth and socioeconomic status. Lastly, the sub-components under the adaptation and mitigation include the blue economy, biodiversity conservation, capacity building, ecosystem restoration, GHG emissions reduction, maritime green shipping, sustainable agriculture, fisheries & aquaculture. The ECRAMME tool is designed such that users can freely access and retrieve information on extreme events and climate-related hazards, as well as early warning alerts over the West Africa’s marine and coastal environment.
                 </p>

              

            </div>


      
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutModal;