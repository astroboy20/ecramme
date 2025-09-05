"use client"
import { Header } from "@/app/components/header";
import { MapContainer } from "@/app/components/map";
import { MapWithControls } from "@/app/components/map-with-controls";
import { Sidebar } from "@/app/components/sidebar";
import { Button } from "@/components/ui/button";
import { Download, PlusIcon, MinusIcon } from "lucide-react";
import { useEffect, useState } from "react";


const ProjectedStorm = () => {
  const [projectedStormsGeoJSON, setProjectedStormsGeoJSON] = useState<GeoJSON.FeatureCollection | null>(null);

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const response = await fetch("/geojsons/Projected Storms.geojson");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: GeoJSON.FeatureCollection = await response.json();
        setProjectedStormsGeoJSON(data);
      } catch (error) {
        console.error("Error fetching Projected Storms GeoJSON:", error);
      }
    };

    fetchGeoJSON();
  }, []);

  return (
    <div className="w-full">
      {/* ✅ Fixed Header */}
      <div className="fixed w-full z-[100000000000000]">
        <Header />
      </div>

      {/* ✅ Use Reusable Component */}
      <MapWithControls 
        showSidebar={true} 
        showExportButton={true}
        geojson={projectedStormsGeoJSON}
        mapProps={{
          initialCenter: [-5.5471, 7.7460],
          initialZoom: 5.5,
        }}
      />
    </div>
  );
};

export { ProjectedStorm };
