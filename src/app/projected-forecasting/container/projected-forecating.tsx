"use client"
import { Header } from "@/app/components/header";
import { MapContainer } from "@/app/components/map";
import { MapWithControls } from "@/app/components/map-with-controls";
import { Sidebar } from "@/app/components/sidebar";
import { Button } from "@/components/ui/button";
import { Download, PlusIcon, MinusIcon } from "lucide-react";
import { useRef } from "react";



const ProjectedForecasting = () => {
  return (
    <div className="w-full">
     
      <div className="fixed w-full z-[100000000000000]">
        <Header />
      </div>
      <MapContainer 
        dataType="geotiff"
        fileType="projected_forcasting" 
        dataUrl="http://ec2-52-14-7-103.us-east-2.compute.amazonaws.com/api/collections/"
        polygonColor="red" 
        polygonOpacity={0.6}
        initialCenter={[-5.5471, 7.7460]}
        initialZoom={5.5}
        showStyleToggle={true}
      />
     
      {/* <MapWithControls showSidebar={true} showExportButton={true} /> */}
    </div>
  );
};

export { ProjectedForecasting };
