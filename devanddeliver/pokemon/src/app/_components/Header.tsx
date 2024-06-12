import Link from "next/link"


export default function Header() {
    return(
        <header>
            <h1 className="bg-yellow-400 p-4 text-center border-b-2">
                PokePedia
            </h1>
            <div className="flex justify-between mx-96 my-9">
                <Link href="/">Home</Link>
                <Link href="/pokemons">Pokemons</Link>
                <Link href="">Types</Link>
                <Link href="/login">Login</Link>
            </div>
        </header>
    )
}