import React from 'react'
import DataTable from 'react-data-table-component';
import { CURRENCIES } from "../../config/currencies.config.js";
import { IconArrowDown, IconDownload } from '@tabler/icons-react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

export default function SalesByPaymentTypesPage() {
  // get currency
  const currencyCode = window.api.getCurrency();
  const currencyFind =  CURRENCIES.find(c=>c.cc == currencyCode);
  const currencySymbol = currencyFind !== undefined ? currencyFind.symbol : '';
  // get currency

  // data table
  const columns = [
    {
      name: "Payment Type",
      selector: row => row.dataValues.payment_type,
      sortable: true,
    },
    {
      name: "Transactions",
      selector: row => row.dataValues.transactions,
      sortable: true,
    },
    {
      name: "Amount",
      selector: row => row.dataValues.amount,
      format: (row, index) => `${currencySymbol}${row.dataValues.amount}`,
      sortable: true,
    },
  ];
  const dataTableData = [
    {
      dataValues: {
        payment_type: "Cash",
        transactions: 30,
        amount: 30000
      }
    },
    {
      dataValues: {
        payment_type: "Card",
        transactions: 100,
        amount: 400000
      }
    },
  ];
  // data table

  // chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        display: true,
      },
      title: {
        display: false,
        text: 'Reports',
      },
    },
  };
  const labels = ['Card', 'Cash', 'UPI'];
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Sales',
        data: [30000, 50000, 43000],
        borderWidth: 1
      },
    ],
  };
  // chart

  return (
    <div className='px-8 py-6 w-full'>
      <h3>Sales By Payment Type</h3>

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
        <div className="w-1/2 p-4 mx-auto">
          <Pie options={options} data={data} className='w-full' />
        </div>
        <div className="w-full mt-6 border rounded-2xl p-4">
          <DataTable columns={columns} data={dataTableData} pagination responsive sortIcon={<IconArrowDown />} />
        </div>
      </div>

    </div>
  )
}
