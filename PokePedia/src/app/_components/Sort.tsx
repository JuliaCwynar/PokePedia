"use client"
import React, { useState } from 'react';
import { BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/react/24/outline';

const Sort = () => {
  const [selectedOption, setSelectedOption] = useState<string>('asc');
  const [open, setOpen] = useState<boolean>(false);

  const openFilter = () => {
    setOpen(!open);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const applyFilter = () => {
    console.log('Selected Option:', selectedOption);
    // You can implement further actions here when the filter is applied
    setOpen(false); // Close the filter dropdown
  };

  return (
    <div className="relative">
      <div className="flex justify-center items-center bg-zinc-100 border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-3">
        <label htmlFor="sort" className="block text-lg text-gray-900">
          <button onClick={openFilter} className="text-zinc-700 p-2 rounded-lg">
            {open ? <BarsArrowUpIcon className="h-6 w-6" /> : <BarsArrowDownIcon className="h-6 w-6" />}
          </button>
        </label>
      </div>

      {open && (
        <div className="absolute z-10 top-10 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-64">
          <label className="block text-gray-700 font-semibold mb-2">Sort Options</label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-zinc-800 cursor-pointer">
              <input
                type="radio"
                name="sortOption"
                value="asc"
                checked={selectedOption === 'asc'}
                onChange={handleOptionChange}
              />
              <span>Ascending HP order</span>
            </label>
            <label className="flex items-center space-x-2 text-zinc-800 cursor-pointer">
              <input
                type="radio"
                name="sortOption"
                value="desc"
                checked={selectedOption === 'desc'}
                onChange={handleOptionChange}
              />
              <span>Descending HP order</span>
            </label>
          </div>
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

export default Sort;