import React, { useState } from 'react'
import { Link } from "react-router-dom"

export const Home = () => {
  const [user,] = useState(localStorage.getItem("user"))
  return (
    <div>
      <p className="text-center text-3xl mb-12">DashBoard</p>

      <div className="flex flex-col">

        <div className="flex flex-row justify-center">
          <p className="text-2xl my-3 ">Add Your Todos here : </p>
          <Link to="/todo" className="my-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        <div className="flex flex-row justify-center">
          <p className="text-2xl my-3 ">Add Your Notes here : </p>
          <Link to="/notes" className="my-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        <div className="flex flex-row justify-center">
          <p className="text-2xl my-3 ">Add Your Blogs here : </p>
          <Link to="/blogs" className="my-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>

      <div>
        {!user ? <p className="text-center text-4xl my-5 mb-10">Not a user,Sign Up!</p> : ""}
        {!user ? <div className="flex justify-center">
          <Link to="/login">
            <button className="text-xl px-3 py-1 rounded-md border-2 m-3 hover:bg-white hover:text-black transition">Login</button>
          </Link>
          <Link to="/register">
            <button className="text-xl px-3 py-1 rounded-md border-2 m-3 hover:bg-white hover:text-black transition">Sign Up</button>
          </Link>
        </div> : ""}
      </div>
      <div className="">
      </div>
    </div>
  )
}
