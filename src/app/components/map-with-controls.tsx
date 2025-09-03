"use client";
import { Sidebar } from "@/app/components/sidebar";
import { Button } from "@/components/ui/button";
import { Download, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import { MapContainer } from "@/app/components/map";
import { DateFilter } from "@/app/components/date-filter";
import FeedModal from "./feedback";
import AboutModal from "./about";

interface MapWithControlsProps {
  showSidebar?: boolean;
  showExportButton?: boolean;
  coordinates?: Array<Array<[number, number]>>;
  mapProps?: any;
  showDateFilter?: boolean;
  geojson?: GeoJSON.FeatureCollection | null; // Allow null for GeoJSON data
}

const LegendGradient = ({ lowColor = 'blue', highColor = 'red' }) => {
  const gradientStyle = {
    background: `linear-gradient(to right, ${lowColor}, ${highColor})`,
    width: '130px',
    height: '20px',
    borderRadius: '5px',
    margin: '10px 0',
  };

  const labelStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8em',
    color: '#333',
  };

  return (
    <div>
      <div style={gradientStyle} />
      <div style={labelStyle}>
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  );
};

const MapWithControls = ({
  showSidebar = true,
  showExportButton = true,
  coordinates,
  mapProps = {},
  showDateFilter = true,
  geojson // Destructure new prop
}: MapWithControlsProps) => {
  const [zoomIn, setZoomIn] = useState<(() => void) | null>(null);
  const [zoomOut, setZoomOut] = useState<(() => void) | null>(null);
  const [isDownload, setIsDownload] = useState(false);
  const [isLegend, setIsLegend] = useState(false);
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date(2020, 0, 1));
  const [toDate, setToDate] = useState<Date | undefined>(new Date());

  const toggleDownload = () => {
    setIsDownload((prev) => !prev);
  };

  const toggleLegend = () => {
    setIsLegend((prev) => !prev);
  };

  const handleDateChange = (from: Date | undefined, to: Date | undefined) => {
    setFromDate(from);
    setToDate(to);
  };

  // Include fromDate and toDate in mapProps
  const combinedMapProps = {
    ...mapProps,
    fromDate,
    toDate,
    setZoomIn,
    setZoomOut,
    coordinates,
    geojson
  };

  return (
    <div className="w-full relative">



      <div className="absolute right-[50px] top-36 transform -translate-y-1/2 z-50 flex flex-col space-y-2">
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






      {showDateFilter && (
        <div className="fixed bottom-0.5 w-10 mr-52 right-4 lg:right-96 lg:bottom-auto lg:top-[700px] z-[1000]">
          <DateFilter
            onDateRangeChange={handleDateChange}
            initialFromDate={fromDate}
            initialToDate={toDate}

          />
        </div>
      )}

      {/* Bottom Left Controls */}
      <div className="absolute bottom-7 right-9 top-[500px] flex gap-4 z-[100] space-y-2">




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
                <div className="absolute z-[500] text-[13px] bottom-0 mb-12 bg-white shadow-lg border border-gray-200 rounded p-3 flex flex-col space-y-2">
                  <p className="font-bold text-center">Downloads</p>
                  <a href="/datas/Marine Heatwaves (Historical).xls" download className="cursor-pointer hover:underline block">Marine Heatwaves (Historical).xls</a>
                  <a href="/datas/Projected Sea Level Rise.xls" download className="cursor-pointer hover:underline block">Projected Sea Level Rise.xls</a>
                  <a href="/datas/Projected Storms.xlsx" download className="cursor-pointer hover:underline block">Projected Storms.xlsx</a>
                  <a href="/datas/Sea Level Rise (Historical).xls" download className="cursor-pointer hover:underline block">Sea Level Rise (Historical).xls</a>
                  <a href="/datas/Storm Surges (Historical).xlsx" download className="cursor-pointer hover:underline block">Storm Surges (Historical).xlsx</a>

                  <button onClick={toggleDownload} className="text-center text-red-500 self-center">Close</button>
                </div>
              )}
            </>
          )}
        </div>

        <Button
          className="bg-white text-[13px] text-black p-3 rounded-[4px] z-[50] border border-[#18252F] hover:bg-blue-300 transition-colors ease-linear duration-75"
          onClick={toggleLegend}
        >
          View Legend
        </Button>
        {isLegend && (
          <div className="absolute z-[500] text-[13px] mr-20 bottom-0 w-40 mb-40 bg-white shadow-lg border border-gray-200 rounded p-3">
            <h2 className="text-center">Legend</h2>
            <LegendGradient lowColor="green" highColor="yellow" />
            <LegendGradient />
            <LegendGradient lowColor="purple" highColor="orange" />
            <button
              onClick={toggleLegend}
              className="text-center text-red-500 ml-10"
            >
              Close
            </button>
          </div>
        )}




      </div>

      <div className="hover:bg-slate-800 rounded transition-all ease-linear duration-75">
        <FeedModal />
        <AboutModal />
      </div>

      <div className="min-h-screen flex flex-col">
        <MapContainer {...combinedMapProps} />
      </div>
    </div>
  );
};

export { MapWithControls };
