import Image from "next/image";
import { Sidebar } from "./components/sidebar";
import { MapContainer } from "./components/map";

export default function Home() {
  return (
    <main className="flex min-h-screen ">
      <MapContainer />
      <Sidebar />
    </main>
  );
}
