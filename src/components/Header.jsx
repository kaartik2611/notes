import React from 'react'

export const Header = () => {
  return (
    <div className="flex flex-row">
      <div>
        <p className="text-5xl m-2">Notion</p>
      </div>
      <div className="flex flex-grow space-x-6 justify-center">
        <p className="my-4 text-xl hover:text-gray-300 cursor-pointer">Blogs</p>
        <p className="my-4 text-xl hover:text-gray-300 cursor-pointer">TODOs</p>
        <p className="my-4 text-xl hover:text-gray-300 cursor-pointer">Notes</p>
      </div>
      <div>
        <a href="##">
          <button className="text-xl px-3 py-1 rounded-md border-2 m-3 hover:bg-white hover:text-black transition">Login</button>
        </a>
        <a href="##">
          <button className="text-xl px-3 py-1 rounded-md border-2 hover:bg-white hover:text-black transition">Sign Up</button>
        </a>
      </div>
    </div>
  )
}
