"use client";
import { login } from "../../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/store";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);
  const router = useRouter();

  const onLogin = () => {
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (isAuth) {
      router.push("/");
    }
  }, [isAuth]);

  return (
    <div className="flex justify-center items-center pt-20">
      <div className="bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="mr-2">Username:</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="border border-gray-300 px-2 py-1 rounded-lg"
            />
          </div>
          <div>
            <label className="mr-2">Password:</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="border border-gray-300 px-2 py-1 rounded-lg"
            />
          </div>
          <button
            onClick={onLogin}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}