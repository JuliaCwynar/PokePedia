import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PokePedia",
  description: "Encyclopedia of Pokémon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
     
    </html>
  );
}
