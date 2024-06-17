"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import {
  fetchPokemons,
  filterPokemons,
  setFilteredPokemonsByPage,
  sortPokemons,
  searchPokemons,
} from '@/app/redux/features/pokemonSlice';
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

export default function Pokemons() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const currentSearch = searchParams.get('query') || '';

  const [search, setSearch] = useState<string>(currentSearch);
  const [page, setPage] = useState<number>(currentPage);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('asc');

  const allPokemons = useSelector((state: any) => state.pokemons.allPokemons);
  const filteredPokemons = useSelector((state: any) => state.pokemons.filteredPokemons);
  const paginatedPokemons = useSelector((state: any) => state.pokemons.paginatedPokemons);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  useEffect(() => {
    dispatch(searchPokemons(search))
  }, [search, dispatch]);


  useEffect(() => {
    dispatch(filterPokemons(selectedTypes));
  }, [selectedTypes, dispatch]);

  useEffect(() => {
    dispatch(sortPokemons(sortOrder));
  }, [sortOrder, dispatch]);

  useEffect(() => {
    dispatch(setFilteredPokemonsByPage({ page, limit: 21 }));
  }, [page, dispatch]);

  useEffect(() => {
    setSearch(currentSearch);
    setPage(1); 
  }, [currentSearch]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <div className="my-5 rounded-lg px-5 bg-white m-auto flex flex-row justify-between items-center">
          <SearchBar setResults={setSearch} data="pokemon" />
          <div className="flex flex-row gap-8 z-100">
            <Filter selectedTypes={selectedTypes} setResults={setSelectedTypes} />
            <Sort setSortOrder={setSortOrder} />
          </div>
        </div>
        <div className="p-10 flex flex-wrap justify-between bg-white shadow-md rounded-lg max-w-screen-lg">
          {paginatedPokemons.map((pokemonData: PokemonData) => (
            <PokemonTile key={pokemonData.id} pokemon={pokemonData} />
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Pagination page={page} setPage={handlePageChange} />
        </div>
      </div>
    </div>
  );
}