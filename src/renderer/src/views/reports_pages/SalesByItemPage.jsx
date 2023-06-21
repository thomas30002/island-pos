import React from 'react'
import DataTable from 'react-data-table-component';
import { CURRENCIES } from "../../config/currencies.config.js";
import { IconArrowDown, IconDownload } from '@tabler/icons-react'

export default function SalesByItemPage() {
  // get currency
  const currencyCode = window.api.getCurrency();
  const currencyFind =  CURRENCIES.find(c=>c.cc == currencyCode);
  const currencySymbol = currencyFind !== undefined ? currencyFind.symbol : '';
  // get currency

  // data table
  const columns = [
    {
      name: "Item",
      selector: row => row.dataValues.item,
      
      sortable: true,
    },
    {
      name: "Items sold",
      selector: row => row.dataValues.items_sold,
      sortable: true,
    },
    {
      name: "Gross Sales",
      selector: row => row.dataValues.gross_sales,
      format: (row, index) => `${currencySymbol}${row.dataValues.gross_sales}`,
      sortable: true,
    },
    {
      name: "Cost",
      selector: row => row.dataValues.cost,
      format: (row, index) => `${currencySymbol}${row.dataValues.cost}`,
      sortable: true,
    },
    {
      name: "Net Sales",
      selector: row => row.dataValues.net_sales,
      format: (row, index) => `${currencySymbol}${row.dataValues.net_sales}`,
      sortable: true,
    },
  ];
  const dataTableData = [
    {
      dataValues: {
        item: "Item 1",
        items_sold: 30,
        gross_sales: 20000,
        cost: 18000,
        net_sales: 15000
      }
    }
  ];
  // data table

  return (
    <div className='px-8 py-6 w-full'>
      <h3>Sales By Item</h3>

      <div className="flex gap-4 mt-6 items-end flex-wrap">
        <div>
          <label htmlFor="fromdate" className='block'>From Date</label>
          <input type="date" name="fromdate" id="fromdate" className='block w-60 outline-none text-ipos-grey bg-ipos-grey-50 px-4 py-3 rounded-2xl mt-2' />
        </div>

        <div>
          <label htmlFor="todate" className='block'>To Date</label>
          <input type="date" name="todate" id="todate" className='block w-60 outline-none text-ipos-grey bg-ipos-grey-50 px-4 py-3 rounded-2xl mt-2' />
        </div>

        <div>
          <label htmlFor="groupby" className='block'>Group By</label>
          <select name="groupby" id="groupby" className='block w-60 outline-none text-ipos-grey bg-ipos-grey-50 px-4 py-3 rounded-2xl mt-2'>
            <option value="day">Day</option>
            <option value="day">Month</option>
            <option value="day">Year</option>
          </select>
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
