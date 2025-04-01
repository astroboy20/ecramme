"use client";

import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map, Satellite } from "lucide-react";
import { fromUrl } from "geotiff";

interface GeoTiffData {
  id: string;
  s3_url: string;
  date: string;
}

interface MapContainerProps {
  setZoomIn: (zoomFn: () => void) => void;
  setZoomOut: (zoomFn: () => void) => void;
  coordinates?: Array<Array<[number, number]>>;
}

const MapContainer = ({ setZoomIn, setZoomOut, coordinates }: MapContainerProps) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentStyle, setCurrentStyle] = useState("streets-v12");
  const [loadingStatus, setLoadingStatus] = useState<string>("Preparing map...");
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const toggleMenu = () => setIsOpen(!isOpen);

  const changeMapStyle = (styleName: string) => {
    if (mapRef.current) {
      mapRef.current.setStyle(`mapbox://styles/mapbox/${styleName}`);
      setCurrentStyle(styleName);
      setIsOpen(false);
    }
  };

  
  const loadGeoTIFF = async (item: GeoTiffData, map: mapboxgl.Map) => {
    try {
      console.log(`Loading GeoTIFF: ${item.id} - ${item.date}`);
      const tiff = await fromUrl(item.s3_url);
      const image = await tiff.getImage();
      
     
      const fileDirectory = image.getFileDirectory();
      const modelPixelScale = fileDirectory.ModelPixelScale;
      const modelTiepoint = fileDirectory.ModelTiepoint;
      
     
      const width = image.getWidth();
      const height = image.getHeight();
      
      
      const bounds = [
        modelTiepoint[3],                                       
        modelTiepoint[4] - (height * modelPixelScale[1]),      
        modelTiepoint[3] + (width * modelPixelScale[0]),        
        modelTiepoint[4]                                        
      ];
      
      console.log(`GeoTIFF ${item.id} bounds:`, bounds);
      
     
      const rasters = await image.readRasters();
      const raster = rasters[0];
      
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Could not get canvas 2D context");
      
     
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      
   
      const maxVal = 1000;
      
      
      if (typeof raster !== "number") {
        for (let i = 0; i < raster.length; i++) {
          const value = raster[i];
          
          const normalizedValue = Math.min(255, Math.max(0, Math.floor((value / maxVal) * 255)));
          
          
          data[i * 4] = normalizedValue;     
          data[i * 4 + 1] = normalizedValue; 
          data[i * 4 + 2] = normalizedValue; 
          data[i * 4 + 3] = value > 0 ? 200 : 0;
        }
      } else {
        throw new Error("Unexpected raster type: number");
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      
      const imageUrl = canvas.toDataURL();
      
     
      const canvasImage = new Image();
      canvasImage.onload = () => {
        if (!map) return;
        
       
        map.addSource(`geotiff-source-${item.id}`, {
          type: 'image',
          url: imageUrl,
          coordinates: [
            [bounds[0], bounds[3]],
            [bounds[2], bounds[3]], 
            [bounds[2], bounds[1]], 
            [bounds[0], bounds[1]]  
          ]
        });
        
        
        map.addLayer({
          id: `geotiff-layer-${item.id}`,
          type: 'raster',
          source: `geotiff-source-${item.id}`,
          paint: {
            'raster-opacity': 0.7,
            'raster-fade-duration': 0
          }
        });
        
        
        setLoadedCount(prev => {
          const newCount = prev + 1;
          setLoadingStatus(`Loaded ${newCount} of ${totalCount} GeoTIFFs...`);
          return newCount;
        });
      };
      
      canvasImage.src = imageUrl;
    } catch (err) {
      console.error(`Error loading GeoTIFF ${item.id}:`, err);
     
      setLoadedCount(prev => prev + 1);
    }
  };

  
  const processBatchGeoTIFFs = async (items: GeoTiffData[], map: mapboxgl.Map, batchSize: number = 5) => {
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      setLoadingStatus(`Loading GeoTIFFs ${i+1}-${Math.min(i+batchSize, items.length)} of ${items.length}...`);
      
     
      await Promise.all(batch.map(item => loadGeoTIFF(item, map)));
      
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setLoadingStatus(`Completed loading ${items.length} GeoTIFFs`);
    
   
    if (map && items.length > 0) {
      map.fitBounds([
        [-8.5471, 4.5460], 
        [-3.5471, 10.5460]  
      ], { padding: 50 });
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: `mapbox://styles/mapbox/${currentStyle}`,
      center: [0, 0],
      zoom: 1,
    });

    setZoomIn(() => () => mapRef.current?.zoomTo(mapRef.current.getZoom() + 1));
    setZoomOut(() => () => mapRef.current?.zoomTo(mapRef.current.getZoom() - 1));

    mapRef.current.on("load", () => {
      mapRef.current?.flyTo({
        center: [-5.5471, 7.7460],
        zoom: 5.5,
        duration: 3000,
        essential: true,
      });

     
      fetch("http://ec2-52-14-7-103.us-east-2.compute.amazonaws.com/api/collections/")
        .then((response) => response.json())
        .then((apiData: GeoTiffData[]) => {
         // console.log("API Response:", apiData);
          if (!apiData || apiData.length === 0) {
            throw new Error("No GeoTIFF data available");
          }
          
         
          setTotalCount(apiData.length);
          setLoadingStatus(`Loading ${apiData.length} GeoTIFFs...`);
          
          
          if (mapRef.current) {
            processBatchGeoTIFFs(apiData, mapRef.current);
          }
        })
        .catch((err) => {
          console.error("Error loading GeoTIFFs:", err);
          setLoadingStatus("Error loading GeoTIFFs");
        });
    
    });

    return () => {
      mapRef.current?.remove();
    };
  }, [setZoomIn, setZoomOut, currentStyle]);

  
  useEffect(() => {
    if (!mapRef.current || !coordinates) return;
    const geoJson: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
      type: "FeatureCollection",
      features: coordinates.map((coords, index) => ({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [coords],
        },
        properties: { id: index },
      })),
    };

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
          "fill-color": "#FF0000",
          "fill-opacity": 0.5,
        },
      });
    }
  }, [coordinates]);

  return (
    <div className="relative h-screen w-full">
      <div className="h-screen w-full" ref={mapContainerRef} />
      
    
      {loadedCount < totalCount && totalCount > 0 && (
        <div className="absolute top-52 left-4 z-10 bg-white p-2 rounded shadow-md">
          <div className="text-sm">{loadingStatus}</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${(loadedCount / totalCount) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <div className="absolute top-4 right-4 z-10">
        <button
          className="bg-white text-black border border-gray-400 p-2 mt-[450px] mr-10 rounded shadow-md text-[12px] hover:bg-blue-300 transition"
          onClick={toggleMenu}
        >
          Map Style
        </button>
        {isOpen && (
          <div className="absolute top-[350px] text-[15px] right-0 bg-white rounded shadow-md p-2 w-48">
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
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export { MapContainer };