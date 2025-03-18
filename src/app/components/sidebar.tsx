import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-[#18252F] py-[80px] px-[48px]">
      <Link href="/"> Coastal Floods</Link>
      <Link href="/">Flash Flood</Link>
      <Link href="/">Sea Level Rise</Link>
      <Link href="/">Marine Heatwaves</Link>
      <Link href="/">Storm Surges</Link>
      <Link href="/">Land Cover</Link>
      <Link href="/">Coastal Erosion</Link>
    </div>
  );
};

export { Sidebar };
