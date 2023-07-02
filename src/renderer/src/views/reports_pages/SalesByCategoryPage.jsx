import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { IconArrowDown, IconDownload } from '@tabler/icons-react'
import { Parser } from "@json2csv/plainjs";
import { saveAs } from "file-saver"

import { CURRENCIES } from "../../config/currencies.config.js";

export default function SalesByCategoryPage() {

  const today = new Date()
  const oneMonthFromToday = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());

  const [fromDate, setFromDate] = useState(oneMonthFromToday);
  const [toDate, setToDate] = useState(today);
  const [data, setData] = useState([]);

  useEffect(()=>{
    _getAllData();
  },[fromDate, toDate]);

  const _getAllData = async () => {
    try {

      const to = `${toDate.getFullYear()}-${(toDate.getMonth() + 1).toString().padStart(2, 0)}-${toDate.getDate().toString().padStart(2, 0)} 23:59:59`;

      const res = await window.api.getReportSalesByCategory(fromDate, to);
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
      name: "Category",
      selector: row => row.dataValues.category,
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
        category: "Category 1",
        items_sold: 30,
        gross_sales: 20000,
        cost: 18000,
        net_sales: 15000
      }
    },
    {
      dataValues: {
        category: "Category 2",
        items_sold: 30,
        gross_sales: 20000,
        cost: 18000,
        net_sales: 15000
      }
    },
    {
      dataValues: {
        category: "Category 3",
        items_sold: 30,
        gross_sales: 20000,
        cost: 18000,
        net_sales: 15000
      }
    }
  ];
  // data table

  const btnExport = () => {
    const json = receipts.map(r=>({
      id: r.dataValues.id,
      date: new Date(r.dataValues.createdAt).toLocaleString(),
      Customer: r.dataValues?.Customer?.dataValues?.name || CUSTOMER_TYPE.WALKIN,
      PaymentMethod: r.dataValues?.PaymentType?.dataValues?.name || "",
      CartTotal: r.dataValues.cartTotal,
      tax: r.dataValues.taxTotal,
      discount: r.dataValues.discountValue,
      total: r.dataValues.payableTotal
    }));

    const parser = new Parser();
    const csv = parser.parse(json);

    var file = new File([csv], "ipos-receipts.csv", {type: "text/csv;charset=utf-8"});
    saveAs(file);
  }

  return (
    <div className='px-8 py-6 w-full'>
      <h3>Sales By Category</h3>

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
          <DataTable columns={columns} data={dataTableData} pagination responsive sortIcon={<IconArrowDown />} />
        </div>
      </div>

    </div>
  )
}
