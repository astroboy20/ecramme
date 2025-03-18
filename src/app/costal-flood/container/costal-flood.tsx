import { Header } from "@/app/components/header";
import { MapContainer } from "@/app/components/map";
import { Sidebar } from "@/app/components/sidebar";
import { Button } from "@/components/ui/button";
import { Download, PlusIcon, MinusIcon } from "lucide-react";

const App = () => {
  return <Download />;
};

export default App;

import React from "react";

const CostalFlood = () => {
  return (
    <div className="w-full">
      <div className="fixed w-full z-[1000000]">
        <Header />
      </div>
      <div className=" absolute top-28 px-7  flex justify-between z-[1000000] w-full">
        <div className=" w-fit ">
          <Sidebar />
        </div>
        <div className="flex flex-col ">
          <Button className="bg-black text-white p-3 rounded-[4px] py-[18px] px-6 h-[45px] font-[500] w-fit ml-auto">
            Export <Download />
          </Button>
          <div className="flex gap-10 mt-auto">
            <Button className="bg-white text-black p-3 rounded-[4px] py-[18px] px-6 h-[45px] font-[500] mt-auto border border-[#18252F]">
              View Legend
            </Button>
            <div className="flex flex-col gap-4">
              <Button className="w-fit bg-[#18252F]">
                <PlusIcon />
              </Button>
              <Button className="w-fit bg-[#18252F]">
                <MinusIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className=" h-full w-full">
        <MapContainer />
      </div>
    </div>
  );
};

export { CostalFlood };
