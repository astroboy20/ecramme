import Image from "next/image";
import { Sidebar } from "./components/sidebar";
import { MapContainer } from "./components/map";
import { CostalFlood } from "./costal-flood/container/costal-flood";

export default function Home() {
  return (
    <main className="flex min-h-screen ">
    <CostalFlood/>
    </main>
  );
}
