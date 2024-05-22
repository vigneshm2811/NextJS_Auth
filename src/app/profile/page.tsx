"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const router = useRouter();
  const [data, setData] = useState("");
  useEffect(() => {
    getUserDetails();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data.username);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <>
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

      <div className="h-screen items-center justify-center flex flex-col">
        <div className="group before:hover:scale-95 before:hover:h-72 before:hover:w-96 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-96 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-orange-200 to-orange-700 before:absolute before:top-0 w-80 h-72 relative bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
          <div className="w-28 h-28 bg-blue-700 mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24 group-hover:-translate-y-20 transition-all duration-500"></div>
          <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
            <span className="text-2xl font-semibold">
              {data === "" ? (
                "Unknown User"
              ) : (
                <Link href={`/profile/${data}`}>{data}</Link>
              )}
            </span>
            <p>Support Specialist</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={logout}
              className="bg-blue-700 px-4 py-1 text-slate-50 rounded-md z-10  transition-all duration-500 hover:bg-blue-500">
              Log out
            </button>
            <button className="bg-blue-700 px-4 py-1 text-slate-50 rounded-md z-10  transition-all duration-500 hover:bg-blue-500">
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
