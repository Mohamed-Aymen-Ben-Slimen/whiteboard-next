import { setUserLocalStorage } from "@/common/lib/localStorage";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const Login: NextPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = () => {
    setError("");

    if (email.length === 0 || password.length === 0) {
      setError("Please fill up your email and password");
      return;
    }

    axios
      .post("/users", { email, password })
      .then((response) => {
        setUserLocalStorage(response.data);
        router.push(`/`);
      })
      .catch((err) => {
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
              "url(https://qph.cf2.quoracdn.net/main-qimg-078d10a347510e39eec4d66c54dc749e-lq)",
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
            <div className="flex flex-col items-center justify-center text-center">
              <img
                src="/logo1.png"
                className="mb-5 h-20 w-20"
                style={{
                  animation: "spin 5000ms linear infinite",
                }}
              />

              <h2 className="text-center text-4xl font-bold text-gray-700 dark:text-white">
                White Board
              </h2>

              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Sign in to access your account
              </p>
            </div>

            <div className="mt-8">
              <div>
                <div>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mt-6">
                  <p className="text-red-500">{error}</p>
                  <button
                    onClick={login}
                    className="w-full transform rounded-md bg-green-500 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-green-400 focus:bg-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50"
                  >
                    Sign in
                  </button>
                </div>
              </div>

              <p className="mt-6 text-center text-sm text-gray-400">
                Don&#x27;t have an account yet?{" "}
                <a
                  href="/register"
                  className="text-green-500 hover:underline focus:underline focus:outline-none"
                >
                  Sign up
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  {
    /*
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
	<div className="relative py-3 sm:max-w-xl sm:mx-auto">
		<div
			className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
		</div>
		<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
			<div className="max-w-md mx-auto">
				<div>
					<h1 className="text-2xl font-semibold">Login to your account</h1>
          <p>You don't have an account? <a href='/register' className='text-blue-500'>Create a new account</a></p>
				</div>
				<div className="divide-y divide-gray-200">
					<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
						<div className="relative">
							<input 
              id="email"
              name="email"
              type="text" 
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-gray-300" 
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
							<label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm pointer-events-none">Email Address</label>
						</div>
						<div className="relative">
							<input id="password"
               name="password"
                type="password"
                 className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" 
                 placeholder="Password" 
                 value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
							<label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm pointer-events-none">Password</label>
						</div>

            <p className='text-red-500'>{error}</p>

						<div className="relative">
							<button 
              className="bg-blue-500 text-white rounded-md px-2 py-1"
              onClick={login}
              >Login</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  </div> */
  }
};

export default Login;
