import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { IconArrowDown, IconDownload } from '@tabler/icons-react'
import { Parser } from "@json2csv/plainjs";
import { saveAs } from "file-saver"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { CURRENCIES } from "../../config/currencies.config.js";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

export default function SalesByPaymentTypesPage() {
  const today = new Date()
  const oneMonthFromToday = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());

  const [fromDate, setFromDate] = useState(oneMonthFromToday);
  const [toDate, setToDate] = useState(today);
  const [data, setData] = useState([]);

  useEffect(()=>{
    _getData();
  },[fromDate, toDate]);

  const _getData = async () => {
    try {

      const to = `${toDate.getFullYear()}-${(toDate.getMonth() + 1).toString().padStart(2, 0)}-${toDate.getDate().toString().padStart(2, 0)} 23:59:59`;

      const res = await window.api.getReportSalesByPaymentTypes(fromDate, to);
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

  // data table
  const columns = [
    {
      name: "Payment Type",
      selector: row => row.dataValues?.PaymentType?.dataValues?.name || "",
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
      colors: {
        forceOverride: true
      }
    },
  };
  const labels = [
    ...data.map(r=>r.dataValues?.PaymentType?.dataValues?.name || ""),
  ];
  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Sales',
        data: [
          ...data.map(r=>r.dataValues.transactions),
        ],
        borderWidth: 1
      },
    ],
  };
  // chart


  const btnExport = () => {
    const json = data.map(r=>({
      payment_type: r.dataValues?.PaymentType?.dataValues?.name || "",
      transactions: r.dataValues.transactions,
      amount: r.dataValues.amount
    }));

    const parser = new Parser();
    const csv = parser.parse(json);

    var file = new File([csv], "ipos-sales-by-payment-types.csv", {type: "text/csv;charset=utf-8"});
    saveAs(file);
  }



  return (
    <div className='px-8 py-6 w-full'>
      <h3>Sales By Payment Type</h3>

      <div className="flex gap-4 mt-6 items-end">
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
        <div className="w-1/2 p-4 mx-auto">
          <Pie options={options} data={chartData} className='w-full' />
        </div>
        <div className="w-full mt-6 border rounded-2xl p-4">
          <DataTable columns={columns} data={data} pagination responsive sortIcon={<IconArrowDown />} />
        </div>
      </div>

    </div>
  )
}
