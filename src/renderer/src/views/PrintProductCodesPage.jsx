import { IconChevronLeft, IconPrinter } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import Barcode from 'react-barcode'
import QRCode from 'react-qr-code'
import { useNavigate } from 'react-router-dom'

export default function PrintProductCodesPage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [state, setState] = useState({
    product: "all",
    codeType: "qr",
  });

  useEffect(() => {
    _getAllProducts();
  }, [])

  const _getAllProducts = async () => {
    try {
      const res = await window.api.getProducts()
      console.log(res)
      setProducts(res)
    } catch (error) {
      console.log(error)
    }
  };

  const goBack = () => {
    navigate(-1)
  }

  const printThis = () => {
    window.print()
  }

  return (
    <div className="w-full print:text-sm">
      <div className="flex flex-col px-8 py-12 gap-4 divide-y print:hidden">
        <div className="flex items-center gap-4">
          <button
            onClick={goBack}
            className="flex items-center gap-2 bg-ipos-grey-100 text-ipos-grey rounded-2xl px-4 py-3 hover:bg-ipos-grey-50"
          >
            <IconChevronLeft />
            Back
          </button>
          <button
            onClick={printThis}
            className="flex items-center gap-2 bg-ipos-grey-100 text-ipos-grey rounded-2xl px-4 py-3 hover:bg-ipos-grey-50"
          >
            <IconPrinter />
            Print
          </button>
        </div>
        <div className='flex items-center gap-4 pt-4'>
          <div>
            <label className='block mb-1' htmlFor="products">Select Product(s)</label>
            <select value={state.product} onChange={e=>setState({...state, product: e.target.value})} name="products" id="products" className='flex items-center gap-2 bg-ipos-grey-100 text-ipos-grey rounded-2xl px-4 py-3 hover:bg-ipos-grey-50 w-full'>
              <option value="all">All</option>
              {
                products.map((product,index)=><option key={index} value={product.dataValues.id}>#{product.dataValues.id} {product.dataValues.name} (Barcode: {product.dataValues?.barcode || ""})</option>)
              }
            </select>
          </div>
          <div>
            <label className='block mb-1' htmlFor="codetype">Code Type</label>
            <select value={state.codeType} onChange={e=>setState({...state, codeType: e.target.value})} name="codetype" id="codetype" className='flex items-center gap-2 bg-ipos-grey-100 text-ipos-grey rounded-2xl px-4 py-3 hover:bg-ipos-grey-50 w-full'>
              <option value="qr">QR Code</option>
              <option value="barcode">Barode</option>
            </select>
          </div>
          
        </div>
      </div>


      <div className='flex gap-4 flex-wrap p-4'>
        {
          state.product == "all" ? products.map((product, index)=>{
            const barcode = product.dataValues?.barcode || "";
            const id = product.dataValues.id;

            if(state.codeType == "qr") {
              return <div key={index} className='text-center'>
                <QRCode value={barcode} size={128} />
                <p>{id}</p>
              </div>
            }
            return <div key={index} className='text-center'>
              <Barcode value={barcode} />
            </div>
          }) : [0,1,2,3,4,5,6,7,8,9].map((v, i)=>{

            const productIndex = products.findIndex(p=>p.dataValues.id == state.product);
            const product = products[productIndex]

            const barcode = product.dataValues?.barcode || "";
            const id = product.dataValues.id;

            if(state.codeType == "qr") {
              return <div key={i} className='text-center'>
                <QRCode value={barcode} size={128} />
                <p>{id}</p>
              </div>
            }
            return <div key={i} className='text-center'>
              <Barcode value={barcode} />
            </div>
          })
        }
      </div>

    </div>
  )
}
