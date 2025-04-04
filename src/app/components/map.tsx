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
  file_type?: string; 
}

interface FeatureData {
  coordinates: Array<[number, number]>;
  type?: string;
  properties?: Record<string, any>;
}


interface FileTypeSettings {
  color: string;
  opacity: number;
  label: string;
}


interface MapContainerProps {
  setZoomIn?: (zoomFn: () => void) => void;
  setZoomOut?: (zoomFn: () => void) => void;
  coordinates?: Array<Array<[number, number]>>;
  dataType?: string;
  fileType?: string;
  dataUrl?: string;
  initialCenter?: [number, number];  
  initialZoom?: number;
  polygonColor?: string;
  polygonOpacity?: number;
  showStyleToggle?: boolean;
}

const MapContainer = ({ 
  setZoomIn, 
  setZoomOut, 
  coordinates, 
  dataType = "geotiff", 
  fileType,
  dataUrl,
  initialCenter = [-5.5471, 7.7460],
  initialZoom = 5.5,
  polygonColor = "#FF0000",
  polygonOpacity = 0.5,
  showStyleToggle = true
}: MapContainerProps) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentStyle, setCurrentStyle] = useState("satellite-streets-v12");
  const [loadingStatus, setLoadingStatus] = useState<string>("Preparing map...");
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [mapData, setMapData] = useState<GeoTiffData[] | FeatureData[]>([]);

  
  const fileTypeSettings: Record<string, FileTypeSettings> = {
    flash_flood: {
      color: "#0000FF", 
      opacity: 0.4,
      label: "Flash Flood"
    },
    population: {
      color: "#FF9900", 
      opacity: 0.5,
      label: "Population"
    },
    
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const changeMapStyle = (styleName: string) => {
    if (mapRef.current) {
      mapRef.current.setStyle(`mapbox://styles/mapbox/${styleName}`);
      setCurrentStyle(styleName);
      setIsOpen(false);
    }
  };

  // Calculate RGB color based on value
  const getColorForValue = (value: number, max: number): [number, number, number] => {
    // Normalize value between 0 and 1
    const normalized = Math.min(1, Math.max(0, value / max));
    
    // Create a gradient similar to the reference image
    if (normalized < 0.25) {
      // Blue to cyan (0-25%)
      const t = normalized * 4; 
      return [
        0,                      
        Math.floor(150 + 105 * t), 
        255                     
      ];
    } else if (normalized < 0.5) {
      // Cyan to green to yellow (25-50%)
      const t = (normalized - 0.25) * 4;
      return [
        Math.floor(255 * t),    
        255,                     
        Math.floor(255 * (1 - t))
      ];
    } else if (normalized < 0.75) {
      // Yellow to orange (50-75%)
      const t = (normalized - 0.5) * 4;
      return [
        255,                    
        Math.floor(255 - 130 * t),
        0                        
      ];
    } else {
      // Orange to red (75-100%)
      const t = (normalized - 0.75) * 4;
      return [
        255,                    
        Math.floor(125 - 125 * t),
        0                       
      ];
    }
  };
  
  const loadGeoTIFF = async (item: GeoTiffData, map: mapboxgl.Map) => {
    try {
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
      
      const rasters = await image.readRasters();
      const raster = rasters[0];
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Could not get canvas 2D context");
      
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      
      // Set maximum value for normalization
      const maxVal = 1000;
      
      if (typeof raster !== "number") {
        // First pass to find actual maximum value in this raster
        let actualMax = 0;
        for (let i = 0; i < raster.length; i++) {
          if (raster[i] > actualMax) {
            actualMax = raster[i];
          }
        }
        
        // Use either the calculated max or the predefined max, but ensure it's not zero
        const useMax = (actualMax > 0 && actualMax < maxVal) ? actualMax : maxVal;
        
        for (let i = 0; i < raster.length; i++) {
          const value = raster[i];
          
          // Skip no-data values (assuming 0 or negative values are no-data)
          if (value <= 0) {
            data[i * 4] = 0;     // R
            data[i * 4 + 1] = 0; // G
            data[i * 4 + 2] = 0; // B
            data[i * 4 + 3] = 0; // Alpha (transparent)
            continue;
          }
          
          // Apply a log scale for better visualization
          const logValue = Math.log(1 + value) / Math.log(1 + useMax);
          
          // Get color based on value
          const [r, g, b] = getColorForValue(logValue, 1);
          
          // Set RGBA values
          data[i * 4] = r;     // R
          data[i * 4 + 1] = g; // G
          data[i * 4 + 2] = b; // B
          data[i * 4 + 3] = 220; // Alpha (semi-transparent)
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
            'raster-opacity': 0.8,
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

  
  const fetchData = async () => {
    if (!dataUrl) return;
    
    try {
      
      const url = dataUrl.includes('http') 
        ? `/api/proxy?url=${encodeURIComponent(dataUrl)}`
        : dataUrl;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (dataType === "geotiff") {
        
        let dataArray = Array.isArray(data) ? data : [data];
        
        
        if (fileType) {
          dataArray = dataArray.filter(item => item.file_type === fileType);
        }
        
        setTotalCount(dataArray.length);
        setMapData(dataArray);
      } else if (dataType === "feature") {
        
        let features = data.features || data;
        let featureData: FeatureData[] = [];
        
        if (Array.isArray(features)) {
          featureData = features.map((feature: any) => ({
            coordinates: feature.coordinates || 
                        (feature.geometry?.coordinates && feature.geometry.coordinates[0]) || [],
            type: feature.type || dataType,
            properties: feature.properties || {}
          }));
        }
        
        setMapData(featureData);
      }
    } catch (err) {
      console.error(`Error loading ${dataType} data:`, err);
      setLoadingStatus(`Error loading ${dataType} data`);
    }
  };

  
  const renderPolygons = (map: mapboxgl.Map, polyCoordinates: Array<Array<[number, number]>>) => {
    const geoJson: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
      type: "FeatureCollection",
      features: polyCoordinates.map((coords, index) => ({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [coords],
        },
        properties: { id: index },
      })),
    };

    if (map.getSource("dataFeatures")) {
      (map.getSource("dataFeatures") as mapboxgl.GeoJSONSource).setData(geoJson);
    } else {
      map.addSource("dataFeatures", {
        type: "geojson",
        data: geoJson,
      });
      map.addLayer({
        id: "dataPolygons",
        type: "fill",
        source: "dataFeatures",
        layout: {},
        paint: {
          "fill-color": polygonColor,
          "fill-opacity": polygonOpacity,
        },
      });
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

    if (setZoomIn) {
      setZoomIn(() => () => mapRef.current?.zoomTo((mapRef.current?.getZoom() || 0) + 1));
    }
    
    if (setZoomOut) {
      setZoomOut(() => () => mapRef.current?.zoomTo((mapRef.current?.getZoom() || 0) - 1));
    }

    mapRef.current.on("load", () => {
      mapRef.current?.flyTo({
        center: initialCenter,
        zoom: initialZoom,
        duration: 3000,
        essential: true,
      });

      
      if (dataUrl) {
        fetchData();
      } else if (dataType === "geotiff") {
        
        fetch(`/api/proxy?url=${encodeURIComponent('http://ec2-52-14-7-103.us-east-2.compute.amazonaws.com/api/collections/')}`)
          .then((response) => response.json())
          .then((apiData: GeoTiffData[]) => {
            if (!apiData || apiData.length === 0) {
              throw new Error("No GeoTIFF data available");
            }
            
            
            let filteredData = fileType 
              ? apiData.filter(item => item.file_type === fileType)
              : apiData;
            
            setTotalCount(filteredData.length);
            setLoadingStatus(`Loading ${filteredData.length} GeoTIFFs...`);
            setMapData(filteredData);
            
            if (mapRef.current) {
              processBatchGeoTIFFs(filteredData, mapRef.current);
            }
          })
          .catch((err) => {
            console.error("Error loading GeoTIFFs:", err);
            setLoadingStatus("Error loading GeoTIFFs");
          });
      }
    });

    return () => {
      mapRef.current?.remove();
    };
  }, [setZoomIn, setZoomOut, currentStyle, dataUrl, dataType, fileType, initialCenter, initialZoom]);

  // Process data when it changes
  useEffect(() => {
    if (!mapRef.current || mapData.length === 0) return;
    
    if (dataType === "geotiff") {
      processBatchGeoTIFFs(mapData as GeoTiffData[], mapRef.current);
    } else if (dataType === "feature") {
      const featureData = mapData as FeatureData[];
      const coordinatesArray = featureData.map(feature => feature.coordinates);
      renderPolygons(mapRef.current, coordinatesArray);
    }
  }, [mapData, dataType]);

  // Handle coordinates provided directly as props
  useEffect(() => {
    if (!mapRef.current || !coordinates) return;
    renderPolygons(mapRef.current, coordinates);
  }, [coordinates, polygonColor, polygonOpacity]);

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
      
      {showStyleToggle && (
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
      )}
    </div>
  );
};

export { MapContainer };