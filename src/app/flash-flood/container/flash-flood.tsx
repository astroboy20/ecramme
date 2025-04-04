"use client";

import { useEffect, useState } from "react";
import { Header } from "@/app/components/header";
import { MapContainer } from "@/app/components/map";

const FlashFlood = () => {
  return (
    <div className="w-full">
      <div className="fixed w-full z-[100000000000000]">
        <Header />
      </div>
      
      <MapContainer 
        dataType="geotiff"
        fileType="flash_flood" // This will filter items with file_type="flash_flood"
        dataUrl="http://ec2-52-14-7-103.us-east-2.compute.amazonaws.com/api/collections/"
        polygonColor="#0000FF" // Blue for flash floods
        polygonOpacity={0.6}
        initialCenter={[-5.5471, 7.7460]}
        initialZoom={5.5}
        showStyleToggle={true}
      />
    </div>
  );
};

export { FlashFlood };