import React from 'react'
import Search from '../components/Search.jsx'

export default function HomePage() {
  return (
    <div>
      <Search />
      <h1 className='text-xl'>
        Welcome 👋
        <br />To Your Dashboard
      </h1>
    </div>
  )
}
