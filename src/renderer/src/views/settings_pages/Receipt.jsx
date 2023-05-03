import { IconInfoSquareRounded, IconPencil, IconPhoto, IconUser } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'

export default function Receipt() {

  const [state, setState] = useState({header: '', footer: '', showCustomerInfo: false, showComments: false, logo: ''});    
  useEffect(()=>{

  },[]);

  const btnEditLogo = async () => {

  };


  return (
    <div className='px-8 py-6'>

      <div className=' w-full flex flex-col items-center justify-center mt-8'>
        <div className='relative w-32 h-32 bg-ipos-grey-50 rounded-full flex items-center justify-center'>
          <IconPhoto className='text-ipos-grey' />
          <button onClick={btnEditLogo} className="transition bg-white hover:bg-ipos-grey-100 shadow-lg rounded-full absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 ">
            <IconPencil />
          </button>
        </div>
        <p className='mt-4'>Logo</p>
      </div>


      <div className="w-full mt-6 no-drag">
        <label htmlFor="receiptHeader" className='block w-full'>Header</label>
        <textarea className='outline-none w-full h-28 mt-2 bg-ipos-grey-50 placeholder::text-ipos-grey px-4 py-3 rounded-2xl' name="receiptHeader" id="receiptHeader" placeholder='Enter Header Text to include in receipt'></textarea>
      </div>

      <div className="w-full mt-2 no-drag">
        <label htmlFor="receiptFooter" className='block w-full'>Footer</label>
        <textarea className='outline-none w-full h-28 mt-2 bg-ipos-grey-50 placeholder::text-ipos-grey px-4 py-3 rounded-2xl' name="receiptFooter" id="receiptFooter" placeholder='Enter Footer Text to include in receipt'></textarea>
      </div>

      <div className='mt-4 w-full flex items-center justify-between bg-ipos-grey-50 rounded-2xl px-6 py-4'>
        <div className="flex items-center gap-4">
          <IconUser />
          <p>Show Customer info</p>
        </div>
        <div>
          <label className="relative inline-flex items-center cursor-pointer no-drag">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
          </label>
        </div>
      </div>

      <div className='mt-4 w-full flex items-center justify-between bg-ipos-grey-50 rounded-2xl px-6 py-4'>
        <div className="flex items-center gap-4">
          <IconInfoSquareRounded />
          <p>Show Comments</p>
        </div>
        <div>
          <label className="relative inline-flex items-center cursor-pointer no-drag">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
          </label>
        </div>
      </div>
    </div>
  )
}
