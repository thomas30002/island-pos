import React from 'react'
import DataTable from 'react-data-table-component';
import { CURRENCIES } from "../../config/currencies.config.js";
import { IconArrowDown, IconDownload } from '@tabler/icons-react'

export default function SalesByCustomersPage() {
  // get currency
  const currencyCode = window.api.getCurrency();
  const currencyFind =  CURRENCIES.find(c=>c.cc == currencyCode);
  const currencySymbol = currencyFind !== undefined ? currencyFind.symbol : '';
  // get currency

  // data table
  const columns = [
    {
      name: "ID",
      selector: row => row.dataValues.id,
      sortable: true
    },
    {
      name: "Name",
      selector: row => row.dataValues.name,
      sortable: true,
    },
    {
      name: "Total Sales",
      selector: row => row.dataValues.total_sales,
      format: (row, index) => `${currencySymbol}${row.dataValues.total_sales}`,
      sortable: true,
    }
  ];
  const dataTableData = [
    {
      dataValues: {
        id: 1,
        name: "ABC",
        total_sales: 10000
      }
    },
    {
      dataValues: {
        id: 2,
        name: "ABC",
        total_sales: 30000
      }
    },
    {
      dataValues: {
        id: 3,
        name: "ABC",
        total_sales: 20000
      }
    }
  ];
  // data table

  return (
    <div className='px-8 py-6 w-full'>
      <h3>Sales By Customers</h3>

      <div className="flex gap-4 mt-6 items-end">
        <div>
          <label htmlFor="fromdate" className='block'>From Date</label>
          <input type="date" name="fromdate" id="fromdate" className='block w-60 outline-none text-ipos-grey bg-ipos-grey-50 px-4 py-3 rounded-2xl mt-2' />
        </div>

        <div>
          <label htmlFor="todate" className='block'>To Date</label>
          <input type="date" name="todate" id="todate" className='block w-60 outline-none text-ipos-grey bg-ipos-grey-50 px-4 py-3 rounded-2xl mt-2' />
        </div>

        <div>
          <button className='flex gap-2 items-center outline-none text-ipos-grey bg-ipos-grey-50 hover:bg-ipos-grey-100 px-4 py-3 rounded-2xl'>
            <IconDownload/>
            Export
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="w-full mt-6 border rounded-2xl p-4">
          <DataTable columns={columns} data={dataTableData} pagination responsive sortIcon={<IconArrowDown />} />
        </div>
      </div>

    </div>
  )
}
