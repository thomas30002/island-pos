import React from 'react'
import Search from '../components/Search.jsx'
import { IconDotsVertical, IconPlus } from '@tabler/icons-react'

export default function ExpensesPage() {
  return (
    <div className='py-6'>
      <div className="px-8 pb-2 flex items-center justify-end gap-4 border-b border-ipos-grey-100">
        <button className='flex items-center gap-2 bg-ipos-blue hover:bg-indigo-700 transition text-white px-4 py-3 rounded-2xl'>
          <IconPlus />
          Add Expense
        </button>

        <Search />
      </div>

      <div className="w-full">
        <table className='w-full border-collapse'>
          <thead>
            <tr className='border-b border-b-ipos-grey-100'>
              <th className='py-3 pl-4 text-left'>#</th>
              <th className='py-3 text-left w-80'>Expense Name</th>
              <th className='py-3 text-left'>Amount</th>
              <th className='py-3 text-left'>Date</th>
              <th className='py-3 text-left'>Notes</th>
              <th className='py-3 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b border-b-ipos-grey-100'>
              <td className='py-3 pl-4'>1</td>
              <td className='py-3 w-80'>Stationary Purchase</td>
              <td className='py-3'>500₹</td>
              <td className='py-3'>31-12-2024</td>
              <td className="py-3"></td>
              <td className='py-3'>
                <button>
                  <IconDotsVertical />
                </button>
              </td>
            </tr>
            <tr className='border-b border-b-ipos-grey-100'>
              <td className='py-3 pl-4'>2</td>
              <td className='py-3 w-80'>Food</td>
              <td className='py-3'>3000₹</td>
              <td className='py-3'>31-12-2024</td>
              <td className="py-3"></td>
              <td className='py-3'>
                <button>
                  <IconDotsVertical />
                </button>
              </td>
            </tr>
            <tr className='border-b border-b-ipos-grey-100'>
              <td className='py-3 pl-4'>3</td>
              <td className='py-3 w-80'>Rent of the new office in Mumbai</td>
              <td className='py-3'>3000₹</td>
              <td className='py-3'>31-12-2024</td>
              <td className="py-3"></td>
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
