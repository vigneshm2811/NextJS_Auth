"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const validation = () => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (pattern.test(user.email)) {
        return true;
      } else {
        toast.error("Invalid email address");
        return false;
      }
    } else {
      toast.error("All fields are required");
      return false;
    }
  };

  const onSignup = async () => {
    if (validation()) {
      const signupPromise = axios.post("/api/users/signup", user);
      toast.promise(signupPromise, {
        loading: "Signing up...",
        success: "Signup successful! ",
        error: "Signup failed. Please try again.",
      });

      try {
        const response = await signupPromise;
        // console.log("Signup success", response.data);
        router.push("/login");
      } catch (error: any) {
        console.log("Signup failed", error.response.data.error);
        // Note: Error toast is already shown by toast.promise, so no need to show it again here.
      }
    }
  };

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: "#1b1b1d",
            color: "white",
          },
        }}
      />
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Sign Up</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      value={user.username}
                      onChange={(e) =>
                        setUser({ ...user, username: e.target.value })
                      }
                      name="username"
                      id="username"
                      type="text"
                      className="peer text-sm placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="username"
                    />
                    <label
                      htmlFor="username"
                      className="absolute left-0 -top-3.5 text-blue-700 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-blue-700 peer-focus:text-sm">
                      Username
                    </label>
                  </div>
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
                      className="absolute left-0 -top-3.5 text-blue-700 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-blue-700 peer-focus:text-sm">
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
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                      autoComplete=""
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-blue-700 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-blue-700 peer-focus:text-sm">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      onClick={onSignup}
                      className="bg-blue-500 text-white rounded-md px-2 py-1">
                      Sign up
                    </button>
                  </div>
                  <p className="text-sm">
                    Already a user{" "}
                    <Link href="/login" className="text-blue-500 font-bold">
                      Log in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
