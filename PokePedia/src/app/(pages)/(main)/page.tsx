"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';


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
      <Link href="/pokemons">
        <div>
          <h1 className="text-3xl font-bold text-center">Welcome to PokePedia</h1>
          <p className="text-center">Click here to see the list of Pokemons</p>
        </div>
      </Link>
    </div>
  );
}
