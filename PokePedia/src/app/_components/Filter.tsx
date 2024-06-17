import React, { useEffect, useState } from 'react';
import { FunnelIcon as FunnelIconOutline } from '@heroicons/react/24/outline';
import { FunnelIcon as FunnelIconSolid } from '@heroicons/react/24/solid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface FilterProps {
  selectedTypes: string[];
  setResults: (filteredTypes: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ selectedTypes, setResults }) => {
  const [types, setTypes] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [localSelectedTypes, setLocalSelectedTypes] = useState<string[]>(selectedTypes);

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

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

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    let updatedSelectedTypes = [...localSelectedTypes];

    if (checked) {
      updatedSelectedTypes.push(value);
    } else {
      updatedSelectedTypes = updatedSelectedTypes.filter(type => type !== value);
    }

    setLocalSelectedTypes(updatedSelectedTypes);
  };

  const applyFilter = () => {
    const params = new URLSearchParams(searchParams);
    const query = localSelectedTypes.join(',');
    params.set('type', query);

    replace(`${pathname}?${params.toString()}`);

    setResults(localSelectedTypes);

    setOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex justify-center items-center bg-zinc-100 border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-3">
        <label htmlFor="type" className="block text-lg text-gray-900">
          <button onClick={() => setOpen(!open)} className="text-zinc-700 p-2 rounded-lg">
            {open ? (
              <FunnelIconSolid className="h-6 w-6" />
            ) : (
              <FunnelIconOutline className="h-6 w-6" />
            )}
          </button>
        </label>
      </div>

      {open && (
        <div className="absolute z-10 top-10 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-64">
          <label htmlFor="type" className="block text-gray-700 font-semibold mb-2">
            Filter by Type
          </label>
          <ul className="overflow-y-scroll h-80">
            {types.map((type: any) => (
              <li key={type.name} className="mb-2">
                <label className="flex items-center space-x-2 text-zinc-800">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-500"
                    value={type.name}
                    checked={localSelectedTypes.includes(type.name)}
                    onChange={handleTypeChange}
                  />
                  <span>{type.name}</span>
                </label>
              </li>
            ))}
          </ul>
          <button
            onClick={applyFilter}
            className="mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out w-full"
          >
            Apply Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;