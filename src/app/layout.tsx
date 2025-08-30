import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Sidebar } from "./components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecramme",
  description:
    "Helps to track extreme weather events, analyze historical trends, and receive early warnings, supporting decision-making for climate resilience and disaster preparedness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/ecramme.jpg" />
      </head>
      <body className={inter.className}>
        <Sidebar isLightMode={true} />
        {children}
        </body>
    </html>
  );
}
