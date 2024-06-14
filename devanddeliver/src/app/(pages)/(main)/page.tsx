"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Pokemons from "./pokemons/page";


export default function Home() {

  const router = useRouter();
  const isAuth = localStorage.getItem('isAuth');

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  });

  return (
   
    <div>
      {/* <Navbar /> */}
      <Pokemons/>
    </div>
  );
}
