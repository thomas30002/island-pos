import React from 'react'
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
import DataTable from 'react-data-table-component';
import { CURRENCIES } from "../../config/currencies.config.js";
import { IconArrowDown } from '@tabler/icons-react'

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
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Sales',
        data: [20000, 24000, 12000, 15000, 30000, 23000, 50000],
        // borderColor: 'rgb(53, 162, 235)',
        // backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

   // data table
   const columns = [
    {
      name: "Date",
      selector: row => new Date(row.dataValues.date).toDateString(),
      width: "200px",
      sortable: true,
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
      format: (row, index) => `${currencySymbol}${row.dataValues.net_sales}`,
      sortable: true,
    },
  ];
  const dataTableData = [
    {
      dataValues: {
        date: new Date(Date.now()),
        gross_sales: 20000,
        discount: 1000,
        tax: 2000,
        net_sales: 15000
      }
    }
  ];
  // data table

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

      <div className="mt-8">
        <div className="w-full p-4 border rounded-2xl">
          <Line options={options} data={data} className='w-full' />
        </div>

        <div className="w-full mt-6 border rounded-2xl p-4">
          <DataTable columns={columns} data={dataTableData} pagination responsive sortIcon={<IconArrowDown />} />

        </div>
      </div>
    </div>
  )
}
