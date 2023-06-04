import { IconCommand, IconSearch } from '@tabler/icons-react'
import React from 'react'

export default function Search({searchValue, setSearchValue}) {
  return (
    <div className='hover:cursor-pointer no-drag flex items-center justify-between gap-2 bg-ipos-grey-50 text-ipos-grey rounded-2xl px-4'>
      <div className='flex items-center gap-2'>
        <IconSearch />
        {/* <p>Search</p> */}
        <input type="text" placeholder='Search' className='bg-ipos-grey-50 text-ipos-grey py-4 outline-none' value={searchValue} onChange={e=>setSearchValue(e.target.value)} />
      </div>
      {/* <div className='flex items-center'>
        <IconCommand />
        K
      </div> */}
    </div>
  )
}
