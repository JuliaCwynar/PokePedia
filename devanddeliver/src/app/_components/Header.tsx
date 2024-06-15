"use client";
import React from "react";
import Link from 'next/link';
import {logout} from '../redux/features/authSlice';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/navigation';
import pokemonLogo from '../assets/pokemonlogo.png';
import Image from 'next/image';
import {useAppSelector} from '../redux/store';
import { useEffect } from 'react';
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Header() {

const dispatch = useDispatch();
const router = useRouter();
const isAuth = localStorage.getItem('isAuth');

const onLogout = () => {
    dispatch(logout());
    console.log(isAuth);
    window.location.reload();
}

useEffect (() => {
    if (!isAuth) {
        router.push("/login");
    }
}, [isAuth, router]);

  return (
    <header>
      <div className="flex items-center justify-between max-w-screen-lg m-auto my-9">
        <Link className="text-center text-3xl font-bold flex-grow text-sky-800 tracking-wider" href="/pokemons">
            <Image src={pokemonLogo} alt="Pokemon Logo" className="h-20 w-auto m-auto"/>
        </Link>
        
        <div className="flex justify-end">
        {isAuth &&
            <button
                onClick={onLogout}
                className="absolute bg-blue-500 text-white font-bold py-2 px-4 rounded-lg">
                  <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
                </button>
        }
        </div>
      </div>
    </header>
  );
}