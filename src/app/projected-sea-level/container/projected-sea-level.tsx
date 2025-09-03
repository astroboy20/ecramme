


"use client";
import { Header } from "@/app/components/header";
import { MapWithControls } from "@/app/components/map-with-controls";

import { useEffect, useState } from "react";

const ProjectedSealevel = () => {
  const [projectedSeaLevelGeoJSON, setProjectedSeaLevelGeoJSON] = useState<GeoJSON.FeatureCollection | null>(null);

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const response = await fetch("/geojsons/Projected Sea Level Rise.geojson");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: GeoJSON.FeatureCollection = await response.json();
        setProjectedSeaLevelGeoJSON(data);
      } catch (error) {
        console.error("Error fetching Projected Sea Level Rise GeoJSON:", error);
      }
    };

    fetchGeoJSON();
  }, []);

  return (
    <div className="w-full">
      <div className="fixed w-full z-[100000000000000]">
        <Header />
      </div>
      
      <MapWithControls 
        showSidebar={true} 
        showExportButton={true}
        geojson={projectedSeaLevelGeoJSON} 
      />
    </div>
  );
};

export { ProjectedSealevel };
