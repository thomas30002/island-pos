import { IconPlus, IconTrash, IconX } from '@tabler/icons-react'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';

export default function DiningOptions() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [diningOptions, setDiningOptions] = useState([]);
  const txtDiningOptionRef = useRef(null);

  useEffect(()=>{
    _getAllDiningOptions();
  },[]);

  const _getAllDiningOptions = async () => {
    try {
      const res = await window.api.getDiningOptions();
      setDiningOptions(res);
    } catch (error) {
      console.log(error);
    }
  }

  const btnAddDiningOption = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  }

  const btnSaveAddModal = async () => {
    const diningOption = txtDiningOptionRef.current.value;

    if(!diningOption) {
      toast.error("Please Provide Payment Type Value!");
      return;
    }
    
    try {
      const res = await window.api.addDiningOption(diningOption);
      await _getAllDiningOptions();
      toast.success("Dining Option added.")
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while saving details!");
    }


    setShowAddModal(false);
  }

  const btnRemoveDiningOption = async id => {
    try {
      const res = await window.api.removeDiningOption(id);
      await _getAllDiningOptions();
      toast.success("Dining Option removed.")
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while saving details!");
    }
  };

  return (
    <div className='px-8 py-6'>
      <div className="w-full flex mt-4 justify-between items-center">
        <h3 className='mt-4'>Dining Options</h3>
        <button onClick={btnAddDiningOption} className='flex items-center gap-2 bg-ipos-blue hover:bg-indigo-700 transition text-white px-4 py-3 rounded-2xl'>
          <IconPlus />
          Add Dining Option
        </button>
      </div>


<div className="mt-8 w-full flex flex-col divide-y gap-4">
        {diningOptions.map((diningOption,index)=>{
          const id = diningOption.dataValues.id;
          const name = diningOption.dataValues.name;

          return (
            <div key={id} className="pt-3 flex items-center justify-between">
              <p>{index+1}. {name}</p>
              <button onClick={()=>{
                btnRemoveDiningOption(id)
              }} className='text-red-500 hover:text-red-400'>
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
          <h3>Add Dining Option</h3>
        </div>

        <div className="mt-6">
          <label htmlFor="name" className='block w-full'>Name</label>
          <input ref={txtDiningOptionRef} type="text" id='name' name='name' placeholder='Write Dining Option here...' className='block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue' />
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
