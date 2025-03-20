"use client";
import { Header } from "@/app/components/header";
import { MapContainer } from "@/app/components/map";
import { MapWithControls } from "@/app/components/map-with-controls";
import { Sidebar } from "@/app/components/sidebar";
import { Button } from "@/components/ui/button";
import { Download, PlusIcon, MinusIcon } from "lucide-react";
import { useState } from "react";

const CoastalFlood = () => {
  return (
    <div className="w-full">
      {/* ✅ Fixed Header */}
      <div className="fixed w-full z-[100000000000000]">
        <Header />
      </div>

      <MapWithControls showSidebar={true} showExportButton={true} />
    </div>
  );
};

export { CoastalFlood };
