import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { IconArrowDown, IconDownload } from '@tabler/icons-react'
import { Parser } from "@json2csv/plainjs";
import { saveAs } from "file-saver"
import { CURRENCIES } from "../../config/currencies.config.js";

export default function SalesByItemPage() {
  // get currency
  const currencyCode = window.api.getCurrency();
  const currencyFind =  CURRENCIES.find(c=>c.cc == currencyCode);
  const currencySymbol = currencyFind !== undefined ? currencyFind.symbol : '';
  // get currency

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

      const res = await window.api.getReportSalesByItem(fromDate, to);
      console.log(res);
      setData(res);

    } catch (error) {
      console.error(error);
    }
  }


  // data table
  const columns = [
    {
      name: "ID",
      selector: row => row.dataValues.id,
      sortable: true,
      width: "100px"
    },
    {
      name: "Item",
      selector: row => row.dataValues?.Products[0]?.dataValues?.name || "",
      sortable: true,
    },
    {
      name: "Items sold",
      selector: row => row.dataValues.items_sold,
      sortable: true,
      width: "140px"
    },
  ];
  // data table

  const btnExport = () => {
    const json = data.map(r=>({
      id: r.dataValues.id,
      item: r.dataValues?.Products[0]?.dataValues?.name || "",
      items_sold: r.dataValues.items_sold
    }));

    const parser = new Parser();
    const csv = parser.parse(json);

    var file = new File([csv], "ipos-report-sales-by-item.csv", {type: "text/csv;charset=utf-8"});
    saveAs(file);
  }

  return (
    <div className='px-8 py-6 w-full'>
      <h3>Sales By Item</h3>

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
