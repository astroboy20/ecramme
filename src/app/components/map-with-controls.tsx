"use client";  // ✅ Required for Client Components
import { Sidebar } from "@/app/components/sidebar";
import { Button } from "@/components/ui/button";
import { Download, PlusIcon, MinusIcon } from "lucide-react";
import { useState } from "react";
import { MapContainer } from "@/app/components/map";

interface MapWithControlsProps {
  showSidebar?: boolean;
  showExportButton?: boolean;
}

const MapWithControls = ({ showSidebar = true, showExportButton = true }: MapWithControlsProps) => {
  const [zoomIn, setZoomIn] = useState<() => void>(() => () => {});
  const [zoomOut, setZoomOut] = useState<() => void>(() => () => {});

  return (
    <div className="w-full">
      {/* ✅ Sidebar & Controls */}
      <div className="absolute top-24 px-7 flex justify-between z-[1000000] w-full">
        {showSidebar && <Sidebar />}
        <div className="flex flex-col">
          {showExportButton && (
            <Button className="bg-black text-white p-3 rounded-[4px] py-[18px] px-6 h-[45px] font-[500] w-fit ml-auto">
              Export <Download />
            </Button>
          )}
          <div className="flex gap-10 mt-auto">
            <Button className="bg-white text-black p-3 rounded-[4px] py-[18px] px-6 h-[45px] font-[500] mt-auto border border-[#18252F]">
              View Legend
            </Button>
            <div className="flex flex-col gap-4">
              {/* ✅ Zoom In Button */}
              <Button className="w-fit bg-[#18252F]" onClick={zoomIn}>
                <PlusIcon />
              </Button>
              {/* ✅ Zoom Out Button */}
              <Button className="w-fit bg-[#18252F]" onClick={zoomOut}>
                <MinusIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ MapContainer */}
      <div className="h-full w-full">
        <MapContainer setZoomIn={setZoomIn} setZoomOut={setZoomOut} />
      </div>
    </div>
  );
};

export { MapWithControls };
