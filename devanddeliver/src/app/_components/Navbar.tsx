import React from 'react';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-yellow-500 text-white py-4">
            <div className="container mx-auto flex justify-between">
                <Link href="/pokemons">Pokemons</Link>
                <Link href="/locations">Locations</Link>
                <Link href="Evolution">Evolutions</Link>
            </div>
        </nav>
    )
}