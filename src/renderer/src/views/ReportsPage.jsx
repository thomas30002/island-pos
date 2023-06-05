import React from 'react'
import { Outlet } from 'react-router-dom'
import ReportsNavbar from './ReportsNavbar'

export default function ReportsPage() {
  return (
    <div className='flex w-full'>
      <div>
        <ReportsNavbar />
      </div>
      <div className='w-full'>
        <Outlet />
      </div>
    </div>
  )
}
