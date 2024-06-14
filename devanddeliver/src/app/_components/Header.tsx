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
    <header className="p-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link className="text-center text-3xl font-bold flex-grow text-sky-800 tracking-wider" href="/">
            <Image src={pokemonLogo} alt="Pokemon Logo" className="h-20 w-auto m-auto"/>
    
        </Link>
        
        <div className="flex justify-end">
        {isAuth &&
            <button
                onClick={onLogout}
                className="absolute bg-blue-500 text-white font-bold py-2 px-4 rounded-lg">
                Log out
                </button>
        }
        </div>
      </div>
    </header>
  );
}