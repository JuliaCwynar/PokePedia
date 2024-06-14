import type { Metadata } from "next";
import React from "react";
import ReduxProvider from "../redux/provider";
import "../globals.css";
import Footer from "../_components/Footer";
import Header from "../_components/Header";


export const metadata: Metadata = {
  title: "PokePedia",
  description: "Encyclopedia of Pokémon",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)



{
  return (
    <html lang="en">
      <body className="latin flex flex-col min-h-screen">
        <ReduxProvider> 
        <Header />
        <div className="flex-grow max-w-screen-lg m-auto">
            {children}
        </div>
        <Footer />
        </ReduxProvider>
      </body>
     
    </html>
  );
}
