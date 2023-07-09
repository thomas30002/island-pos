import React, { useEffect, useState } from 'react'
import { IconArrowDownLeft, IconArrowUpRight } from '@tabler/icons-react'
import { CURRENCIES } from "../config/currencies.config.js";

export default function HomePage() {

  const [data, setData] = useState({
    today: 0, yesterday: 0, month: 0, lastMonth: 0, year: 0, lastYear: 0,
    todayUp: 0, monthUp: 0, yearUp: 0
  })

  useEffect(()=>{
    _getData();
  },[]);

  const _getData = async () => {
    try {
      const data = await window.api.getDashboardStats();

      const {today, yesterday, month, lastMonth, year, lastYear} = data;

      let todayUp = 0
      let monthUp = 0
      let yearUp = 0

      if(yesterday !== 0) {
        todayUp = Math.round(((today - yesterday) / yesterday) * 100)
      }
      if(lastMonth !== 0) {
        monthUp = Math.round(((month - lastMonth) / lastMonth) * 100)
      }
      if(lastYear !== 0) {
        yearUp = Math.round(((year - lastYear) / lastYear) * 100)
      }

      setData({
        ...data,
        today, yesterday, month, lastMonth, year, lastYear,
        todayUp, monthUp, yearUp
      })

    } catch (error) { 
      console.log(error);
    }
  };

  // get currency
  const currencyCode = window.api.getCurrency();
  const currencyFind =  CURRENCIES.find(c=>c.cc == currencyCode);
  const currencySymbol = currencyFind !== undefined ? currencyFind.symbol : '';
  // get currency


  return (
    <div className='px-8 py-6'>
      <div className='fixed right-8 top-6'>
        {/* <Search /> */}
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
            <p className='text-3xl font-bold'>{currencySymbol}{data.today}</p>
            <div className='flex flex-col items-end'>
              <div className='flex items-center text-sm font-bold gap-1'>
                <div className={
                  data.todayUp >= 0 ? 'w-7 h-7 flex items-center justify-center rounded-full bg-ipos-green-50 text-ipos-green':
                  'w-7 h-7 flex items-center justify-center rounded-full bg-ipos-red-50 text-ipos-red'
                }>
                  {data.todayUp >= 0 ? <IconArrowUpRight /> :  <IconArrowDownLeft /> }
                </div>
                <p>{data.todayUp}%</p>
              </div>
              <p className="text-xs">from yesterday</p>
            </div>
          </div>
        </div>
        {/* today sales */}

        {/* this week sales */}
        <div className='border border-ipos-grey-100 rounded-2xl px-4 py-3'>
          <p className='text-sm'>This Month Sales</p>

          <div className='flex mt-3 justify-between'>
            <p className='text-3xl font-bold'>{currencySymbol}{data.month}</p>
            <div className='flex flex-col items-end'>
              <div className='flex items-center text-sm font-bold gap-1'>
                <div className={
                  data.monthUp >= 0 ? 'w-7 h-7 flex items-center justify-center rounded-full bg-ipos-green-50 text-ipos-green':
                  'w-7 h-7 flex items-center justify-center rounded-full bg-ipos-red-50 text-ipos-red'
                }>
                  {data.monthUp >= 0 ? <IconArrowUpRight /> :  <IconArrowDownLeft /> }
                </div>
                <p>{data.monthUp}%</p>
              </div>
              <p className="text-xs">from last month</p>
            </div>
          </div>
        </div>
        {/* this week sales */}

        {/* monthly sales */}
        <div className='border border-ipos-grey-100 rounded-2xl px-4 py-3'>
          <p className='text-sm'>Yearly Sales</p>

          <div className='flex mt-3 justify-between'>
            <p className='text-3xl font-bold'>{currencySymbol}{data.year}</p>
            <div className='flex flex-col items-end'>
              <div className='flex items-center text-sm font-bold gap-1'>
                <div className={
                  data.yearUp >= 0 ? 'w-7 h-7 flex items-center justify-center rounded-full bg-ipos-green-50 text-ipos-green':
                  'w-7 h-7 flex items-center justify-center rounded-full bg-ipos-red-50 text-ipos-red'
                }>
                  {data.yearUp >= 0 ? <IconArrowUpRight /> :  <IconArrowDownLeft /> }
                </div>
                <p>{data.yearUp}%</p>
              </div>
              <p className="text-xs">from last year</p>
            </div>
          </div>
        </div>
        {/* monthly sales */}

      </div>
    </div>
  )
}
