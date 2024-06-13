"use client";
import { useDebugValue, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../redux/store";

export default function Home() {

  const router = useRouter();
  const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  });

  return (
    <>
    {isAuth &&
    <div>
      <h1>Welcome to the PokePedia</h1>
      <p>
        This is a simple website that displays information about Pokemons.
      </p>
    </div>}
    </>
  );
}
