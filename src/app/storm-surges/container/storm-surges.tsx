"use client"
import { Header } from "@/app/components/header";
import { MapContainer } from "@/app/components/map";
import { MapWithControls } from "@/app/components/map-with-controls";
import { Sidebar } from "@/app/components/sidebar";
import { Button } from "@/components/ui/button";
import { Download, PlusIcon, MinusIcon } from "lucide-react";
import { useRef, useEffect, useState } from "react";


const StormSurges = () => {
  const [StormSurgeGeoJSON, setStromsurgeGeoJSON] = useState<GeoJSON.FeatureCollection | null>(null);
  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const response = await fetch("/geojsons/Storm Surges (Historical).geojson");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: GeoJSON.FeatureCollection = await response.json();
        setStromsurgeGeoJSON(data);
      } catch (error) {
        console.error("Error fetching Storm surge GeoJSON:", error);
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
        geojson={StormSurgeGeoJSON}
        mapProps={{
          initialCenter: [-5.5471, 7.7460],
          initialZoom: 5.5,
        }}
      />
    </div>
  );
};

export { StormSurges };
