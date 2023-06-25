import React from 'react'
import DataTable from 'react-data-table-component';
import { CURRENCIES } from "../../config/currencies.config.js";
import { IconArrowDown, IconDownload } from '@tabler/icons-react'


export default function TaxesPage() {
  // get currency
  const currencyCode = window.api.getCurrency();
  const currencyFind =  CURRENCIES.find(c=>c.cc == currencyCode);
  const currencySymbol = currencyFind !== undefined ? currencyFind.symbol : '';
  // get currency

  // data table
  const columns = [
    {
      name: "Tax Name",
      selector: row => row.dataValues.name,
      sortable: true,
    },
    {
      name: "Tax Rate",
      selector: row => row.dataValues.rate,
      sortable: true,
    },
    {
      name: "Taxable Sales",
      selector: row => row.dataValues.taxable_sales_amount,
      format: (row, index) => `${currencySymbol}${row.dataValues.taxable_sales_amount}`,
      sortable: true,
    },
    {
     name: "Tax Amount",
     selector: row => row.dataValues.tax_amount,
     format: (row, index) => `${currencySymbol}${row.dataValues.tax_amount}`,
     sortable: true,
   },
  ];
  const dataTableData = [
    
  ];
  // data table

  return (
    <div className='px-8 py-6 w-full'>
      <h3>Taxes</h3>

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
