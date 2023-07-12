import { IconChevronLeft, IconPrinter } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

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
      const currencyFromStorage = window.api.getCurrency();

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

      setData({
        ...data,
        loading: false,
        
        currencySymbol: currencyFromStorage,
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

  return <div className='w-full'>
    
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
        {data.logo != null && data.logo != "" ? <img src={data.logo} alt="logo" /> : <></>}
      </div>

      {/* header */}
      <div>
        {data.header}
      </div>

      {/* customer info: id, name, address, email, phone */}

      {/* payment method */}
      {/* receipt id, date */}

      {/* payable total total */}
      {/* cart total */}
      {/* tax total */}
      {/* discount */}

      {/* items */}

      {/* footer */}
      <div>
        {data.footer}
      </div>


    </div>
    {/* details */}

  </div>
}
