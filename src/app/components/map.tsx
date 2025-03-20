"use client";  // ✅ Required for Client Components

import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapContainerProps {
  setZoomIn: (zoomFn: () => void) => void;
  setZoomOut: (zoomFn: () => void) => void;
}

const MapContainer = ({ setZoomIn, setZoomOut }: MapContainerProps) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-5.5471, 7.7460], // 🌍 Updated to focus on West Africa
      zoom: 5.5, // 🔍 Adjusted zoom for better regional view
    });

    // ✅ Expose zoom functions
    setZoomIn(() => () => mapRef.current?.zoomIn());
    setZoomOut(() => () => mapRef.current?.zoomOut());

    return () => {
      mapRef.current?.remove();
    };
  }, [setZoomIn, setZoomOut]);

  return <div className="h-screen w-full" ref={mapContainerRef} />;
};

export { MapContainer };
