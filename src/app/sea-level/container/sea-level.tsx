
"use client";
import { Header } from "@/app/components/header";
import { MapWithControls } from "@/app/components/map-with-controls";

const SeaLevel = () => {
 
  const mapProps = {
    dataType: "geotiff",
    fileType:"sea_level_rise",
    dataUrl: "http://ec2-52-14-7-103.us-east-2.compute.amazonaws.com/api/collections/",
   polygonColor: "red",
    polygonOpacity: 0.6,
    initialCenter: [-5.5471, 7.7460],
    initialZoom: 5.5,
   // polygonColor:"#00FF00",
    showStyleToggle: true,
    showPolygons: false,
  layerOpacity: 0.6
  };

  return (
    <div className="w-full">
      <div className="fixed w-full z-[100000000000000]">
        <Header />
      </div>
      
     
      <MapWithControls 
        showSidebar={true} 
        showExportButton={true}
        mapProps={mapProps} 
      />
    </div>
  );
};

export { SeaLevel };