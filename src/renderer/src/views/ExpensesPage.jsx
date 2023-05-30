import React, { useEffect, useRef, useState, Fragment }  from 'react'
import Search from '../components/Search.jsx'
import { IconDotsVertical, IconPlus, IconTrash, IconX } from '@tabler/icons-react'

import { toast } from 'react-hot-toast'
import { CURRENCIES } from "../config/currencies.config.js";
import { Menu, Transition } from '@headlessui/react'
import DataTable from 'react-data-table-component';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function OptionsMenu({onBtnDelete}) {
  return <Menu as="div" className="relative inline-block text-left">
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
            onClick={onBtnDelete}
              className={classNames(
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm text-left w-full'
              )}
            >
              Delete
            </button>
          )}
        </Menu.Item>
      </div>
    </Menu.Items>
  </Transition>
</Menu>;
}

export default function ExpensesPage() {

  const [showAddModal, setShowAddModal] = useState(false)
  const [expenses, setExpenses] = useState([]);

  const txtExpenseNameRef = useRef(null)
  const txtExpenseAmountRef = useRef(null)
  const txtExpenseDateRef = useRef(null)
  const txtExpenseNoteRef = useRef(null)


  // get currency
  const currencyCode = window.api.getCurrency();
  const currencyFind =  CURRENCIES.find(c=>c.cc == currencyCode);
  const currencySymbol = currencyFind !== undefined ? currencyFind.symbol : '';
  // get currency

  useEffect(() => {
    _getAllExpenses()
  }, [])

  const _getAllExpenses = async () => {
    try {
      const res = await window.api.getExpenses()
      if(res) {
        setExpenses(res)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const btnAddExpense = () => {
    setShowAddModal(true)
  }

  const closeAddModal = () => {
    setShowAddModal(false)
  }

  const btnSaveAddModal = async () => {
    const name = txtExpenseNameRef.current.value
    const amount = txtExpenseAmountRef.current.value
    const date = txtExpenseDateRef.current.value
    const notes = txtExpenseNoteRef.current.value

    if (!name) {
      toast.error('Please Provide Expense Name!')
      return
    }

    if (!amount) {
      toast.error('Please Provide amount!')
      return
    }

    if(!date) {
      toast.error('Please Provide date!')
      return
    }

    try {
      const res = await window.api.addExpense(name, amount, date, notes);
      await _getAllExpenses()
      toast.success('Expesnse added.')
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong while saving details!')
    }

    setShowAddModal(false)
  }

  const btnDeleteExpense = async id => {
    try {
      const res = await window.api.removeExpense(id);
      await _getAllExpenses();
      toast.success("Expense Removed.");
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong while deleting!')
    }
  };


  // data table
  const columns = [
    {
      name: "#",
      selector: row => row.dataValues.id,
      width: "130px"
    },
    {
      name: "Expense Name",
      selector: row => row.dataValues.name,
      width: "290px"
    },
    {
      name: "Amount",
      selector: row => row.dataValues.amount,
      format: (row, index) => `${currencySymbol}${row.dataValues.amount}`
    },
    {
      name: "Date",
      selector: row => new Date(row.dataValues.date).toLocaleString(),
    },
    {
      name: "Notes",
      selector: row => row.dataValues.notes,
      sortable: false,
      grow: 2
    },
    {
      name: "Actions",
      sortable: false,
      cell: (row, index, column, id) => {
        return <OptionsMenu onBtnDelete={()=>{
          btnDeleteExpense(row.dataValues.id);
        }} />;
      }
    }
  ];
  // data table

  return (
    <div className='py-6'>
      <div className="px-8 pb-2 flex items-center justify-end gap-4 border-b border-ipos-grey-100">
        <button 
          onClick={btnAddExpense}
          className='flex items-center gap-2 bg-ipos-blue hover:bg-indigo-700 transition text-white px-4 py-3 rounded-2xl'>
          <IconPlus />
          Add Expense
        </button>

        <Search />
      </div>

      <div className="w-full">
       
        <DataTable columns={columns} data={expenses} pagination responsive  />

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
          <h3>Add Expense</h3>
        </div>

        <div className="mt-6">
          <label htmlFor="name" className="block w-full">
            Expense Name
          </label>
          <input
            ref={txtExpenseNameRef}
            type="text"
            id="name"
            name="name"
            placeholder="Write Expense Name here..."
            className="block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue"
          />

          <label htmlFor="expenseAmount" className="mt-4 block w-full">
            Expense Amount
          </label>
          <input
            ref={txtExpenseAmountRef}
            type="number"
            min="0"
            id="expenseAmount"
            name="expenseAmount"
            placeholder="Write Expense Amount here..."
            className="block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue"
          />

<label htmlFor="expenseDate" className="mt-4 block w-full">
            Date
          </label>
          <input
            ref={txtExpenseDateRef}
            type="date"
            id="expenseDate"
            name="expenseDate"
            placeholder="Select Expense Date here..."
            className="block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue"
          />

<label htmlFor="notes" className="mt-4 block w-full">
            Notes (optional)
          </label>
          <input
            ref={txtExpenseNoteRef}
            type="text"
            id="notes"
            name="notes"
            placeholder="Write Expense Note here..."
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

    </div>
  )
}
