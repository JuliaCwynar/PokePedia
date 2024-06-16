import React from 'react';

export default function Register() {
    return (
      <div className="flex justify-center items-center text-center pt-20">
        <div className="bg-white p-8 shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Register</h1>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <label className="mr-2">Username:</label>
              <input type="text" className="border border-gray-300 px-2 py-1 rounded-lg" />
            </div>
            <div className="flex items-center">
              <label className="mr-2">Password:</label>
              <input type="password" className="border border-gray-300 px-2 py-1 rounded-lg" />
            </div>
            <div className="flex items-center">
              <label className="mr-2">Confirm password:</label>
              <input type="password" className="border border-gray-300 px-2 py-1 rounded-lg" />
            </div>
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg">
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }