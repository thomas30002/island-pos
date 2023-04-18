import React from 'react'
import SettingsNavbar from './SettingsNavbar.jsx'
import { Outlet } from 'react-router-dom'

export default function SettingsPage() {
  return (
    <div className='flex'>
      <SettingsNavbar />
      <Outlet />
    </div>
  )
}
