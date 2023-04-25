import { IconPlus, IconTrash } from '@tabler/icons-react'
import React from 'react'

export default function Taxes() {
  return (
    <div className='px-8 py-6'>
      <div className="w-full flex mt-4 justify-between items-center">
        <h3 className='mt-4'>Taxes</h3>
        <button className='flex items-center gap-2 bg-ipos-blue hover:bg-indigo-700 transition text-white px-4 py-3 rounded-2xl'>
          <IconPlus />
          Add Tax
        </button>
      </div>

      <div className="mt-8 w-full">
        <table className='w-full'>
          <thead>
            <tr className='border-b'>
              <th className='text-left pb-2'>Name</th>
              <th className='text-right pb-2'>Tax Rate</th>
              <th className='text-right pb-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b'>
              <td className=' py-2'>GST 5%</td>
              <td className='text-right py-2'>5%</td>
              <td className='text-right py-2'>
                <button className='text-red-500 hover:text-red-400'>
                  <IconTrash />
                </button>
              </td>
            </tr>
            <tr>
              <td className=' py-2'>GST 15%</td>
              <td className='text-right py-2'>15%</td>
              <td className='text-right py-2'>
                <button className='text-red-500 hover:text-red-400'>
                  <IconTrash />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}
