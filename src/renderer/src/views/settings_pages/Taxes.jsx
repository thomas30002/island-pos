import { IconPlus, IconTrash, IconX } from '@tabler/icons-react'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import { TAX_TYPES } from "../../config/taxType.config";

export default function Taxes() {
  const [showAddModal, setShowAddModal] = useState(false);
  
  const txtTaxNameRef = useRef(null);
  const txtTaxRateRef = useRef(null);
  const txtTaxTypeRef = useRef(null);

  const [taxes, setTaxes] = useState([]);

  useEffect(()=>{
    _getAllTaxes();
  },[]);

  const _getAllTaxes = async () => {
    try {
      const res = await window.api.getTaxes();
      setTaxes(res);
    } catch (error) {
      console.log(error);
    }
  }

  const btnAddTax = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  }

  const btnSaveAddModal = async () => {
    const taxName = txtTaxNameRef.current.value;
    const taxRate = txtTaxRateRef.current.value;
    const taxType = txtTaxTypeRef.current.value;

    if(!taxName) {
      toast.error("Please Provide Tax Name!");
      return;
    }

    if(!taxRate) {
      toast.error("Please Provide Tax Rate!");
      return;
    }

    if(!taxType) {
      toast.error("Please Provide Tax Type!");
      return;
    }
    
    try {
      const res = await window.api.addTax(taxName,taxRate,taxType);
      await _getAllTaxes();
      toast.success("Tax added.")
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while saving details!");
    }


    setShowAddModal(false);
  }

   const btnDeleteTax = async id => {
      try {
        const res = await window.api.removeTax(id);
        await _getAllTaxes();
        toast.success("Tax Removed.")
      } catch (error) {
        console.log(error);
        toast.error("Error while saving details!");
      }
   }

  return (
    <div className='px-8 py-6'>
      <div className="w-full flex mt-4 justify-between items-center">
        <h3 className='mt-4'>Taxes</h3>
        <button onClick={btnAddTax} className='flex items-center gap-2 bg-ipos-blue hover:bg-indigo-700 transition text-white px-4 py-3 rounded-2xl'>
          <IconPlus />
          Add Tax
        </button>
      </div>

      <div className="mt-8 w-full">
        <table className='w-full'>
          <thead>
            <tr className='border-b'>
              <th className='text-left pb-2'>Name</th>
              <th className='text-left pb-2'>Tax Type</th>
              <th className='text-left pb-2'>Tax Rate</th>
              <th className='text-left pb-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {taxes.map((tax,index)=>{

              const name = tax.dataValues.name;
              const taxRate = tax.dataValues.taxRate;
              const type = tax.dataValues.type;
              const id = tax.dataValues.id;

              return <tr className="border-b" key={index}>
                <td className='py-2'>{name}</td>
                <td className='py-2'>{type}</td>
                <td className='text-left py-2'>{taxRate}%</td>
                <td className='text-left py-2'>
                  <button onClick={()=>{
                    btnDeleteTax(id);
                  }} className='text-red-500 hover:text-red-400'>
                    <IconTrash />
                  </button>
                </td>
              </tr>
            })}
            
          </tbody>
        </table>
      </div>


      {/* modal */}
      <div className={showAddModal?"w-96 h-[96vh] rounded-2xl bg-white shadow-2xl fixed top-0 right-0 overflow-y-scroll px-4 py-3 mt-4 mr-4":"hidden"}>
        <div className="flex items-center gap-3 mt-4">
          <button onClick={closeAddModal} className='w-12 h-12 flex items-center justify-center rounded-2xl bg-ipos-grey-50 hover:bg-ipos-grey-100 text-ipos-grey'>
            <IconX />
          </button>
          <h3>Add Tax</h3>
        </div>

        <div className="mt-6">
          <label htmlFor="name" className='block w-full'>Name</label>
          <input ref={txtTaxNameRef} type="text" id='name' name='name' placeholder='Write Tax Name here...' className='block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue' />

          <label htmlFor="taxRate" className='mt-4 block w-full'>Tax Rate</label>
          <input ref={txtTaxRateRef} type="number" min="0" max="1000" id='taxRate' name='taxRate' placeholder='Write Tax Rate here...' className='block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue' />

          <label htmlFor="type" className='block mt-4 w-full'>Tax Type</label>
          <select name="type" id="type" ref={txtTaxTypeRef} className='block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue'>
            <option value={TAX_TYPES.INCLUSIVE}>Inclusive of Price</option>
            <option value={TAX_TYPES.EXCLUSIVE}>Exclusive of Price</option>
          </select>
        </div>

        <div className="absolute bottom-4">
          <button onClick={btnSaveAddModal} className='rounded-2xl px-4 py-3 bg-ipos-blue hover:bg-ipos-logo-color text-white'>Save</button>
          <button onClick={closeAddModal} className='rounded-2xl px-4 py-3 bg-ipos-grey-50 hover:bg-ipos-grey-100 text-ipos-grey ml-2'>Cancel</button>
        </div>
      </div>
      {/* modal */}

    </div>
  )
}
