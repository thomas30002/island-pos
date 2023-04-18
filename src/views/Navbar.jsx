import React from 'react'
import logo from "../assets/logo.svg"
import { IconCash, IconChartAreaLine, IconDeviceIpadHorizontal, IconDiscount2, IconLayoutDashboard, IconPackage, IconSettings2, IconUsers } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';

const navbarItems = [
  {
    path: "/",
    text: "Dashboard",
    icon: <IconLayoutDashboard />
  },
  {
    path: "/pos",
    text: "POS",
    icon: <IconDeviceIpadHorizontal />
  },
  {
    path: "/products",
    text: "Products",
    icon: <IconPackage />
  },
  {
    path: "/customers",
    text: "Customers",
    icon: <IconUsers />
  },
  {
    path: "/expenses",
    text: "Expenses",
    icon: <IconCash />
  },
  {
    path: "/discount",
    text: "Discount",
    icon: <IconDiscount2 />
  },
  {
    path: "/reports",
    text: "Reports",
    icon: <IconChartAreaLine />
  },
  {
    path: "/settings",
    text: "Settings",
    icon: <IconSettings2 />
  },
];

export default function Navbar() {

  const {pathname} = useLocation();

  console.log(pathname);

  return (
    <div className='h-screen w-72 px-8 py-8 border-r border-r-ipos-grey-100'>
      <img src={logo} alt="logo" className='w-40' />

      <div className="mt-6 flex flex-col gap-4">
      {
        navbarItems.map(item =>
          <Link 
            to={item.path} 
            key={item.path} 
            className={
              item.path == pathname ? 
              'w-full flex rounded-2xl gap-4 px-6 py-4 bg-ipos-blue-50 text-ipos-blue transition hover:bg-ipos-logo-color hover:text-white':
              'w-full flex rounded-2xl gap-4 px-6 py-4 bg-white text-ipos-grey transition hover:bg-ipos-grey-50'
            }
          >
            {item.icon} {item.text}
          </Link>
        )
      }
      </div>
    </div>
  )
}
