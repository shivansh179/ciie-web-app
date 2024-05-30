// pages/login.js
import React, { useState } from 'react';
import { Checkbox } from "@nextui-org/checkbox";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../firebaseconfig'; // Import the auth instance
import Image from 'next/image';


const handleFirebaseLogin = (email, password) => {
  try {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Logged in successfully!");
        window.location.replace("./");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error('Check your credentials!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      });
  } catch (error) {
    toast.error("Error logging in!");
  }
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <ToastContainer />
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-yellow-400 shadow-lg transform -skew-y-15 sm:skew-y-0 sm:-rotate-15 sm:rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {/* <Image
                    src="/ciie_logo.png "
                    width={200}
                    height={200}
                    alt="Picture of the author"
              /> */}

              <h1>CIIE</h1>
              </h2>
            </div>
            <form className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-wrap">
                  <div className="w-full">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Personal Email
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email"
                        onChange={(value) => {
                          setEmail(value.target.value);
                        }}
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-200 bg-gray-100 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={(value) => {
                          setPassword(value.target.value);
                        }}
                        autoComplete="current-password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-200 bg-gray-100 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox defaultSelected color="primary">
                     <span className=' text-black/80'> Remember me </span>
                    </Checkbox>
                  </div>
                </div>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={(_value) => {
                      handleFirebaseLogin(email, password);
                    }}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Log in
                  </button>
                  
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
