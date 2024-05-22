"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const validation = () => {
    if (user.email.length > 0 && user.password.length > 0) {
      // Corrected email regex pattern
      const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (pattern.test(user.email)) {
        // Email is valid
        return true;
      } else {
        // Email is invalid
        toast.error("Invalid email address");
        return false;
      }
    } else {
      toast.error("All fields are required");
      return false;
    }
  };
  const onLogin = async () => {
    if (validation()) {
      try {
        const response = await axios.post("/api/users/login", user);
        console.log("login success", response.data);
        toast.success("Welcome Back 👋👋");

        router.push("/profile");
      } catch (error: any) {
        toast.error(error.response.data.error);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <Toaster
        toastOptions={{
          error: {
            style: {
              background: "#ef4444",
              color: "white",
            },
          },
        }}
      />
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Log in</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    type="text"
                    className="peer text-sm placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email address"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                    Email Address
                  </label>
                </div>

                <div className="relative">
                  <input
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    id="password"
                    name="password"
                    type="password"
                    className="peer  placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                    autoComplete=""
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                    Password
                  </label>
                </div>
                <div className="relative flex justify-between items-center">
                  <button
                    onClick={onLogin}
                    className="bg-blue-500 text-white rounded-md px-2 py-1">
                    Log in
                  </button>
                  <Link
                    href="/forgotpassword"
                    className="text-sm text-blue-600">
                    Forgot password?
                  </Link>
                </div>
                <p className="text-sm ">
                  If your new user?{" "}
                  <Link href="/signup" className="text-blue-500 font-bold">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
