import { MapContainer } from "@/app/components/map";
import { Sidebar } from "@/app/components/sidebar";
import React from "react";

const CostalFlood = () => {
  return (
    <div className="w-full">
      <div className="absolute top-10 left-5 w-fit z-[1000000]">
        <Sidebar />
      </div>
      <div className=" h-full w-full">
        <MapContainer />
      </div>
    </div>
  );
};

export { CostalFlood };
