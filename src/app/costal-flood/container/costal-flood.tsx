import { Header } from "@/app/components/header";
import { MapContainer } from "@/app/components/map";
import { Sidebar } from "@/app/components/sidebar";
import React from "react";

const CostalFlood = () => {
  return (
    <div className="w-full">
      <div className="fixed w-full z-[1000000]">
        <Header/>
      </div>
      <div className="absolute top-24 left-5 w-fit z-[1000000]">
        <Sidebar />
      </div>
      <div className=" h-full w-full">
        <MapContainer />
      </div>
    </div>
  );
};

export { CostalFlood };
