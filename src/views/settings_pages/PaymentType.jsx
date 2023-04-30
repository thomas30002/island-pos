import { IconPlus, IconTrash, IconX } from '@tabler/icons-react'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';

export default function PaymentType() {

  const [showAddModal, setShowAddModal] = useState(false);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const txtPaymentTypeRef = useRef(null);

  useEffect(()=>{
    _getAllPaymentTypes();
  },[]);

  const _getAllPaymentTypes = async () => {
    try {
      const res = await window.api.getPaymentTypes();
      setPaymentTypes(res);
    } catch (error) {
      console.log(error);
    }
  }

  const btnAddPaymentType = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  }

  const btnSaveAddModal = async () => {
    const paymentType = txtPaymentTypeRef.current.value;

    if(!paymentType) {
      toast.error("Please Provide Payment Type Value!");
      return;
    }
    
    try {
      const res = await window.api.addPaymentType(paymentType);
      await _getAllPaymentTypes();
      toast.success("Payment Type added.")
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while saving details!");
    }


    setShowAddModal(false);
  }

  return (
    <div className='px-8 py-6'>
      <div className="w-full flex mt-4 justify-between items-center">
        <h3 className='mt-4'>Payment Type</h3>
        <button onClick={btnAddPaymentType} className='flex items-center gap-2 bg-ipos-blue hover:bg-indigo-700 transition text-white px-4 py-3 rounded-2xl'>
          <IconPlus />
          Add Payment Type
        </button>
      </div>

      <div className="mt-8 w-full flex flex-col divide-y gap-4">
        {paymentTypes.map((paymentType,index)=>{
          return (
            <div key={paymentType.id} className="pt-3 flex items-center justify-between">
              <p>{index+1}. {paymentType.name}</p>
              <button className='text-red-500 hover:text-red-400'>
                <IconTrash />
              </button>
            </div>
          )
        })}
      </div>

      {/* modal */}
      <div className={showAddModal?"w-96 h-[96vh] rounded-2xl bg-white shadow-2xl fixed top-0 right-0 overflow-y-scroll px-4 py-3 mt-4 mr-4":"hidden"}>
        <div className="flex items-center gap-3 mt-4">
          <button onClick={closeAddModal} className='w-12 h-12 flex items-center justify-center rounded-2xl bg-ipos-grey-50 hover:bg-ipos-grey-100 text-ipos-grey'>
            <IconX />
          </button>
          <h3>Add Payment Type</h3>
        </div>

        <div className="mt-6">
          <label htmlFor="name" className='block w-full'>Name</label>
          <input ref={txtPaymentTypeRef} type="text" id='name' name='name' placeholder='Write Payment Type here...' className='block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue' />
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
