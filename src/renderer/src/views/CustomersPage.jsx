import React, { useEffect, useRef, useState, Fragment } from 'react'
import Search from '../components/Search.jsx'

import { IconDotsVertical, IconPlus, IconTrash, IconX } from '@tabler/icons-react'

import { toast } from 'react-hot-toast'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function OptionsMenu({ onBtnDelete, onBtnUpdate, onBtnView }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Options
          <IconDotsVertical className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onBtnView}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm text-left w-full'
                  )}
                >
                  View
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onBtnUpdate}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm text-left w-full'
                  )}
                >
                  Update
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onBtnDelete}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm text-left w-full text-red-500'
                  )}
                >
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default function CustomersPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewCustomerModal, setShowViewCustomerModal] = useState(false);
  const [customers, setCustomers] = useState([])

  const txtCustomerNameRef = useRef(null)
  const txtCustomerPhoneRef = useRef(null)
  const txtCustomerEmailRef = useRef(null)
  const txtCustomerAddressRef = useRef(null)


  const txtViewCustomerIDRef = useRef(null)
  const txtViewCustomerNameRef = useRef(null)
  const txtViewCustomerPhoneRef = useRef(null)
  const txtViewCustomerEmailRef = useRef(null)
  const txtViewCustomerAddressRef = useRef(null)


  useEffect(() => {
    _getAllCustomers()
  }, [])

  const _getAllCustomers = async () => {
    try {
      const res = await window.api.getCustomers()
      if (res) {
        setCustomers(res)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const btnAddCustomer = () => {
    setShowAddModal(true)
  }

  const closeAddModal = () => {
    setShowAddModal(false)
  }

  const btnSaveAddModal = async () => {
    const name = txtCustomerNameRef.current.value
    const phone = txtCustomerPhoneRef.current.value
    const email = txtCustomerEmailRef.current.value
    const address = txtCustomerAddressRef.current.value

    if (!name) {
      toast.error('Please Provide Name!')
      return
    }

    if (!phone) {
      toast.error('Please Provide Phone!')
      return
    }

    try {
      const res = await window.api.addCustomer(name, email, phone, address)
      await _getAllCustomers()
      toast.success('Customer added.')
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong while saving details!')
    }

    setShowAddModal(false)
  }

  const btnDeleteCustomer = async (id) => {
    try {
      const res = await window.api.removeCustomer(id)
      await _getAllCustomers()
      toast.success('Customer Removed.')
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong while deleting!')
    }
  }

  // 
  // 
  // view customer modal
  const btnViewCustomer = (id, name, phone, email, address) => {
    txtViewCustomerIDRef.current.value = id;
    txtViewCustomerNameRef.current.value = name;
    txtViewCustomerPhoneRef.current.value = phone;
    txtViewCustomerEmailRef.current.value = email;
    txtViewCustomerAddressRef.current.value = address;
    setShowViewCustomerModal(true)
  }

  const closeViewCustomerModal = () => {
    txtViewCustomerIDRef.current.value = '';
    txtViewCustomerNameRef.current.value = '';
    txtViewCustomerPhoneRef.current.value = '';
    txtViewCustomerEmailRef.current.value = '';
    txtViewCustomerAddressRef.current.value = '';
    setShowViewCustomerModal(false)
  }

  const btnUpdateCustomer = async () => {
    const id = txtViewCustomerIDRef.current.value;
    const name = txtViewCustomerNameRef.current.value;
    const phone = txtViewCustomerPhoneRef.current.value;
    const email = txtViewCustomerEmailRef.current.value;
    const address = txtViewCustomerAddressRef.current.value;
    
    if(!id) {
      toast.error("Something went wrong! reopen the app!")
      return;
    }
    if(!name) {
      toast.error("Customer Name is mandatory!")
      return;
    }
    if(!phone) {
      toast.error("Customer Phone is mandatory!")
      return;
    }

    try {
      const res = await window.api.updateCustomer(id, name, email, phone, address);
      await _getAllCustomers()
      toast.success('Customer details updated.')
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong while saving details!')
    }

    setShowViewCustomerModal(false);
  };
  // view customer modal
  // 
  // 


  return (
    <div className="py-6">
      <div className="px-8 pb-2 flex items-center justify-end gap-4 border-b border-ipos-grey-100">
        <button
          onClick={btnAddCustomer}
          className="flex items-center gap-2 bg-ipos-blue hover:bg-indigo-700 transition text-white px-4 py-3 rounded-2xl"
        >
          <IconPlus />
          Add Customer
        </button>

        <Search />
      </div>

      <div className="w-full">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-b-ipos-grey-100">
              <th className="py-3 font-normal pl-4 text-left">#</th>
              <th className="py-3 font-normal text-left">Customer Name</th>
              <th className="py-3 font-normal text-left">Email</th>
              <th className="py-3 font-normal text-left">Phone</th>
              <th className="py-3 font-normal text-left max-w-[218px]">Address</th>
              <th className="py-3 font-normal text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr className="border-b border-b-ipos-grey-100">
              <td className="py-3 pl-4">1</td>
              <td className="py-3">Alisa Tin</td>
              <td className="py-3">alisa@mail.com</td>
              <td className="py-3">984-776-7480</td>
              <td className="py-3">3f, New BI Tower, NY, USA 30011</td>
              <td className="py-3">
                <button>
                  <IconDotsVertical />
                </button>
              </td>
            </tr> */}

            {
              customers.map((customer, index)=>{

                const id = customer.dataValues.id;
                const name = customer.dataValues.name || "";
                const phone = customer.dataValues.phone || "";
                const email = customer.dataValues.email || "";
                const address = customer.dataValues.address || "";

                return <tr key={index} className='border-b border-b-ipos-grey-100'>
                  <td className="py-3 pl-4">{id}</td>
                  <td className="py-3">{name}</td>
                  <td className="py-3">{email}</td>
                  <td className="py-3">{phone}</td>
                  <td className="py-3 max-w-[218px] overflow-hidden text-ellipsis whitespace-nowrap">{address}</td>
                  <td className="py-3">
                    <OptionsMenu 
                    onBtnDelete={()=>{
                      btnDeleteCustomer(id);
                    }} 
                    onBtnUpdate={()=>{
                      btnViewCustomer(id, name, phone, email, address);
                    }}
                    onBtnView={()=>{
                      btnViewCustomer(id, name, phone, email, address);
                    }}
                    />
                  </td>
                </tr>
              })
            }
            
          </tbody>
        </table>

        {/* pagination */}
        <div className="gap-4 flex items-center justify-end px-4 py-2 border-b border-b-ipos-grey-100 bg-white ">
          <div className="flex gap-2">
            <button className="text-sm bg-ipos-grey-50 hover:bg-ipos-grey-100 rounded-2xl w-8 h-8">
              1
            </button>
            <button className="text-sm bg-white hover:bg-ipos-grey-100 rounded-2xl w-8 h-8">
              2
            </button>
            <button className="text-sm bg-white hover:bg-ipos-grey-100 rounded-2xl w-8 h-8">
              3
            </button>
          </div>

          <p className="text-sm">Showing 5 of 40</p>

          <select className="no-drag bg-ipos-grey-50 rounded-xl px-2 py-2 outline-ipos-blue">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        {/* pagination */}
      </div>

      {/* modal */}
      <div
        className={
          showAddModal
            ? 'w-96 h-[96vh] rounded-2xl bg-white shadow-2xl fixed top-0 right-0 overflow-y-scroll px-4 py-3 mt-4 mr-4'
            : 'hidden'
        }
      >
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={closeAddModal}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-ipos-grey-50 hover:bg-ipos-grey-100 text-ipos-grey"
          >
            <IconX />
          </button>
          <h3>Add Customer</h3>
        </div>

        <div className="mt-6">
          <label htmlFor="name" className="block w-full">
            Customer Name
          </label>
          <input
            ref={txtCustomerNameRef}
            type="text"
            id="name"
            name="name"
            placeholder="Write Customer Name here..."
            className="block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue"
          />

          <label htmlFor="phone" className="mt-4 block w-full">
            Phone
          </label>
          <input
            ref={txtCustomerPhoneRef}
            type="tel"
            id="phone"
            name="phone"
            placeholder="Write Phone here..."
            className="block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue"
          />

          <label htmlFor="email" className="mt-4 block w-full">
            Email
          </label>
          <input
            ref={txtCustomerEmailRef}
            type="email"
            id="email"
            name="email"
            placeholder="Write Email here..."
            className="block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue"
          />

          <label htmlFor="address" className="mt-4 block w-full">
            Address
          </label>
          <input
            ref={txtCustomerAddressRef}
            type="text"
            id="address"
            name="address"
            placeholder="Write Address here..."
            className="block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue"
          />
        </div>

        <div className="absolute bottom-4">
          <button
            onClick={btnSaveAddModal}
            className="rounded-2xl px-4 py-3 bg-ipos-blue hover:bg-ipos-logo-color text-white"
          >
            Save
          </button>
          <button
            onClick={closeAddModal}
            className="rounded-2xl px-4 py-3 bg-ipos-grey-50 hover:bg-ipos-grey-100 text-ipos-grey ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
      {/* modal */}

      {/* view customer modal */}
      <div
        className={
          showViewCustomerModal
            ? 'w-96 rounded-2xl bg-white shadow-2xl fixed top-20 left-2/4 -translate-x-1/4 overflow-y-scroll px-4 py-3 mt-4 mr-4'
            : 'hidden'
        }
      >
        <input type="hidden" ref={txtViewCustomerIDRef} />
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={closeViewCustomerModal}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-ipos-grey-50 hover:bg-ipos-grey-100 text-ipos-grey"
          >
            <IconX />
          </button>
          <h3>Customer Details</h3>
        </div>

        <div className="mt-6">
          <label htmlFor="name" className="block w-full">
            Customer Name
          </label>
          <input
            ref={txtViewCustomerNameRef}
            type="text"
            id="name"
            name="name"
            placeholder="Write Customer Name here..."
            className="block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue"
          />

          <label htmlFor="phone" className="mt-4 block w-full">
            Phone
          </label>
          <input
            ref={txtViewCustomerPhoneRef}
            type="tel"
            id="phone"
            name="phone"
            placeholder="Write Phone here..."
            className="block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue"
          />

          <label htmlFor="email" className="mt-4 block w-full">
            Email
          </label>
          <input
            ref={txtViewCustomerEmailRef}
            type="email"
            id="email"
            name="email"
            placeholder="Write Email here..."
            className="block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue"
          />

          <label htmlFor="address" className="mt-4 block w-full">
            Address
          </label>
          <textarea
            ref={txtViewCustomerAddressRef}
            type="text"
            id="address"
            name="address"
            placeholder="Write Address here..."
            className="block w-full h-36 px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue"
          />
        </div>
        <div className="mt-6">
          <button
            onClick={btnUpdateCustomer}
            className="rounded-2xl px-4 py-3 bg-ipos-blue hover:bg-ipos-logo-color text-white"
          >
            Save
          </button>
          <button
            onClick={closeViewCustomerModal}
            className="rounded-2xl px-4 py-3 bg-ipos-grey-50 hover:bg-ipos-grey-100 text-ipos-grey ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
      {/* view customer modal */}
    </div>
  )
}
