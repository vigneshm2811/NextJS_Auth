"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {};

const NewPassword: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confrimPassword: "",
  });
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const PassWordValidation = () => {
    if (passwords.newPassword != "" && passwords.confrimPassword != "") {
      if (passwords.newPassword === passwords.confrimPassword) {
        return true;
      }
    } else {
      return false;
    }
  };
  const onResetPassword = async () => {
    if (PassWordValidation()) {
      try {
        const password = passwords.newPassword;
        await axios.post("/api/users/newpassword", { token, password });
        router.push("/");
      } catch (error: any) {
        console.log(error.response.data);
      }
    } else {
      toast.error("password mismatch");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <Toaster />
      <section className=" dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  autoComplete=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={passwords.newPassword}
                  onChange={(e) =>
                    setPasswords({ ...passwords, newPassword: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  autoComplete=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={passwords.confrimPassword}
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      confrimPassword: e.target.value,
                    })
                  }
                />
              </div>

              <button
                onClick={onResetPassword}
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Reset password
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewPassword;
