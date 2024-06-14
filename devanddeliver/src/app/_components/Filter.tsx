"use client"
import React, { useEffect, useState } from 'react';
import { FunnelIcon as FunnelIconOutline } from '@heroicons/react/24/outline';
import { FunnelIcon as FunnelIconSolid } from '@heroicons/react/24/solid';


export default function Filter() {
  const [types, setTypes] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const openFilter = () => {
    setOpen(!open);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/type`);
        if (!response.ok) {
          throw new Error('Failed to fetch types');
        }
        const data = await response.json();
        setTypes(data.results);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent justify-center items-center bg-zinc-100 px-3">
      <label htmlFor="type" className="block text-lg text-gray-900">
        <button onClick={openFilter} className="text-zinc-700 p-2 rounded-lg">
          {open ? <FunnelIconSolid className="h-6 w-6" /> : <FunnelIconOutline className="h-6 w-6" />}
        </button>
      </label>

      {open &&
        <ul className="absolute bg-zinc-100 p-4 rounded-lg mt-2 overflow-y-scroll h-80 w-64">
          {types.map((type: any) => (
            <li key={type.name} className="mb-2">
              <label className="flex items-center space-x-2 text-zinc-800">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500" />
                <span>{type.name}</span>
              </label>
            </li>
          ))}
          <button onClick={openFilter} className="m-auto text-blue-100 mt-2 p-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition duration-300 ease-in-out">
            Apply Filter
          </button>
        </ul>
      }
    </div>
  );
}