import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { CURRENCIES } from "../../config/currencies.config.js";
import { IconArrowDown, IconDownload } from '@tabler/icons-react'
import { Parser } from '@json2csv/plainjs';
import { saveAs } from 'file-saver';

export default function SalesByCustomersPage() {

  const today = new Date()
  const oneMonthFromToday = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());

  const [fromDate, setFromDate] = useState(oneMonthFromToday);
  const [toDate, setToDate] = useState(today);
  const [data, setData] = useState([]);

  useEffect(()=>{
    _getReportSalesByCustomers();
  },[fromDate, toDate]);

  const _getReportSalesByCustomers = async () => {
    try {
      const to = `${toDate.getFullYear()}-${(toDate.getMonth() + 1).toString().padStart(2, 0)}-${toDate.getDate().toString().padStart(2, 0)} 23:59:59`;

      const res = await window.api.getReportSalesByCustomers(fromDate, to);
      console.log(res);
      setData(res);
    } catch (error) {
      console.error(error);
    }
  };
  
  // get currency
  const currencyCode = window.api.getCurrency();
  const currencyFind =  CURRENCIES.find(c=>c.cc == currencyCode);
  const currencySymbol = currencyFind !== undefined ? currencyFind.symbol : '';
  // get currency

  // data table
  const columns = [
    {
      name: "ID",
      selector: row => row.dataValues.CustomerId,
      sortable: true
    },
    {
      name: "Name",
      selector: row => row.dataValues?.Customer?.dataValues?.name || "",
      sortable: true,
    },
    {
      name: "Total Sales",
      selector: row => row.dataValues.total_sales,
      format: (row, index) => `${currencySymbol}${row.dataValues.total_sales}`,
      sortable: true,
    }
  ];
  // data table

  const btnExport = () => {
    const json = data.map(r=>({
      customer_id: r.dataValues.CustomerId,
      name: r.dataValues?.Customer?.dataValues?.name || "",
      total_sales: r.dataValues.total_sales,
    }));

    const parser = new Parser();
    const csv = parser.parse(json);

    var file = new File([csv], "ipos-sales-by-customer.csv", {type: "text/csv;charset=utf-8"});
    saveAs(file);
  }

  return (
    <div className='px-8 py-6 w-full'>
      <h3>Sales By Customers</h3>

      <div className="flex gap-4 mt-6 items-end flex-wrap">
        <div>
          <label htmlFor="fromdate" className='block'>From Date</label>
          <input value={`${fromDate.getFullYear()}-${(fromDate.getMonth() + 1).toString().padStart(2, 0)}-${fromDate.getDate().toString().padStart(2, 0)}`} onChange={e=>setFromDate(new Date(e.target.value))} type="date" name="fromdate" id="fromdate" className='block w-60 outline-none text-ipos-grey bg-ipos-grey-50 px-4 py-3 rounded-2xl mt-2' />
        </div>

        <div>
          <label htmlFor="todate" className='block'>To Date</label>
          <input value={`${toDate.getFullYear()}-${(toDate.getMonth() + 1).toString().padStart(2, 0)}-${toDate.getDate().toString().padStart(2, 0)}`} onChange={e=>setToDate(new Date(e.target.value))} type="date" name="todate" id="todate" className='block w-60 outline-none text-ipos-grey bg-ipos-grey-50 px-4 py-3 rounded-2xl mt-2' />
        </div>

        <div>
          <button onClick={btnExport} className='flex gap-2 items-center outline-none text-ipos-grey bg-ipos-grey-50 hover:bg-ipos-grey-100 px-4 py-3 rounded-2xl'>
            <IconDownload/>
            Export
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="w-full mt-6 border rounded-2xl p-4">
          <DataTable columns={columns} data={data} pagination responsive sortIcon={<IconArrowDown />} />
        </div>
      </div>

    </div>
  )
}
