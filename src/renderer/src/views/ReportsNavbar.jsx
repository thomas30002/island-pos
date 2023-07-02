import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const navbarItems = [
  {
    path: "/reports/sales-summary",
    text: "Sales Summary",
  },
  {
    path: "/reports/sales-item",
    text: "Sales by item",
  },
  // {
  //   path: "/reports/sales-category",
  //   text: "Sales Category",
  // },
  {
    path: "/reports/sales-payment-type",
    text: "Sales by Payment type",
  },
  {
    path: "/reports/sales-customers",
    text: "Sales by Customers",
  },
  {
    path: "/reports/receipts",
    text: "Receipts",
  },
  {
    path: "/reports/discounts",
    text: "Discounts",
  },
  // {
  //   path: "/reports/taxes",
  //   text: "Taxes",
  // },
];

export default function ReportsNavbar() {

  const {pathname} = useLocation();

  return (
    <div className='h-screen w-72 px-8 py-8 bg-white border-r border-r-ipos-grey-100 overflow-y-scroll'>

      <div className="mt-16 flex flex-col gap-4">
      {
        navbarItems.map(item =>
          <Link 
            to={item.path} 
            key={item.path} 
            className={
              item.path == pathname ? 
              'w-full flex rounded-2xl gap-4 px-6 py-4 bg-ipos-blue-50 text-ipos-blue transition hover:bg-ipos-logo-color hover:text-white outline-none':
              'w-full flex rounded-2xl gap-4 px-6 py-4 bg-white text-ipos-grey transition hover:bg-ipos-grey-50 outline-none'
            }
          >
            {item.text}
          </Link>
        )
      }

      </div>
    </div>
  )
}
