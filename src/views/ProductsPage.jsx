import React from 'react'
import Search from '../components/Search.jsx'
import { IconDotsVertical, IconDownload, IconFileImport, IconPlus, IconQrcode } from '@tabler/icons-react'

export default function ProductsPage() {
  return (
    <div className='py-6'>
      <div className="px-8 pb-2 flex flex-wrap items-center justify-end gap-4 border-b border-ipos-grey-100">
        <button className='flex items-center gap-2 bg-ipos-blue hover:bg-indigo-700 transition text-white px-4 py-3 rounded-2xl'>
          <IconPlus />
          Add Product
        </button>

        <button className='flex items-center gap-2 bg-ipos-grey-50 hover:bg-ipos-grey-100 transition text-ipos-grey px-4 py-3 rounded-2xl'>
          <IconQrcode />
          Print QR
        </button>

        <button className='flex items-center gap-2 bg-ipos-grey-50 hover:bg-ipos-grey-100 transition text-ipos-grey px-4 py-3 rounded-2xl'>
          <IconFileImport />
          Import
        </button>

        <button className='flex items-center gap-2 bg-ipos-grey-50 hover:bg-ipos-grey-100 transition text-ipos-grey px-4 py-3 rounded-2xl'>
          <IconDownload />
          Export
        </button>

        <Search />
      </div>

      <div className="w-full">
        <table className='w-full border-collapse overflow-x-scroll'>
          <thead>
            <tr className='border-b border-b-ipos-grey-100'>
              <th className='py-3 font-normal pl-4 text-left'>#</th>
              <th className='py-3 font-normal text-left'>Image</th>
              <th className='py-3 font-normal text-left'>Product Name</th>
              <th className='py-3 font-normal text-left'>Price</th>
              <th className='py-3 font-normal text-left'>Cost</th>
              <th className='py-3 font-normal text-left'>Category</th>
              <th className='py-3 font-normal text-left'>SKU</th>
              <th className='py-3 font-normal text-left'>Barcode</th>
              <th className='py-3 font-normal text-left'>Sold by (Weight/Each)</th>
              <th className='py-3 font-normal text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b border-b-ipos-grey-100'>
              <td className='py-3 pl-4'>1</td>
              <td className='py-3'>
                <img src="" alt="product img" className='w-16 h-16 rounded-2xl object-cover' />
              </td>
              <td className='py-3'>Whey Biscuits 100gm</td>
              <td className='py-3'>Rs. 5</td>
              <td className="py-3">Rs. 4</td>
              <td className="py-3">Grocery</td>
              <td className="py-3">SK1234</td>
              <td className="py-3">1234</td>
              <td className="py-3">Each</td>
              <td className='py-3'>
                <button>
                  <IconDotsVertical />
                </button>
              </td>
            </tr>
            <tr className='border-b border-b-ipos-grey-100'>
            <td className='py-3 pl-4'>1</td>
              <td className='py-3'>
                <img src="" alt="product img" className='w-16 h-16 rounded-2xl object-cover' />
              </td>
              <td className='py-3'>Whey Biscuits 100gm</td>
              <td className='py-3'>Rs. 5</td>
              <td className="py-3">Rs. 4</td>
              <td className="py-3">Grocery</td>
              <td className="py-3">SK1234</td>
              <td className="py-3">1234</td>
              <td className="py-3">Each</td>
              <td className='py-3'>
                <button>
                  <IconDotsVertical />
                </button>
              </td>
            </tr>
            <tr className='border-b border-b-ipos-grey-100'>
            <td className='py-3 pl-4'>1</td>
              <td className='py-3'>
                <img src="" alt="product img" className='w-16 h-16 rounded-2xl object-cover' />
              </td>
              <td className='py-3'>Whey Biscuits 100gm</td>
              <td className='py-3'>Rs. 5</td>
              <td className="py-3">Rs. 4</td>
              <td className="py-3">Grocery</td>
              <td className="py-3">SK1234</td>
              <td className="py-3">1234</td>
              <td className="py-3">Each</td>
              <td className='py-3'>
                <button>
                  <IconDotsVertical />
                </button>
              </td>
            </tr>
            
            
          </tbody>
        </table>

        {/* pagination */}
      <div className="gap-4 flex items-center justify-end px-4 py-2 border-b border-b-ipos-grey-100 bg-white ">
        <div className="flex gap-2">
          <button className='text-sm bg-ipos-grey-50 hover:bg-ipos-grey-100 rounded-2xl w-8 h-8'>1</button>
          <button className='text-sm bg-white hover:bg-ipos-grey-100 rounded-2xl w-8 h-8'>2</button>
          <button className='text-sm bg-white hover:bg-ipos-grey-100 rounded-2xl w-8 h-8'>3</button>
        </div>

        <p className='text-sm'>Showing 5 of 40</p>

        <select className='no-drag bg-ipos-grey-50 rounded-xl px-2 py-2 outline-ipos-blue'>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      {/* pagination */}
      </div>

      
    </div>
  )
}
