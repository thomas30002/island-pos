import React from 'react'
import Search from '../components/Search.jsx'

export default function HomePage() {
  return (
    <div>
      <div className='fixed right-8 top-6'>
        <Search />
      </div>
      <h1 className='text-3xl mt-20'>
        Welcome 👋
        <br />To Your Dashboard
      </h1>
    </div>
  )
}
