import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'


export default function Dashboard() {
  return (
    <div className='w-full flex flex-row'>
      {/* navbar */}
      <div>
        <Navbar/>
      </div>
      {/* navbar */}

      <div className='w-full'>
        <Outlet/>
      </div>
    </div>
  )
}
