"use client";
import { Sidebar } from "@/app/components/sidebar";
import { Button } from "@/components/ui/button";
import { Download, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import { MapContainer } from "@/app/components/map";
import FeedModal from "./feedback";

interface MapWithControlsProps {
  showSidebar?: boolean;
  showExportButton?: boolean;
}

const MapWithControls = ({
  showSidebar = true,
  showExportButton = true,
}: MapWithControlsProps) => {
  const [zoomIn, setZoomIn] = useState<(() => void) | null>(null);
  const [zoomOut, setZoomOut] = useState<(() => void) | null>(null);
  const [isDownload, setIsDownload] = useState(false);

  const toggleDownload = () => {
    setIsDownload((prev) => !prev);
  };

  return (
    <div className="w-full relative">
      {/* Sidebar */}
      {showSidebar && (
        <div className="absolute top-24 left-7 z-[1000]">
          <Sidebar />
        </div>
      )}

      {/* Zoom Buttons - Left Side */}
      <div className="absolute right-[50px] top-36 transform -translate-y-1/2 z-[100] flex flex-col space-y-2">
        <Button 
          className="w-fit bg-[#18252F] p-2 rounded-md hover:bg-[#34495E] transition-colors" 
          onClick={() => zoomIn && zoomIn()}
        >
          <ZoomIn />
        </Button>
        <Button 
          className="w-fit bg-[#18252F] p-2 rounded-md hover:bg-[#34495E] transition-colors" 
          onClick={() => zoomOut && zoomOut()}
        >
          <ZoomOut />
        </Button>
      </div>

      {/* Bottom Left Controls */}
      <div className="absolute bottom-7 right-9 top-[500px] flex gap-4 z-[100]  space-y-2">
        <div className="relative">
          {showExportButton && (
            <>
              <Button 
                className="w-fit bg-[#18252F] p-2 rounded-md z-[50] hover:bg-[#34495E] transition-colors mt-2"
                onClick={toggleDownload}
              >
                <Download />
              </Button>
              {isDownload && (
                <div className="absolute z-[500] left-full ml-2 bottom-0 bg-white shadow-lg border border-gray-200 rounded p-3">
                  <p
                    className="cursor-pointer hover:underline"
                    onClick={() => setIsDownload(false)}
                  >
                    Export as raster file
                  </p>
                  <p
                    className="cursor-pointer hover:underline"
                    onClick={() => setIsDownload(false)}
                  >
                    Export as CSV file
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        
        <Button className="bg-white text-black p-3 rounded-[4px] z-[50] border border-[#18252F]">
          View Legend
        </Button>
      </div>

       <div className=" hover:bg-slate-800 rounded transition-all ease-linear duration-75">
                  <FeedModal/>
                  </div>

      <div className="min-h-screen flex flex-col">
        <MapContainer 
          setZoomIn={setZoomIn} 
          setZoomOut={setZoomOut} 
        />
      </div>
    </div>
  );
};

export { MapWithControls };