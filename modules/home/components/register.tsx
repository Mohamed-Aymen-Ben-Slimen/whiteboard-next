import { setUserLocalStorage } from "@/common/lib/localStorage";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const Register: NextPage = () => {
  const router = useRouter();

  const [error, setError] = useState("");

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
    birthDate: "",
  });

  const register = () => {
    setError("");

    if (
      user.firstName === "" ||
      user.lastName === "" ||
      user.email === "" ||
      user.password === "" ||
      user.verifyPassword === ""
    ) {
      setError("Please fill all fields");
      return;
    }

    if (user.password !== user.verifyPassword) {
      setError("Password is not verified");
      return;
    }

    axios
      .post("/register", { user })
      .then((response) => {
        setUserLocalStorage(response.data);
        router.push(`/`);
      })
      .catch((err) => {
        console.error(err);
        setError(err.response.data.error);
      });
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex h-screen justify-center">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1574556132185-5f4a6ffa80c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2hpdGUlMjBib2FyZHxlbnwwfHwwfHw%3D&w=1000&q=80)",
          }}
        >
          <div className="flex h-full items-center bg-gray-900 bg-opacity-40 px-20">
            <div>
              <h2 className="text-4xl font-bold text-white">White Board</h2>

              <p className="mt-3 max-w-xl text-gray-300">
                Collaborative White Board for creative teams.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-md items-center px-6 lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-center text-4xl font-bold text-gray-700 dark:text-white">
                White Board
              </h2>

              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Create a new account
              </p>
            </div>

            <div className="mt-8">
              <div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm text-gray-600 dark:text-gray-200"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="First Name"
                    id="First Name"
                    placeholder="First Name"
                    className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                    value={user.firstName}
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
                  />
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm text-gray-600 dark:text-gray-200"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="Last Name"
                    id="Last Name"
                    placeholder="Last Name"
                    className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                    value={user.lastName}
                    onChange={(e) =>
                      setUser({ ...user, lastName: e.target.value })
                    }
                  />
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm text-gray-600 dark:text-gray-200"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@example.com"
                    className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-600 dark:text-gray-200"
                    >
                      Password
                    </label>
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-600 dark:text-gray-200"
                    >
                      Verify Password
                    </label>
                  </div>

                  <input
                    type="password"
                    name="vpassword"
                    id="vpassword"
                    placeholder="Verify Password"
                    className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                    value={user.verifyPassword}
                    onChange={(e) =>
                      setUser({ ...user, verifyPassword: e.target.value })
                    }
                  />
                </div>

                <div className="mt-6">
                  <button
                    onClick={register}
                    className="w-full transform rounded-md bg-green-500 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-green-400 focus:bg-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50"
                  >
                    Register
                  </button>
                </div>
              </div>

              <p className="mt-6 text-center text-sm text-gray-400">
                Do you have an account?{" "}
                <a
                  href="/login"
                  className="text-green-500 hover:underline focus:underline focus:outline-none"
                >
                  Login
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
