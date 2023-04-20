import { IconBox, IconDatabaseExport, IconDatabaseImport, IconVolume } from '@tabler/icons-react'
import React from 'react'

export default function Features() {
  return (
    <div className='px-8 py-6 w-full'>
      <h3 className='mt-4'>Features</h3>

      <div className='bg-ipos-grey-50 rounded-2xl px-8 py-8 mt-8 w-full flex flex-col gap-4 divide-y '>
        
        {/* pos tap sound */}
        <div className='flex gap-4 justify-between items-center'>
          <div className='flex gap-4'>
            <div>
              <IconVolume />
            </div>
            <div>
              <p>POS Tap Sound</p>
              <p className='text-ipos-grey mt-2'>
                Turn on this features, if you want some feedback of Tap when pressing an Item in POS.
              </p>
            </div>
          </div>
          <div>
            <label class="relative inline-flex items-center cursor-pointer no-drag">
              <input type="checkbox" value="" class="sr-only peer" />
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-indigo-300 rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-ipos-blue"></div>
            </label>
          </div>
        </div>
        {/* pos tap sound */}

        {/* dining options */}
        <div className='flex gap-4 justify-between items-center pt-4'>
          <div className='flex gap-4'>
            <div>
              <IconBox />
            </div>
            <div>
              <p>Dining options</p>
              <p className='text-ipos-grey mt-2'>
                Mark orders as dine in, takeout or for delivery.
                by default generated receipts are marked as the in-store purchase.
              </p>
            </div>
          </div>
          <div>
            <label class="relative inline-flex items-center cursor-pointer no-drag">
              <input type="checkbox" value="" class="sr-only peer" />
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-indigo-300 rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-ipos-blue"></div>
            </label>
          </div>
        </div>
        {/* dining options */}

        {/* backup */}
        <div className='flex gap-4 justify-between items-center pt-4'>
          <div className='flex gap-4'>
            <div>
              <IconDatabaseExport />
            </div>
            <div>
              <p>Backup Data</p>
              <p className='text-ipos-grey mt-2'>
                You should take backup of your Store Data periodically. since this can help you to recover data in future, or if you upgrade your device you can get same data on your new device.
              </p>
            </div>
          </div>
          <div>
            <button className='bg-ipos-logo-color hover:bg-ipos-blue transition text-white rounded-2xl px-4 py-3'>
              Backup
            </button>
          </div>
        </div>
        {/* backup */}

        {/* restore */}
        <div className='flex gap-4 justify-between items-center pt-4'>
          <div className='flex gap-4'>
            <div>
              <IconDatabaseImport />
            </div>
            <div>
              <p>Restore Data</p>
              <p className='text-ipos-grey mt-2'>
                Select your backup file and all of your data will be available to you like your previous setup.
              </p>
            </div>
          </div>
          <div>
            <button className='bg-ipos-logo-color hover:bg-ipos-blue transition text-white rounded-2xl px-4 py-3'>
              Restore
            </button>
          </div>
        </div>
        {/* backup */}

      </div>
    </div>
  )
}
