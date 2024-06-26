"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { fetchAllPokemonIds, fetchPokemonDetails } from '@/app/redux/features/pokemonSlice';
import PokemonTile from './_components/PokemonTile';
import SearchBar from '@/app/_components/SearchBar';
import Pagination from '../../../_components/Pagination';
import Filter from '@/app/_components/Filter';
import Sort from '@/app/_components/Sort';

interface PokemonData {
  id: number;
  name: string;
  image: string;
  type: string;
  hp: number;
}

const Pokemons = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const paginatedPokemons = useSelector((state: any) => state.pokemons.paginatedPokemons);
  const searchResults = useSelector((state: any) => state.pokemons.searchResults);

  useEffect(() => {
    dispatch(fetchAllPokemonIds());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPokemonDetails(currentPage, 21))
  }, [currentPage, dispatch, searchResults]);



  return (
    <div className="min-h-screen min-w-[1024px]">
      <div className="container mx-auto">
        <div className="my-5 rounded-lg px-5 bg-white m-auto flex flex-row justify-between items-center">
          <SearchBar/>
          <div className="flex flex-row gap-8 z-100">
            <Filter/>
            <Sort />
          </div>
        </div>
        <div className="p-10 flex flex-wrap justify-between bg-white shadow-md rounded-lg max-w-screen-lg">
          {paginatedPokemons.map((pokemonData: PokemonData) => (
            <PokemonTile key={pokemonData.id} pokemon={pokemonData} />
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default Pokemons;