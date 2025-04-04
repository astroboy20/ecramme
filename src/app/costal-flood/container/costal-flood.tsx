"use client";
import { Header } from "@/app/components/header";
import { MapContainer } from "@/app/components/map";
import { MapControls } from "@/app/components/map-with-controls";
import { Sidebar } from "@/app/components/sidebar";
import { useState, useEffect } from "react";

const CoastalFlood = () => {
  const [zoomIn, setZoomIn] = useState<(() => void) | null>(null);
  const [zoomOut, setZoomOut] = useState<(() => void) | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Fixed Header */}
      <div className="fixed w-full z-50">
        <Header />
      </div>

      {/* Main Content Area with Sidebar and Map */}
      <div className="flex flex-1 pt-16 relative w-full h-full">
        {/* Sidebar with responsive positioning */}
        <div className={`absolute ${isMobile ? 'bottom-4 left-4' : 'top-4 left-4'} z-20`}>
          <Sidebar />
        </div>
        
        {/* Map Container */}
        <div className="flex-1 h-full">
          <MapContainer 
            dataType="geotiff"
            fileType="coastal_flood"
            dataUrl="http://ec2-52-14-7-103.us-east-2.compute.amazonaws.com/api/collections/"
            polygonColor="#3B82F6" // Blue color for water-related data
            polygonOpacity={0.6}
            initialCenter={[-5.5471, 7.7460]}
            initialZoom={5.5}
            showStyleToggle={true}
           
          >
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export { CoastalFlood };