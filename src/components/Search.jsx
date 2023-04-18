import { IconCommand, IconSearch } from '@tabler/icons-react'
import React from 'react'

export default function Search() {
  return (
    <button className='hover:cursor-pointer no-drag w-60 fixed top-6 right-8 flex items-center justify-between gap-2 bg-ipos-grey-50 text-ipos-grey px-4 py-4 rounded-2xl'>
      <div className='flex items-center gap-2'>
        <IconSearch />
        <p>Search</p>
      </div>
      <div className='flex items-center'>
        <IconCommand />
        K
      </div>
    </button>
  )
}
