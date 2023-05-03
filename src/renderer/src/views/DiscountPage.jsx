import React from 'react'
import Search from '../components/Search.jsx'
import { IconDotsVertical, IconPlus } from '@tabler/icons-react'

export default function DiscountPage() {
  return (
    <div className='py-6'>
      <div className="px-8 pb-2 flex items-center justify-end gap-4 border-b border-ipos-grey-100">
        <button className='flex items-center gap-2 bg-ipos-blue hover:bg-indigo-700 transition text-white px-4 py-3 rounded-2xl'>
          <IconPlus />
          Add Discount
        </button>

        <Search />
      </div>

      <div className="w-full">
        <table className='w-full border-collapse'>
          <thead>
            <tr className='border-b border-b-ipos-grey-100'>
              <th className='py-3 pl-4 text-left'>#</th>
              <th className='py-3 text-left'>Discount Name</th>
              <th className='py-3 text-left'>Value</th>
              <th className='py-3 text-left'>Type</th>
              <th className='py-3 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b border-b-ipos-grey-100'>
              <td className='py-3 pl-4'>1</td>
              <td className='py-3'>500RS</td>
              <td className='py-3'>500₹</td>
              <td className='py-3'>Amount</td>
              <td className='py-3'>
                <button>
                  <IconDotsVertical />
                </button>
              </td>
            </tr>
            <tr className='border-b border-b-ipos-grey-100'>
              <td className='py-3 pl-4'>2</td>
              <td className='py-3'>DISC50</td>
              <td className='py-3'>50%</td>
              <td className='py-3'>Percentage</td>
              <td className='py-3'>
                <button>
                  <IconDotsVertical />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
