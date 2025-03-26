"use client";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapContainerProps {
  setZoomIn: (zoomFn: () => void) => void;
  setZoomOut: (zoomFn: () => void) => void;
  // Each element is an array of coordinate pairs (each polygon).
  coordinates?: Array<Array<[number, number]>>;
}

const MapContainer = ({ setZoomIn, setZoomOut, coordinates }: MapContainerProps) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  // Initialize the map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-5.5471, 7.7460], // Default center
      zoom: 5.5,
    });

    // Expose zoom functions
    setZoomIn(() => () => mapRef.current?.zoomIn());
    setZoomOut(() => () => mapRef.current?.zoomOut());

    return () => {
      mapRef.current?.remove();
    };
  }, [setZoomIn, setZoomOut]);

  useEffect(() => {
    if (!mapRef.current || !coordinates) return;

    // Create a GeoJSON FeatureCollection
    const geoJson: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
      type: "FeatureCollection",
      features: coordinates.map((coords, index) => ({
        type: "Feature",
        geometry: {
          type: "Polygon",
         
          coordinates: [coords],
        },
        properties: {
          id: index,
        },
      })),
    };

    // If the source already exists, update its data; otherwise, add it.
    if (mapRef.current.getSource("floodFeatures")) {
      (mapRef.current.getSource("floodFeatures") as mapboxgl.GeoJSONSource).setData(geoJson);
    } else {
      mapRef.current.addSource("floodFeatures", {
        type: "geojson",
        data: geoJson,
      });

      mapRef.current.addLayer({
        id: "floodPolygons",
        type: "fill",
        source: "floodFeatures",
        layout: {},
        paint: {
          "fill-color": "#FF0000", // Customize the fill color as needed
          "fill-opacity": 0.5,
        },
      });
    }
  }, [coordinates]);

  return <div className="h-screen w-full" ref={mapContainerRef} />;
};

export { MapContainer };
