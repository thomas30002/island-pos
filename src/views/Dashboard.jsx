import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'


export default function Dashboard() {
  return (
    <div className='w-full flex flex-row'>
      {/* navbar */}
      <Navbar/>
      {/* navbar */}

      <div>
        <Outlet/>
      </div>
    </div>
  )
}
