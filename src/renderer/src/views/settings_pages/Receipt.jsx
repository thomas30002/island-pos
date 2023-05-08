import { IconInfoSquareRounded, IconPencil, IconPhoto, IconTrash, IconUser } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { CURRENCIES } from "../../config/currencies.config"
import { blobToBase64 } from "../../utils/blobToBase64";

export default function Receipt() {

  const currencyFromStorage = window.api.getCurrency();

  const [state, setState] = useState({header: '', footer: '', showCustomerInfo: false, showComments: false, logo: '', currency: currencyFromStorage});   
  
  const {header, footer, showComments, showCustomerInfo, logo, currency} = state;
  
  useEffect(()=>{
    _getReceiptSettings();
    
  },[]);

  const _getReceiptSettings = async () => {
    try {
      const res = await window.api.getReceiptSettings();

      if(res) {
        console.log(res.dataValues);

        let logoUrl = '';

        if(res.dataValues.logo != null && res.dataValues.logo != undefined && res.dataValues.logo != "") {
          logoUrl = res.dataValues.logo;
        }

        setState({
          ...state,
          header: res.dataValues.header || "",
          footer: res.dataValues.footer || "",
          showComments: res.dataValues.showComments || false,
          showCustomerInfo: res.dataValues.showCustomerInfo || false,
          logo: logoUrl || null,
        })
      }
    } catch (error) { 
      console.log(error);
    }
  };

  const btnEditLogo = async () => {
    const imageCompression = await import('browser-image-compression');
    

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.addEventListener("change", async (e)=>{
      // handle file
      const imageFile = e.target.files[0];

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 512,
        useWebWorker: true
      };

      try {
        const compressedFile = await imageCompression.default(imageFile, options);
        // const url = URL.createObjectURL(compressedFile);
        const url = await blobToBase64(compressedFile);

        // save to DB
        const res = await window.api.saveReceiptSettings({
          header, footer, showCustomerInfo, logo:url,
          showComments
        });

        setState({
          ...state,
          logo: url
        });
      } catch (error) {
        console.log(error);
      }


    });

    input.click();
  };

  const btnRemoveLogo = async () => {
    // remove logo
    try {
      // save to DB
      const res = await window.api.saveReceiptSettings({
        header, footer, showCustomerInfo, logo: null,
        showComments
      });

      setState({
        ...state,
        logo: null
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowCommentsChange = async (e) => {
    const checked = e.target.checked;

    try {
      const res = await window.api.saveReceiptSettings({
        header, footer, showCustomerInfo, logo,
        showComments: checked
      });

      setState({
        ...state,
        showComments: checked,
      });
    } catch (error) {
      console.log(error);
      toast.error("Unable to save details!");
    }
  }

  const handleShowCustomerInfoChange = async (e) => {
    const checked = e.target.checked;

    try {
      const res = await window.api.saveReceiptSettings({
        header, footer, showCustomerInfo: checked, logo,
        showComments
      });

      setState({
        ...state,
        showCustomerInfo: checked,
      });
    } catch (error) {
      console.log(error);
      toast.error("Unable to save details!");
    }
  }

  const handleOnHeaderChange = async e => {
    const change = e.target.value;

    try {
      const res = await window.api.saveReceiptSettings({
        header: change, footer, showCustomerInfo, logo,
        showComments
      });

      setState({
        ...state,
        header: change,
      });
    } catch (error) {
      console.log(error);
      toast.error("Unable to save details!");
    }
  }

  const handleOnFooterChange = async e => {
    const change = e.target.value;

    try {
      const res = await window.api.saveReceiptSettings({
        header, footer: change, showCustomerInfo, logo,
        showComments
      });

      setState({
        ...state,
        footer: change,
      });
    } catch (error) {
      console.log(error);
      toast.error("Unable to save details!");
    }
  }

  const handleOnCurrencyChange = async e => {
    const change = e.target.value;

    window.api.setCurrency(change);
    setState({
      ...state,
      currency: change,
    })

    // try {
    //   const res = await window.api.saveReceiptSettings({
    //     header, footer, showCustomerInfo, logo,
    //     showComments, currency: change
    //   });

    //   setState({
    //     ...state,
    //     currency: change,
    //   });
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Unable to save details!");
    // }
  }

  return (
    <div className='px-8 py-6'>

      <div className=' w-full flex flex-col items-center justify-center mt-8'>
        <div className='relative w-32 h-32 bg-ipos-grey-50 rounded-full flex items-center justify-center'>
          
          {
            logo !== undefined && logo !== '' && logo !== null ? 
              <img src={logo} alt="logo" className='w-32 h-32 object-cover rounded-full' />
            :
            <IconPhoto className='text-ipos-grey' />
          }

          <button onClick={btnEditLogo} className="transition bg-white hover:bg-ipos-grey-100 shadow-lg rounded-full absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 ">
            <IconPencil />
          </button>

          {
            logo !== undefined && logo !== '' && logo !== null ? 
            <button onClick={btnRemoveLogo} className='absolute bottom-10 -right-4 w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 transition text-red-600  items-center justify-center flex'>
            <IconTrash />
          </button>
            :
            <></>
          }

          
        </div>
        <p className='mt-4'>Logo</p>
      </div>


      <div className="w-full mt-6 no-drag">
        <label htmlFor="receiptHeader" className='block w-full'>Header</label>
        <textarea value={header} onChange={handleOnHeaderChange} className='outline-none w-full h-28 mt-2 bg-ipos-grey-50 placeholder::text-ipos-grey px-4 py-3 rounded-2xl' name="receiptHeader" id="receiptHeader" placeholder='Enter Header Text to include in receipt'></textarea>
      </div>

      <div className="w-full mt-2 no-drag">
        <label htmlFor="receiptFooter" className='block w-full'>Footer</label>
        <textarea value={footer} onChange={handleOnFooterChange} className='outline-none w-full h-28 mt-2 bg-ipos-grey-50 placeholder::text-ipos-grey px-4 py-3 rounded-2xl' name="receiptFooter" id="receiptFooter" placeholder='Enter Footer Text to include in receipt'></textarea>
      </div>

      <div className="w-full mt-4 no-drag">
        <label htmlFor="currency" className='block w-full'>Currency</label>
        <select value={currency} onChange={handleOnCurrencyChange} name="currency" id="currency" placeholder='Select Currency' className='outline-none w-full mt-2 bg-ipos-grey-50 placeholder::text-ipos-grey px-4 py-3 rounded-2xl'>
          <option value="">Select Currency</option>
          {
            CURRENCIES.map((c,index)=><option key={index} value={c.cc}>{c.name} ({c.symbol})</option>)
          }
        </select>
      </div>

      <div className='mt-4 w-full flex items-center justify-between bg-ipos-grey-50 rounded-2xl px-6 py-4'>
        <div className="flex items-center gap-4">
          <IconUser />
          <p>Show Customer info</p>
        </div>
        <div>
          <label className="relative inline-flex items-center cursor-pointer no-drag">
            <input checked={showCustomerInfo} onChange={handleShowCustomerInfoChange} type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
          </label>
        </div>
      </div>

      <div className='mt-4 w-full flex items-center justify-between bg-ipos-grey-50 rounded-2xl px-6 py-4'>
        <div className="flex items-center gap-4">
          <IconInfoSquareRounded />
          <p>Show Comments</p>
        </div>
        <div>
          <label className="relative inline-flex items-center cursor-pointer no-drag">
            <input checked={showComments} onChange={handleShowCommentsChange} type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
          </label>
        </div>
      </div>

    </div>
  )
}
