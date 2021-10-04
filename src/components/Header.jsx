import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom"

export const Header = () => {
  const [user,] = useState(localStorage.getItem("user"))
  const history = useHistory()

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    history.push('/login')
  }
  return (
    <div className="flex flex-row">
      <div>
        <p className="text-5xl m-2">Notion</p>
      </div>
      <div className="flex flex-grow space-x-6 justify-center">
        <Link to="/blogs" className="my-4 text-xl hover:text-gray-300 cursor-pointer">Blogs</Link>
        <Link to="/todo" className="my-4 text-xl hover:text-gray-300 cursor-pointer">TODOs</Link>
        <Link to="/notes" className="my-4 text-xl hover:text-gray-300 cursor-pointer">Notes</Link>
      </div>
      {!user ? <div>
        <Link to="/login">
          <button className="text-xl px-3 py-1 rounded-md border-2 m-3 hover:bg-white hover:text-black transition">Login</button>
        </Link>
        <Link to="/register">
          <button className="text-xl px-3 py-1 rounded-md border-2 hover:bg-white hover:text-black transition">Sign Up</button>
        </Link>
      </div> : <div>
        Hello {user}
        <Link to="/#">
          <button className="text-xl px-3 py-1 rounded-md border-2 m-3 hover:bg-white hover:text-black transition" onClick={logOut}>LogOut</button>
        </Link>
      </div>
      }
    </div>
  )
}
