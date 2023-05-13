import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

import { IconChevronLeft, IconPlus, IconTrash, IconX } from '@tabler/icons-react'

export default function CategoriesPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [categories, setCategories] = useState([])
  const txtCategoryRef = useRef(null)

  useEffect(() => {
    _getAllCategories()
  }, [])

  const _getAllCategories = async () => {
    try {
      const res = await window.api.getCategories()
      console.log(res)
      setCategories(res)
    } catch (error) {
      console.log(error)
    }
  }

  const btnAddCategory = () => {
    setShowAddModal(true)
  }

  const closeAddModal = () => {
    setShowAddModal(false)
  }

  const btnSaveAddModal = async () => {
    const category = txtCategoryRef.current.value

    if (!category) {
      toast.error('Please Provide Category Title!')
      return
    }

    try {
      const res = await window.api.addCategory(category)
      await _getAllCategories()
      toast.success('Category added.')
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong while saving details!')
    }

    setShowAddModal(false)
  }

  const btnRemoveCategory = async (id) => {
    try {
      const res = await window.api.removeCategory(id)
      await _getAllCategories()
      toast.success('Category removed.')
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong while saving details!')
    }
  }

  const btnBackTap = () => {
    history.back()
  }

  return (
    <div className="py-6">
      <div className="px-4 pb-4 flex flex-wrap items-center gap-4 border-b border-ipos-grey-100">
        <button
          onClick={btnBackTap}
          className="flex items-center gap-2 bg-ipos-grey-50 hover:bg-ipos-grey-100 transition text-ipos-grey px-4 py-3 rounded-2xl"
        >
          <IconChevronLeft />
          Back
        </button>
        <button
          onClick={btnAddCategory}
          className="flex items-center gap-2 bg-ipos-blue hover:bg-indigo-700 transition text-white px-4 py-3 rounded-2xl"
        >
          <IconPlus />
          Add Category
        </button>
      </div>

      <div className="px-8 mt-8 w-full flex flex-col divide-y gap-4">
        {categories.map((category,index)=>{
          const id = category.dataValues.id;
          const name = category.dataValues.name;
          return (
            <div key={index} className="pt-3 flex items-center justify-between">
              <p>{index+1}. {name}</p>
              <button onClick={()=>{
                btnRemoveCategory(id)
              }} className='text-red-500 hover:text-red-400'>
                <IconTrash />
              </button>
            </div>
          )
        })}
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
          <h3>Add Category</h3>
        </div>

        <div className="mt-6">
          <label htmlFor="name" className="block w-full">
            Name
          </label>
          <input
            ref={txtCategoryRef}
            type="text"
            id="name"
            name="name"
            placeholder="Write Category Title here..."
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
