import React from 'react'
import { IconAdjustmentsHorizontal, IconCreditCard, IconReceipt, IconReceiptTax, IconSalad } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';

const navbarItems = [
  {
    path: "/settings/features",
    text: "Features",
    icon: <IconAdjustmentsHorizontal />
  },
  {
    path: "/settings/payment-type",
    text: "Payment Type",
    icon: <IconCreditCard />
  },
  {
    path: "/settings/taxes",
    text: "Taxes",
    icon: <IconReceiptTax />
  },
  {
    path: "/settings/receipt",
    text: "Receipt",
    icon: <IconReceipt />
  },
  {
    path: "/settings/dining-options",
    text: "Dining Options",
    icon: <IconSalad />
  },
];

export default function SettingsNavbar() {

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
            {item.icon} {item.text}
          </Link>
        )
      }
      </div>
    </div>
  )
}
