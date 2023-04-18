import React from 'react'
import logo from "../assets/logo.svg"

export default function Navbar() {
  return (
    <div className='h-screen w-72 px-8 py-8 border-r border-r-ipos-grey-100'>
      <img src={logo} alt="logo" className='w-40' />
      
    </div>
  )
}
