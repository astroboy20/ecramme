"use client";
import { useEffect, useState } from "react";
import { Header } from "@/app/components/header";
import { MapWithControls } from "@/app/components/map-with-controls";
import axios from "axios";

const FlashFlood = () => {
  const [coordinates, setCoordinates] = useState<[number, number][][] | undefined>(undefined);

  useEffect(() => {
    axios
      .get(
        "http://ec2-52-14-7-103.us-east-2.compute.amazonaws.com/api/collections/55cd0bed-2f4a-46b9-bc40-8f309e607551"
      )
      .then((response) => {
        const features = response.data.features;
        const allCoordinates = features.map((feature: { coordinates: any }) => feature.coordinates);
        setCoordinates(allCoordinates);
        console.log(allCoordinates);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="w-full">
      <div className="fixed w-full z-[100000000000000]">
        <Header />
      </div>
      {/* Pass the extracted coordinates to your map component */}
      <MapWithControls showSidebar={true} showExportButton={true} coordinates={coordinates} />
    </div>
  );
};

export { FlashFlood };
