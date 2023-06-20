import React from 'react'

export default function SalesSummaryPage() {
  return (
    <div className='px-8 py-6 w-full'>
      <h3>Sales Summary</h3>

      <div className="flex gap-4 mt-6">
        <div>
          <label htmlFor="fromdate" className='block'>From Date</label>
          <input type="date" name="fromdate" id="fromdate" className='block w-60 outline-none text-ipos-grey bg-ipos-grey-50 px-4 py-3 rounded-2xl mt-2' />
        </div>

        <div>
          <label htmlFor="todate" className='block'>To Date</label>
          <input type="date" name="todate" id="todate" className='block w-60 outline-none text-ipos-grey bg-ipos-grey-50 px-4 py-3 rounded-2xl mt-2' />
        </div>
      </div>
    </div>
  )
}
