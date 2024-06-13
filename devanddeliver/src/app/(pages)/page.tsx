"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
      <h1>Welcome to the PokePedia</h1>
      <p>
        This is a simple website that displays information about Pokemons.
      </p>
    </div>
  );
}
