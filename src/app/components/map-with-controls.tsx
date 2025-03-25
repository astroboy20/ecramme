"use client"; // ✅ Required for Client Components
import { Sidebar } from "@/app/components/sidebar";
import { Button } from "@/components/ui/button";
import { Download, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import { MapContainer } from "@/app/components/map";

interface MapWithControlsProps {
  showSidebar?: boolean;
  showExportButton?: boolean;
}

const MapWithControls = ({
  showSidebar = true,
  showExportButton = true,
}: MapWithControlsProps) => {
  const [zoomIn, setZoomIn] = useState<() => void>(() => () => {});
  const [zoomOut, setZoomOut] = useState<() => void>(() => () => {});
  const [isDownload, setIsDownload] = useState(false);

  const toggleDownload = () => {
    setIsDownload((prev) => !prev);
  };

  return (
    <div className="w-full">
      {/* ✅ Sidebar & Controls */}
      <div className="absolute top-24 px-7 flex justify-between z-[1000000] w-full">
        {showSidebar && <Sidebar />}
        <div className="flex flex-col">
          <div className="flex gap-10 mt-0">
            {/* ✅ Zoom Buttons */}
            <div className="flex flex-col gap-1 left-16   relative">
              <Button className="w-fit bg-[#2C3E50] p-2 rounded-md hover:bg-[#34495E] transition-colors" onClick={zoomIn}>
                <ZoomIn />
              </Button>
              <Button className="w-fit bg-[#2C3E50] p-2 rounded-md hover:bg-[#34495E] transition-colors" onClick={zoomOut}>
                <ZoomOut />
              </Button>
            </div>

            {/* ✅ View Legend Button */}
            <Button 
  className="bg-white text-black p-3 rounded-[4px] py-[18px] px-6 h-[45px] font-[500]   top-[700px] left-[550px] mt-auto border  border-[#18252F] cursor-pointer hover:bg-black hover:text-white transition-colors duration-300"
>
  View Legend
</Button>

            {/* ✅ Export Button with Dropdown */}
            {showExportButton && (
              <div className="relative">
                <Button
                  onClick={toggleDownload}
                  className="bg-black text-white p-3 rounded-[4px] py-[18px] px-6 h-[45px] font-[500] w-fit mr-[950px] flex items-center   mt-[500px]  "
                >
                  Export <Download />
                </Button>
                {/* Animated export options */}
                <div
                  className={`absolute right-0  bg-white shadow-lg border border-gray-200 rounded p-3 mr-[1000px] transition-all duration-300 ease-in-out ${
                    isDownload ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
                  }`}
                >
                  <p className="cursor-pointer hover:underline" onClick={() => setIsDownload(false)}>
                    Export as raster file
                  </p>
                  <p className="cursor-pointer hover:underline" onClick={() => setIsDownload(false)}>
                    Export as csv file
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="min-h-screen flex flex-col">
        <MapContainer setZoomIn={setZoomIn} setZoomOut={setZoomOut} />
      </div>
    </div>
  );
};

export { MapWithControls };