"use client"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import pokemon from "../../assets/pokemon-group.png";

const Home = () => {
  const router = useRouter();
  const isAuth = localStorage.getItem("isAuth");

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [isAuth, router]);

  return (
    <div className="p-10 flex flex-col justify-center items-center bg-gray-100 rounded-lg min-w-[860px] mt-20">
        <div className="flex flex-col items-center space-y-4">
            <Image src={pokemon} layout="contain" objectFit="cover" alt="Pokemons" />
          <h1 className="text-3xl font-bold text-center">Welcome to PokePedia</h1>
          <p className="text-center mb-4">
            Explore the world of Pokemons, their types, abilities, and more!
          </p>
          <Link href="/pokemons">
            <p className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
              View List of Pokemons
            </p>
          </Link>
        </div>
      </div>
  );
};

export default Home;