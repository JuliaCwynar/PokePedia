"use client";
import React from "react";
import { login } from "../../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/store";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isAuth = localStorage.getItem('isAuth');
  const router = useRouter();

  const onLogin = () => {
    dispatch(login({ token:'XYZ', username }));
    window.location.reload();
  };

  const onRegister = () => { 
    router.push("/register");
  }

  useEffect(() => {
    if (isAuth) {
      router.push("/");
    }
  }, [isAuth]);

  return (
<div className="flex justify-center items-center pt-20">
      <div className="bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-2xl font-medium mb-10 text-center">Log in</h1>
        <form className="flex flex-col space-y-4">
          <div className="flex items-center">
            <label className="mr-2 flex-shrink-0 w-20">Username:</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="flex-1 border border-gray-300 px-2 py-1 rounded-lg"
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2 flex-shrink-0 w-20">Password:</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="flex-1 border border-gray-300 px-2 py-1 rounded-lg"
            />
          </div>
          <button
            onClick={onLogin}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}