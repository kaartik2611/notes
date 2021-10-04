import React, { useState } from "react";
import { useHistory } from 'react-router-dom'

export const Register = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("")
  const [password, setPassword] = useState("");
  const history = useHistory()

  const register = async e => {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
    const data = await response.json();

    console.log(data);
    setError(data.error)
    if (data.status === 'ok') {
      history.push('/login')
    }
  }


  return (
    <div>
      <p className="text-center text-5xl mt-10">Register Form</p>
      <form action="" onSubmit={register}>
        <p className="text-center text-red-600 text-xl pt-2">{error}</p>
        <div className="mx-10 mt-12 flex flex-col space-y-5 ">
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
            className="mx-auto w-80 px-2 py-1 sm:text-xl text-base focus:outline-none rounded-md border text-black"
            required />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="mx-auto w-80 px-2 py-1 sm:text-xl text-base focus:outline-none rounded-md border text-black"
            required />
          <button
            type="submit"
            className="mx-auto w-40 px-2 py-1 rounded-md border hover:bg-white hover:text-black transition delay-75 "
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
