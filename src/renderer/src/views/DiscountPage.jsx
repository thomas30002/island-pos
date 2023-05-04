import React, { useEffect, useRef, useState } from 'react'
import Search from '../components/Search.jsx'
import { IconPlus, IconTrash, IconX, IconDotsVertical } from '@tabler/icons-react'
import { toast } from 'react-hot-toast'
import {DISCOUNT_TYPE} from '../config/discountType.config.js'

export default function DiscountPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [discounts, setDiscountes] = useState([])

  const txtDiscountCodeRef = useRef(null)
  const txtDiscountValueRef = useRef(null)
  const txtDiscountTypeRef = useRef(null)

  useEffect(() => {
    _getAllDiscounts()
  }, [])

  const _getAllDiscounts = async () => {
    try {
      const res = await window.api.getDiscounts()
      setDiscountes(res)
    } catch (error) {
      console.log(error)
    }
  }

  const btnAddDiscount = () => {
    setShowAddModal(true)
  }

  const closeAddModal = () => {
    setShowAddModal(false)
  }

  const btnSaveAddModal = async () => {
    const discountCode = txtDiscountCodeRef.current.value
    const discountValue = txtDiscountValueRef.current.value
    const discountType = txtDiscountTypeRef.current.value

    if (!discountCode) {
      toast.error('Please Provide Discount Code!')
      return
    }

    if (!discountValue) {
      toast.error('Please Provide Discount Value!')
      return
    }

    try {
      const res = await window.api.addDiscount(discountCode, discountValue, discountType)
      await _getAllDiscounts()
      toast.success('Discount added.')
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong while saving details!')
    }

    setShowAddModal(false)
  }

  return (
    <div className="py-6">
      <div className="px-8 pb-2 flex items-center justify-end gap-4 border-b border-ipos-grey-100">
        <button
          onClick={btnAddDiscount}
          className="flex items-center gap-2 bg-ipos-blue hover:bg-indigo-700 transition text-white px-4 py-3 rounded-2xl"
        >
          <IconPlus />
          Add Discount
        </button>

        <Search />
      </div>

      <div className="w-full">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-b-ipos-grey-100">
              <th className="py-3 pl-4 text-left">#</th>
              <th className="py-3 text-left">Discount Name</th>
              <th className="py-3 text-left">Value</th>
              <th className="py-3 text-left">Type</th>
              <th className="py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr className='border-b border-b-ipos-grey-100'>
              <td className='py-3 pl-4'>1</td>
              <td className='py-3'>500RS</td>
              <td className='py-3'>500₹</td>
              <td className='py-3'>Amount</td>
              <td className='py-3'>
                <button>
                  <IconDotsVertical />
                </button>
              </td>
            </tr>
            <tr className='border-b border-b-ipos-grey-100'>
              <td className='py-3 pl-4'>2</td>
              <td className='py-3'>DISC50</td>
              <td className='py-3'>50%</td>
              <td className='py-3'>Percentage</td>
              <td className='py-3'>
                <button>
                  <IconDotsVertical />
                </button>
              </td>
            </tr> */}
            {discounts.map((discount, index) => {
              const discountCode = discount.dataValues.discountCode;
              const discountValue =  discount.dataValues.discountValue;
              const discountType =  discount.dataValues.discountType;
              return (
                <tr key={index} className="border-b border-b-ipos-grey-100">
                  <td className="py-3 pl-4">{index+1}</td>
                  <td className="py-3">{discountCode}</td>
                  <td className="py-3">
                    {
                      discountType === DISCOUNT_TYPE.FIXED ? `${discountValue}₹`:`${discountValue}%`
                    }
                  </td>
                  <td className="py-3">{discountType}</td>
                  <td className="py-3">
                    <button>
                      <IconDotsVertical />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
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
          <h3>Add Tax</h3>
        </div>

        <div className="mt-6">
          <label htmlFor="code" className="block w-full">
            Discount Code
          </label>
          <input
            ref={txtDiscountCodeRef}
            type="text"
            id="code"
            name="code"
            placeholder="Write Discount Code here..."
            className="block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue"
          />

          <label htmlFor="discountValue" className="mt-4 block w-full">
            Discount Value
          </label>
          <input
            ref={txtDiscountValueRef}
            type="number"
            min="0"
            id="discountValue"
            name="discountValue"
            placeholder="Write Discount Value here..."
            className="block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue"
          />

          <label htmlFor="type" className="block w-full mt-4">
            Type
          </label>
          <select
            ref={txtDiscountTypeRef}
            id="type"
            name="type"
            placeholder="Select Discount Type here..."
            className="block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue"
          >
            <option value="FIXED">Fixed</option>
            <option value="PERCENTAGE">Percentage</option>
          </select>
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
