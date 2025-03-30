"use client";

import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map, Satellite, Layers } from "lucide-react";
import WestAfricaTestGeoJson from "../../../data"

interface MapContainerProps {
  setZoomIn: (zoomFn: () => void) => void;
  setZoomOut: (zoomFn: () => void) => void;
  // Each element is an array of coordinate pairs (each polygon).
  coordinates?: Array<Array<[number, number]>>;
}

interface GeoJsonFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  properties: {
    feature_id: any;
    gridcode: any;
    date: any;
    name: any;
  };
}

const MapContainer = ({ setZoomIn, setZoomOut, coordinates }: MapContainerProps) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentStyle, setCurrentStyle] = useState("streets-v12");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [testPolygonsVisible, setTestPolygonsVisible] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const changeMapStyle = (styleName: string) => {
    if (mapRef.current) {
      mapRef.current.setStyle(`mapbox://styles/mapbox/${styleName}`);
      setCurrentStyle(styleName);
      setIsOpen(false);
      
     
      if (dataLoaded) {
        mapRef.current.once('style.load', () => {
          fetchData();
          
          if (testPolygonsVisible) {
            addTestPolygons();
          }
        });
      }
    }
  };

  const fetchData = async () => {
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;
    
    try {
      
      if (mapRef.current.getLayer('api-polygon-outlines')) {
        mapRef.current.removeLayer('api-polygon-outlines');
      }
      if (mapRef.current.getLayer('api-polygons')) {
        mapRef.current.removeLayer('api-polygons');
      }
      if (mapRef.current.getSource('api-data')) {
        mapRef.current.removeSource('api-data');
      }

      const response = await fetch(
        "http://ec2-52-14-7-103.us-east-2.compute.amazonaws.com/api/collections"
      );
      const data = await response.json();
      
      console.log("API Response:", data);

      const geojson = {
        type: "FeatureCollection",
        features: [] as GeoJsonFeature[],
      };

      data.forEach((collection: any) => {
        if (collection.features?.length > 0) {
          console.log("Sample feature:", collection.features[0]);
        }
        
        collection.features.forEach((feature: any) => {
          if (
            feature.coordinates &&
            Array.isArray(feature.coordinates) &&
            feature.coordinates.length > 0
          ) {
            let coords = [...feature.coordinates];
            
            
            if (
              coords.length > 0 &&
              (coords[0][0] !== coords[coords.length - 1][0] ||
               coords[0][1] !== coords[coords.length - 1][1])
            ) {
              coords.push([...coords[0]]);
            }
            
            geojson.features.push({
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [coords],
              },
              properties: {
                feature_id: feature.feature_id,
                gridcode: feature.gridcode,
                date: collection.date,
                name: collection.name,
              },
            });
          }
        });
      });

      console.log("Final GeoJSON structure:", geojson);
      
      if (geojson.features.length === 0) {
        console.warn("No valid features found to display on the map");
        return;
      }

      mapRef.current.addSource("api-data", {
        type: "geojson",
        data: geojson as any,
      });

      mapRef.current.addLayer({
        id: "api-polygons",
        type: "fill",
        source: "api-data",
        paint: {
          "fill-color": "red",
          "fill-opacity": 0.6,
        },
      });
      
      mapRef.current.addLayer({
        id: "api-polygon-outlines",
        type: "line",
        source: "api-data",
        paint: {
          "line-color": "red",
          "line-width": 1
        }
      });
      
      
      if (geojson.features.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        geojson.features.forEach(feature => {
          if (feature.geometry.type === "Polygon") {
            feature.geometry.coordinates[0].forEach(coord => {
              bounds.extend([coord[0], coord[1]]);
            });
          }
        });
        
       
        if (bounds.getNorthEast() && bounds.getSouthWest()) {
          mapRef.current.fitBounds(bounds, { padding: 50 });
        }
      }
      
      setDataLoaded(true);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  
  const toggleTestPolygons = () => {
    if (testPolygonsVisible) {
      removeTestPolygons();
    } else {
      addTestPolygons();
    }
    setTestPolygonsVisible(!testPolygonsVisible);
  };

  
  const addTestPolygons = () => {
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;
    
    try {
      
      removeTestPolygons(false);
      
      mapRef.current.addSource("test-source", {
        type: "geojson",
        data: WestAfricaTestGeoJson as any
      });
  
      mapRef.current.addLayer({
        id: "test-polygons",
        type: "fill",
        source: "test-source",
        paint: {
          "fill-color": [
            'match',
            ['%', ['get', 'id'], 5],
            0, '#FF5733',
            1, '#33FF57',
            2, '#3357FF',
            3, '#F3FF33',
            4, '#FF33F3',
            '#4287f5'  // default
          ],
          "fill-opacity": 0.7,
          "fill-outline-color": "#000"
        }
      });
      
    
      mapRef.current.addLayer({
        id: "test-labels",
        type: "symbol",
        source: "test-source",
        layout: {
          "text-field": ["get", "name"],
          "text-size": 12,
          "text-offset": [0, 0],
          "text-anchor": "center"
        },
        paint: {
          "text-color": "#000",
          "text-halo-color": "#fff",
          "text-halo-width": 1
        }
      });
      
      // Fit the map to show all test polygons
      const bounds = new mapboxgl.LngLatBounds();
      WestAfricaTestGeoJson.features.forEach(feature => {
        feature.geometry.coordinates[0].forEach(coord => {
          bounds.extend(coord as any);
        });
      });
      
      mapRef.current.fitBounds(bounds, { padding: 50 });
      
      console.log("Test polygons added");
    } catch (error) {
      console.error("Error adding test polygons:", error);
    }
  };


  const removeTestPolygons = (updateState = true) => {
    if (!mapRef.current) return;
    
    try {
      if (mapRef.current.getLayer('test-labels')) {
        mapRef.current.removeLayer('test-labels');
      }
      
      if (mapRef.current.getLayer('test-polygons')) {
        mapRef.current.removeLayer('test-polygons');
      }
      
      if (mapRef.current.getSource('test-source')) {
        mapRef.current.removeSource('test-source');
      }
      
      console.log("Test polygons removed");
      
      if (updateState) {
        setTestPolygonsVisible(false);
      }
    } catch (error) {
      console.error("Error removing test polygons:", error);
    }
  };

  // Initialize the map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: `mapbox://styles/mapbox/${currentStyle}`,
      center: [0, 0],
      zoom: 1,
    });

    setZoomIn(() => () => mapRef.current?.zoomIn());
    setZoomOut(() => () => mapRef.current?.zoomOut());

    
    mapRef.current.on("load", () => {
      mapRef.current?.flyTo({
        center: [-5.5471, 7.7460],
        zoom: 5.5,
        duration: 3000,
        easing: (t) => t * (2 - t),
        
        essential: true
      });
      
      
      setTimeout(() => {
        fetchData();
      }, 3500);
    });

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

  return (
    <div className="relative h-screen w-full">
      <div className="h-screen w-full" ref={mapContainerRef} />

      <div className="absolute top-4 right-4 z-10">
        <button
          className="bg-white text-black border border-[#18252F] p-2 mt-[450px] mr-10 rounded-[4px] shadow-md text-sm hover:bg-blue-300 transition-all ease-linear"
          onClick={toggleMenu}
        >
          Map Style
        </button>

        {isOpen && (
          <div className="absolute top-64 right-0 bg-white rounded-sm shadow-md p-2 w-48">
            <ul>
              <li
                className={`p-2 cursor-pointer hover:bg-gray-100 rounded flex items-center gap-2 ${
                  currentStyle === "satellite-streets-v12" ? "bg-blue-100" : ""
                }`}
                onClick={() => changeMapStyle("satellite-streets-v12")}
              >
                <Satellite size={16} /> Satellite View
              </li>
              <li
                className={`p-2 cursor-pointer hover:bg-gray-100 rounded flex items-center gap-2 ${
                  currentStyle === "streets-v12" ? "bg-blue-100" : ""
                }`}
                onClick={() => changeMapStyle("streets-v12")}
              >
                <Map size={16} /> Street View
              </li>
              <li
                className={`p-2 cursor-pointer hover:bg-gray-100 rounded ${
                  currentStyle === "light-v11" ? "bg-blue-100" : ""
                }`}
                onClick={() => changeMapStyle("light-v11")}
              >
                Light View
              </li>
              <li
                className={`p-2 cursor-pointer hover:bg-gray-100 rounded ${
                  currentStyle === "dark-v11" ? "bg-blue-100" : ""
                }`}
                onClick={() => changeMapStyle("dark-v11")}
              >
                Dark View
              </li>
            </ul>
          </div>
        )}
      </div>
      
     
      <button
        className={`absolute bottom-24 left-4 z-10 flex items-center gap-2 p-2 rounded shadow transition-colors ${
          testPolygonsVisible ? "bg-blue-500 text-white" : "bg-white text-black"
        }`}
        onClick={toggleTestPolygons}
      >
        <Layers size={16} />
        {testPolygonsVisible ? "Hide Test Polygons" : "Show Test Polygons"}
      </button>
    </div>
  );
};

export { MapContainer };