import { IconChevronLeft, IconPrinter } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { CURRENCIES } from '../config/currencies.config'

export default function PrintReceiptPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [data, setData] = useState({
    loading: true,
    header: "",
    footer: "",
    logo: "",
    showComments: false,
    showCustomerInfo: false,
    currencySymbol: "",
    receipt: null,
  })

  const {} = searchParams

  useEffect(()=>{
    _getData();
  }, [id]);

  const _getData = async () => {
    try {
      const resReceipt = await window.api.getReportRecieptById(id);
      const currencyCode = window.api.getCurrency();
      const currencyFind =  CURRENCIES.find(c=>c.cc == currencyCode);
      const currencySymbol = currencyFind !== undefined ? currencyFind.symbol : '';

      console.log(resReceipt);

      const resReceiptSetting = await window.api.getReceiptSettings();

      let header="";
      let footer="";
      let showComments=false;
      let showCustomerInfo=false;
      let logo = "";


      if(resReceiptSetting) {
        console.log(resReceiptSetting.dataValues);

        let logoUrl = '';

        if(resReceiptSetting.dataValues.logo != null && resReceiptSetting.dataValues.logo != undefined && resReceiptSetting.dataValues.logo != "") {
          logoUrl = resReceiptSetting.dataValues.logo;
        }

        header= resReceiptSetting.dataValues.header || "";
        footer= resReceiptSetting.dataValues.footer || "";
        showComments= resReceiptSetting.dataValues.showComments || false;
        showCustomerInfo= resReceiptSetting.dataValues.showCustomerInfo || false;
        logo= logoUrl || null;
      }


      const doPrint = searchParams.get("print") || false;

      if(doPrint) {
        setTimeout(()=>{
          printThis();
        }, 1000)
      }

      setData({
        ...data,
        loading: false,
        
        currencySymbol: currencySymbol,
        receipt: resReceipt[0],
        header,
        footer,
        showComments,
        showCustomerInfo,
        logo,
      })

    } catch (error) {
      console.log(error)
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const printThis = () => {
    window.print();
  }

  if(data.loading) {
    return <div className="w-full h-screen flex items-center justify-center">
      Please wait...
    </div>
  }

  return <div className='w-full print:text-sm'>
    
    <div className="flex justify-between items-center px-8 py-12 print:hidden">
      <div className='flex items-center gap-4'>
        <button onClick={goBack} className='flex items-center gap-2 bg-ipos-grey-100 text-ipos-grey rounded-2xl px-4 py-3 hover:bg-ipos-grey-50'>
          <IconChevronLeft />
          Back
        </button>
        <button onClick={printThis} className='flex items-center gap-2 bg-ipos-grey-100 text-ipos-grey rounded-2xl px-4 py-3 hover:bg-ipos-grey-50'>
          <IconPrinter />
          Print
        </button>
      </div>
      <div>

      </div>
    </div>

    {/* details */}
    <div className="mt-6 print:mt-0 px-8 print:px-0">
      

      {/* logo */}
      <div>
        {data.logo != null && data.logo != "" ? <img src={data.logo} alt="logo" className='h-12 object-contain' /> : <></>}
      </div>

      {/* header */}
      <div className='mt-4'>
        <pre>
        {data.header}
        </pre>
      </div>

      <div className="border-b"></div>

      {/* customer info: id, name, address, email, phone */}
      {
        data.showCustomerInfo ? <div className='my-4'>
        <pre>
Customer Name     : {data.receipt?.dataValues?.Customer?.dataValues?.name || ""} (#{data.receipt?.dataValues?.Customer?.dataValues?.id || ""})<br/>
Customer Address: : {data.receipt?.dataValues?.Customer?.dataValues?.address || ""}<br/>
Custoemr Email:   : {data.receipt?.dataValues?.Customer?.dataValues?.email || ""}<br/>
Customer Phone    : {data.receipt?.dataValues?.Customer?.dataValues?.phone || ""}<br/>
        </pre>
      </div>:<></>
      }

      <div className="border-b"></div>

      <div className="my-4">
        <pre>
Receipt ID     : {data.receipt.dataValues?.id || ""}<br/>
Date           : {data.receipt.dataValues?.createdAt?.toLocaleString() || ""}<br/>
Payment Method : {data.receipt.dataValues?.PaymentType?.dataValues?.name || ""}<br/>
        </pre>
      </div>

      <div className="border-b"></div>

      {/* items */}
      <div className="my-4 font-mono flex gap-4">
        <div>
          <table className="border border-collapse">
            <tr>
              <td className='border p-2'>#</td>
              <td className='border p-2'>Item</td>
              <td className='border p-2'>Qty</td>
              <td className='border p-2 max-w-[140px] text-right'>Total (Exclusive of Tax)</td>
            </tr>
            {
              data.receipt?.dataValues?.Products?.map((product, i, products)=>{

                const itemName = product?.dataValues?.name || "";
                const itemPrice = product?.dataValues?.price || 0;
                const TaxId = product?.dataValues?.TaxId || null;
                const qty = product?.dataValues?.ProductSales?.dataValues?.quantity || 1;
                const itemTotal  = itemPrice * qty;

                return <tr>
                  <td className="border p-2 text-right">{i+1}</td>
                  <td className="border p-2">{itemName}</td>
                  <td className="border p-2 text-right">{qty}</td>
                  <td className="border p-2 text-right">{data.currencySymbol}{itemTotal.toLocaleString()}/-</td>
                </tr>
              })
            }
          </table>
        </div>
        <div>
          <table className='border border-collapse'>
            <tr>
              <td className='border p-2'>Cart Total</td>
              <td className='border p-2 text-right'>{data.currencySymbol}{data.receipt.dataValues?.cartTotal?.toLocaleString() || "0"}/-</td>
            </tr>
            <tr>
              <td className='border p-2'>Tax Total</td>
              <td className='border p-2 text-right'>{data.currencySymbol}{data.receipt.dataValues?.taxTotal?.toLocaleString() || "0"}/-</td>
            </tr>
            <tr>
              <td className='border p-2'>Discount</td>
              <td className='border p-2 text-right'>{data.currencySymbol}{data.receipt.dataValues?.discountValue?.toLocaleString() || "0"}/-</td>
            </tr>
            <tr>
              <td className='border p-2'>Payable Total</td>
              <td className='border p-2 text-right font-bold'>{data.currencySymbol}{data.receipt.dataValues?.payableTotal?.toLocaleString() || "0"}/-</td>
            </tr>
          </table>
        </div>
        
      </div>

      {/* footer */}
      <div className="border-b"></div>

      <div className='mt-4'>
        <pre>
        {data.footer}
        </pre>
      </div>


    </div>
    {/* details */}

  </div>
}
