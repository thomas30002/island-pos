import { IconPlus, IconTrash } from '@tabler/icons-react'
import React from 'react'

export default function PaymentType() {
  return (
    <div className='px-8 py-6'>
      <div className="w-full flex mt-4 justify-between items-center">
        <h3 className='mt-4'>Payment Type</h3>
        <button className='flex items-center gap-2 bg-ipos-blue hover:bg-indigo-700 transition text-white px-4 py-3 rounded-2xl'>
          <IconPlus />
          Add Payment Type
        </button>
      </div>

      <div className="mt-8 w-full flex flex-col divide-y gap-4">
        <div className="flex items-center justify-between">
          <p>1. Cash <span className="text-gray-400">- (Default)</span></p>
          <button className='text-red-500 hover:text-red-400'>
            <IconTrash />
          </button>
        </div>

        <div className="pt-3 flex items-center justify-between">
          <p>2. Card</p>
          <button className='text-red-500 hover:text-red-400'>
            <IconTrash />
          </button>
        </div>

        <div className="pt-3 flex items-center justify-between">
          <p>3. UPI</p>
          <button className='text-red-500 hover:text-red-400'>
            <IconTrash />
          </button>
        </div>

        <div className="pt-3 flex items-center justify-between">
          <p>4. Membership</p>
          <button className='text-red-500 hover:text-red-400'>
            <IconTrash />
          </button>
        </div>
      </div>
    </div>
  )
}
