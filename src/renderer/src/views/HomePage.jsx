import React from 'react'
import Search from '../components/Search.jsx'
import { IconArrowDownLeft, IconArrowUpRight } from '@tabler/icons-react'

export default function HomePage() {
  return (
    <div className='px-8 py-6'>
      <div className='fixed right-8 top-6'>
        <Search />
      </div>
      <h1 className='text-3xl mt-20'>
        Welcome 👋
        <br />To Your Dashboard
      </h1>

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        {/* today sales */}
        <div className='border border-ipos-grey-100 rounded-2xl px-4 py-3'>
          <p className='text-sm'>Today Sales</p>

          <div className='flex mt-3 justify-between'>
            <p className='text-3xl font-bold'>₹10,500</p>
            <div className='flex flex-col items-end'>
              <div className='flex items-center text-sm font-bold gap-1'>
                <div className='w-7 h-7 flex items-center justify-center rounded-full bg-ipos-green-50 text-ipos-green'>
                  <IconArrowUpRight />
                </div>
                <p>12%</p>
              </div>
              <p className="text-xs">from  yesterday</p>
            </div>
          </div>
        </div>
        {/* today sales */}

        {/* this week sales */}
        <div className='border border-ipos-grey-100 rounded-2xl px-4 py-3'>
          <p className='text-sm'>This Week Sales</p>

          <div className='flex mt-3 justify-between'>
            <p className='text-3xl font-bold'>₹40,100</p>
            <div className='flex flex-col items-end'>
              <div className='flex items-center text-sm font-bold gap-1'>
                <div className='w-7 h-7 flex items-center justify-center rounded-full bg-ipos-red-50 text-ipos-red'>
                  <IconArrowDownLeft />
                </div>
                <p>2%</p>
              </div>
              <p className="text-xs">from  last week</p>
            </div>
          </div>
        </div>
        {/* this week sales */}

        {/* monthly sales */}
        <div className='border border-ipos-grey-100 rounded-2xl px-4 py-3'>
          <p className='text-sm'>Monthly Sales</p>

          <div className='flex mt-3 justify-between'>
            <p className='text-3xl font-bold'>₹1.5L</p>
            <div className='flex flex-col items-end'>
              <div className='flex items-center text-sm font-bold gap-1'>
                <div className='w-7 h-7 flex items-center justify-center rounded-full bg-ipos-green-50 text-ipos-green'>
                  <IconArrowUpRight />
                </div>
                <p>32%</p>
              </div>
              <p className="text-xs">from  last month</p>
            </div>
          </div>
        </div>
        {/* monthly sales */}

      </div>
    </div>
  )
}
