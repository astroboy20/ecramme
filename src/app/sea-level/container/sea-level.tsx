
"use client";
import { Header } from "@/app/components/header";
import { MapWithControls } from "@/app/components/map-with-controls";
import { useState, useEffect } from "react";

const SeaLevel = () => {
  const [seaLevelGeoJSON, setSeaLevelGeoJSON] = useState<GeoJSON.FeatureCollection | null>(null);

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const response = await fetch("/geojsons/Sea Level Rise (Historical).geojson");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: GeoJSON.FeatureCollection = await response.json();
        setSeaLevelGeoJSON(data);
      } catch (error) {
        console.error("Error fetching Sea Level Rise GeoJSON:", error);
      }
    };

    fetchGeoJSON();
  }, []);
 
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
        geojson={seaLevelGeoJSON}
      />
    </div>
  );
};

export { SeaLevel };