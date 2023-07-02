import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { IconArrowDown } from '@tabler/icons-react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend, Colors
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { CURRENCIES } from "../../config/currencies.config.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  Colors
);

export default function SalesSummaryPage() {
  const today = new Date()
  const oneMonthFromToday = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());

  const [fromDate, setFromDate] = useState(oneMonthFromToday);
  const [toDate, setToDate] = useState(today);
  const [groupby, setGroupby] = useState('DATE');
  const [data, setData] = useState([]);

  useEffect(()=>{
    _getAllData();
  },[fromDate, toDate, groupby]);

  const _getAllData = async () => {
    try {

      const to = `${toDate.getFullYear()}-${(toDate.getMonth() + 1).toString().padStart(2, 0)}-${toDate.getDate().toString().padStart(2, 0)} 23:59:59`;

      const res = await window.api.getReportSalesSummary(fromDate, to, groupby);
      console.log(res);
      setData(res);

    } catch (error) {
      console.error(error);
    }
  }

  // get currency
  const currencyCode = window.api.getCurrency();
  const currencyFind =  CURRENCIES.find(c=>c.cc == currencyCode);
  const currencySymbol = currencyFind !== undefined ? currencyFind.symbol : '';
  // get currency

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false,
      },
      title: {
        display: false,
        text: 'Reports',
      },
    },
  };
  const labels = [
    ...data.map(r=>r.dataValues.date).reverse(),
  ];
  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Sales',
        data: [
          ...data.map(r=>r.dataValues.gross_sales).reverse(),
        ],
      },
    ],
  };

   // data table
   const columns = [
    {
      name: "Date",
      selector: row =>row.dataValues.date,
      width: "200px",
    },
    {
      name: "Gross Sales",
      selector: row => row.dataValues.gross_sales,
      format: (row, index) => `${currencySymbol}${row.dataValues.gross_sales}`,
      sortable: true,
    },
    {
      name: "Discount",
      selector: row => row.dataValues.discount,
      format: (row, index) => `${currencySymbol}${row.dataValues.discount}`,
      sortable: true,
    },
    {
      name: "Tax",
      selector: row => row.dataValues.tax,
      format: (row, index) => `${currencySymbol}${row.dataValues.tax}`,
      sortable: true,
    },
    {
      name: "Net Sales",
      selector: row => row.dataValues.net_sales,
      format: (row, index) => `${currencySymbol}${row.dataValues.gross_sales - row.dataValues.discount - row.dataValues.tax}`,
      sortable: true,
    },
  ];
  
  // data table

  return (
    <div className='px-8 py-6 w-full'>
      <h3>Sales Summary</h3>

      <div className="flex gap-4 mt-6 flex-wrap">
        <div>
         <label htmlFor="fromdate" className='block'>From Date</label>
         <input value={`${fromDate.getFullYear()}-${(fromDate.getMonth() + 1).toString().padStart(2, 0)}-${fromDate.getDate().toString().padStart(2, 0)}`} onChange={e=>setFromDate(new Date(e.target.value))} type="date" name="fromdate" id="fromdate" className='block w-60 outline-none text-ipos-grey bg-ipos-grey-50 px-4 py-3 rounded-2xl mt-2' />
       </div>

       <div>
         <label htmlFor="todate" className='block'>To Date</label>
         <input value={`${toDate.getFullYear()}-${(toDate.getMonth() + 1).toString().padStart(2, 0)}-${toDate.getDate().toString().padStart(2, 0)}`} onChange={e=>setToDate(new Date(e.target.value))} type="date" name="todate" id="todate" className='block w-60 outline-none text-ipos-grey bg-ipos-grey-50 px-4 py-3 rounded-2xl mt-2' />
       </div>

        <div>
          <label htmlFor="groupby" className='block'>Group By</label>
          <select value={groupby} onChange={e=>setGroupby(e.target.value)} name="groupby" id="groupby" className='block w-60 outline-none text-ipos-grey bg-ipos-grey-50 px-4 py-3 rounded-2xl mt-2'>
            <option value="DATE">Date</option>
            <option value="MONTH">Month</option>
            <option value="YEAR">Year</option>
          </select>
        </div>
      </div>

      <div className="mt-8">
        <div className="w-full p-4 border rounded-2xl">
          <Line options={options} data={chartData} className='w-full' />
        </div>

        <div className="w-full mt-6 border rounded-2xl p-4">
          <DataTable columns={columns} data={data} pagination responsive sortIcon={<IconArrowDown />} />

        </div>
      </div>
    </div>
  )
}
