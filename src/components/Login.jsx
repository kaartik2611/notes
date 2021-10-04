import React, { useState } from "react";
import { useHistory } from 'react-router-dom'


export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const history = useHistory()
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
    console.log(data);
    // data.status   data.error
    // data.data is jwt token
    // data.user_id is user id-mongo db
    if (data.status === "ok") {
      localStorage.setItem("token", data.data)
      localStorage.setItem("user",data.user)
      history.push('/todo')
    }
    if (data.status === "error") {
      setError(data.error)
    }
  }


  return (
    <div>
      <p className="text-center text-3xl">Login Form</p>
      <form action="" onSubmit={login}>
        <p className="text-center text-red-600 text-xl">{error}</p>
        <div className="mx-10 mt-12 flex flex-col space-y-5">
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
            className="text-black mx-auto w-80 px-2 py-1 sm:text-xl text-base focus:outline-none rounded-md border border-black"
            required />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="text-black mx-auto w-80 px-2 py-1 sm:text-xl text-base focus:outline-none rounded-md border border-black"
            required />
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