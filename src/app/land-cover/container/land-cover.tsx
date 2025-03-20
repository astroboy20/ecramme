"use client"
import { Header } from "@/app/components/header";
import { MapContainer } from "@/app/components/map";
import { MapWithControls } from "@/app/components/map-with-controls";
import { Sidebar } from "@/app/components/sidebar";
import { Button } from "@/components/ui/button";
import { Download, PlusIcon, MinusIcon } from "lucide-react";
import { useRef } from "react";


const LandCover = () => {
  return (
    <div className="w-full">
      {/* ✅ Fixed Header */}
      <div className="fixed w-full z-[100000000000000]">
        <Header />
      </div>

      {/* ✅ Use Reusable Component */}
      <MapWithControls showSidebar={true} showExportButton={true} />
    </div>
  );
};

export { LandCover };
