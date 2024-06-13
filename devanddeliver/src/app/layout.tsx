import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import "./globals.css";
import ReduxProvider from "./redux/provider";



export const metadata: Metadata = {
  title: "PokePedia",
  description: "Encyclopedia of Pokémon",
};

export default function RootLayout({
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
          
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </ReduxProvider>
      </body>
     
    </html>
  );
}
