"use client";
import axios from "axios";
import logo from "@/assets/logo.jpg";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function VerifyEmailpage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex h-screen items-center justify-center flex-col   ">
      <section className="max-w-2xl mx-auto bg-white border border-blue-800 rounded-lg">
        <header className="py-3 flex justify-center w-full">
          <Image src={logo} alt="logo" className="rounded-full w-32 h-32" />
        </header>
        <div className="w-full h-[2px] bg-[#365CCE]"></div>
        <div className="text-center mt-10 flex flex-col gap-3">
          <h1 className="text-3xl font-semibold">
            Thanks for {""}
            <span className="relative">
              Signing up!
              <div className="h-[3px] w-20 bg-[#365CCE] absolute left-1 -bottom-2"></div>
            </span>
          </h1>
        </div>
        <main className="mt-8 px-5 sm:px-10">
          <h3>
            Hey <span className="font-bold">User</span>, We&apos;re glad you are
            here!
          </h3>
          <br />
          <h2>
            Welcome to <span className="font-bold">MVPBytes</span>! You’re now
            part of an exciting community dedicated to all things tech. Here at
            MVPBytes, we bring you the latest updates, insightful articles, and
            expert tips on technology and software development. Whether you’re a
            seasoned developer or just starting out, we have something for
            everyone.
          </h2>
          <p>
            <span className="font-bold">
              We've successfully validated your email.
            </span>{" "}
            Explore our blog, stay informed, and feel free to reach out to our
            team if you have any questions or need assistance. We’re thrilled to
            have you with us!
          </p>

          {/* <p>{token}</p> */}
          <Link href="/">
            <button className="px-6 py-2 mt-6 text-sm font-bold tracking-wider text-white capitalize transition-colors duration-300 transform bg-orange-600 rounded-lg hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-80">
              Go to Login
            </button>
          </Link>
          <p className="mt-8 text-gray-600">
            Thank you, <br />
            MVP Bytes
          </p>
        </main>
        {/* <p className="text-gray-500  px-5 sm:px-10 mt-8">
          This email was sent from{" "}
          <a
            href="mailto:sales@infynno.com"
            className="text-[#365CCE] hover:underline"
            alt="sales@infynno.com"
            target="_blank">
            sales@infynno.com
          </a>
          . If you&apos;d rather not receive this kind of email, you can{" "}
          <a href="#" className="text-[#365CCE] hover:underline">
            unsubscribe
          </a>{" "}
          or{" "}
          <a href="#" className="text-[#365CCE] hover:underline">
            manage your email preferences
          </a>
          .
        </p> */}
      </section>
    </div>
  );
}
