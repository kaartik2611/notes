import React from 'react'

export const Header = () => {
  return (
    <div className="flex flex-row">
      <div>
        <p className="text-3xl m-2">Notion</p>
      </div>
      <div className="flex flex-grow space-x-6 justify-center">
        <p className="my-4">Blogs</p>
        <p className="my-4">TODOs</p>
        <p className="my-4">Notes</p>
      </div>
      <div>
        <a href="##">
          <button className="text-xl px-3 py-1 rounded-md border-2 border-black">Login</button>
        </a>
        <a href="##">
          <button className="text-xl px-3 py-1 rounded-md border-2 border-black">Sign Up</button>
        </a>
      </div>
    </div>
  )
}
