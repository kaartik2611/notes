import React, { useState } from "react";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function login(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })

    const data = await response.json()

    if (data.user) {
      localStorage.setItem('token', data.user)
      alert('Login successful')
      window.location.href = '/dashboard'
    } else {
      alert('Please check your username and password')
    }
  }


  return (
    <div>
      <p className="text-center text-3xl">Login Form</p>
      <form action="" onSubmit={login}>
        {/* <p className="text-center text-red-600 text-xl">{error}</p> */}
        <div className="mx-10 mt-12 flex flex-col space-y-5 border">
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
            className="mx-auto w-80 px-2 py-1 sm:text-xl text-base focus:outline-none rounded-md border border-black"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="mx-auto w-80 px-2 py-1 sm:text-xl text-base focus:outline-none rounded-md border border-black"
          />
          <button
            type="submit"
            className="mx-auto w-40 px-2 py-1 rounded-md border border-black hover:text-white hover:bg-gray-800 transition delay-75 "
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}