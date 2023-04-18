import { IconCommand, IconSearch } from '@tabler/icons-react'
import React from 'react'

export default function Search() {
  return (
    <div className='w-60 fixed top-6 right-8 flex items-center gap-2 bg-ipos-grey-50 text-ipos-grey px-4 py-4 rounded-2xl'>
        <IconSearch />
        <p className='flex-1'>Search</p>
        <div className='flex items-center'>
            <IconCommand />
            K
        </div>
    </div>
  )
}
