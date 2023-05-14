import React, {Fragment, useEffect, useRef, useState} from 'react'
import Search from '../components/Search.jsx'
import { IconCategory2, IconDotsCircleHorizontal, IconDotsVertical, IconDownload, IconFileImport, IconPencil, IconPhoto, IconPlus, IconQrcode, IconTrash, IconUpload, IconX } from '@tabler/icons-react'

import { Menu, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { CURRENCIES } from "../config/currencies.config.js";
import { toast } from 'react-hot-toast'
import { blobToBase64 } from '../utils/blobToBase64.js'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function OptionsMenu({onBtnPrintQR, onBtnExport, onBtnImport}) {
  return <Menu as="div" className="relative inline-block text-left">
  <div>
    <Menu.Button className="flex items-center gap-2 bg-ipos-grey-50 hover:bg-ipos-grey-100 transition text-ipos-grey px-4 py-3 rounded-2xl">
      <IconDotsCircleHorizontal />
      Options
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
            onClick={onBtnPrintQR}
              className={classNames(
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'flex items-center gap-2 px-4 py-2 text-sm text-left w-full'
              )}
            >
              <IconQrcode />
              <p>Print QR</p>
            </button>
          )}
        </Menu.Item>
      </div>
      <div className="py-1">
        <Menu.Item>
          {({ active }) => (
            <button
            onClick={onBtnImport}
              className={classNames(
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'flex items-center gap-2 px-4 py-2 text-sm text-left w-full'
              )}
            >
              <IconFileImport />
              <p>Import</p>
            </button>
          )}
        </Menu.Item>
      </div>
      <div className="py-1">
        <Menu.Item>
          {({ active }) => (
            <button
            onClick={onBtnExport}
              className={classNames(
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'flex items-center gap-2 px-4 py-2 text-sm text-left w-full'
              )}
            >
              <IconDownload />
              <p>Export</p>
            </button>
          )}
        </Menu.Item>
      </div>
    </Menu.Items>
  </Transition>
</Menu>;
}

function ProductOptionsMenu({ onBtnDelete, onBtnUpdate, onBtnView }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center rounded-md bg-white px-3 py-2 ">
          <IconDotsVertical className="h-5 w-5" aria-hidden="true" />
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


export default function ProductsPage() {
  // get currency
  const currencyCode = window.api.getCurrency();
  const currencyFind =  CURRENCIES.find(c=>c.cc == currencyCode);
  const currencySymbol = currencyFind !== undefined ? currencyFind.symbol : '';
  // get currency

  const [showAddModal, setShowAddModal] = useState(false)
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [productImage, setProductImage] = useState('');

  const navigate = useNavigate();

  const txtProductTitleRef = useRef(null)
  const txtProductPriceRef = useRef(null)
  const txtProductCostRef = useRef(null)
  const txtProductSKURef = useRef(null)
  const txtProductBarcodeRef = useRef(null)
  const txtProductSoldByRef = useRef(null)
  const txtProductCategoryRef = useRef(null)


  const txtUpdateProductTitleRef = useRef(null)
  const txtUpdateProductPriceRef = useRef(null)
  const txtUpdateProductCostRef = useRef(null)
  const txtUpdateProductSKURef = useRef(null)
  const txtUpdateProductBarcodeRef = useRef(null)
  const txtUpdateProductSoldByRef = useRef(null)
  const txtUpdateProductCategoryRef = useRef(null)

  

  useEffect(() => {
    _getAllCategories()
    _getAllProducts();
  }, [])

  const _getAllCategories = async () => {
    try {
      const res = await window.api.getCategories()
      console.log(res)
      setCategories(res)
    } catch (error) {
      console.log(error)
    }
  };

  const _getAllProducts = async () => {
    try {
      const res = await window.api.getProducts()
      console.log(res)
      setProducts(res)
    } catch (error) {
      console.log(error)
    }
  };

  const onBtnPrintQR = async () => {

  };

  const onBtnExport = async () => {

  };

  const onBtnImport = async () => {

  };

  const btnCategoriesTap = () => {
    navigate('/categories');
  };

  const btnAddProduct = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false)
  }

  const btnEditProductImage = async () => {
    const imageCompression = await import('browser-image-compression');
    

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.addEventListener("change", async (e)=>{
      // handle file
      const imageFile = e.target.files[0];

      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 256,
        useWebWorker: true
      };

      try {
        const compressedFile = await imageCompression.default(imageFile, options);
        // const url = URL.createObjectURL(compressedFile);
        const url = await blobToBase64(compressedFile);

        setProductImage(url);
      } catch (error) {
        console.log(error);
      }

    });

    input.click();
  };

  const btnRemoveProductImage = () => {
    setProductImage(null);
  };

  const btnSaveAddModal = async () => {
    const name = txtProductTitleRef.current.value
    const price = txtProductPriceRef.current.value
    const cost = txtProductCostRef.current.value
    const category = txtProductCategoryRef.current.value;
    const sku = txtProductSKURef.current.value;
    const barcode = txtProductBarcodeRef.current.value;
    const soldBy = txtProductSoldByRef.current.value;

    const image = productImage;

    if (!name) {
      toast.error('Please Provide Name!')
      return
    }

    if (!price) {
      toast.error('Please Provide Price!')
      return
    }

    if(!category) {
      toast.error("Please select Category \nor Create New Category to add products!");
      return;
    }

    try {
      const res = await window.api.addProduct(name, parseFloat(price), parseFloat(cost), sku, barcode, soldBy, image, category);
      await _getAllProducts()
      toast.success('Product added.')
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong while saving details!')
    }

    setShowAddModal(false)
  }

  const btnDeleteProduct = async id => {
    try {
      const res = await window.api.removeProduct(id)
      await _getAllProducts()
      toast.success('Product Removed.')
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong while deleting!')
    }
  };

  return (
    <div className='py-6'>
      <div className="px-8 pb-2 flex flex-wrap items-center justify-end gap-4 border-b border-ipos-grey-100">
        <button onClick={btnAddProduct} className='flex items-center gap-2 bg-ipos-blue hover:bg-indigo-700 transition text-white px-4 py-3 rounded-2xl'>
          <IconPlus />
          Add Product
        </button>

        <button onClick={btnCategoriesTap} className='flex items-center gap-2 bg-ipos-grey-50 hover:bg-ipos-grey-100 transition text-ipos-grey px-4 py-3 rounded-2xl'>
          <IconCategory2 />
          Categories
        </button>

        <OptionsMenu onBtnPrintQR={onBtnPrintQR} onBtnExport={onBtnExport} onBtnImport={onBtnImport} />

        <Search />
      </div>

      <div className="w-full">
        <table className='w-full border-collapse overflow-x-scroll'>
          <thead>
            <tr className='border-b border-b-ipos-grey-100'>
              <th className='py-3 font-normal pl-4 text-left'>#</th>
              <th className='py-3 font-normal text-left'>Image</th>
              <th className='py-3 font-normal text-left'>Product Name</th>
              <th className='py-3 font-normal text-left'>Price</th>
              <th className='py-3 font-normal text-left'>Cost</th>
              <th className='py-3 font-normal text-left'>Category</th>
              <th className='py-3 font-normal text-left'>SKU</th>
              <th className='py-3 font-normal text-left'>Barcode</th>
              <th className='py-3 font-normal text-left'>Sold by (Weight/Each)</th>
              <th className='py-3 font-normal text-left'>Action</th>
            </tr>
          </thead>
          <tbody>

            {
              products.map((product, index)=>{
                const id = product.dataValues.id;
                const name = product.dataValues.name;
                const price = product.dataValues.price;
                const cost = product.dataValues.cost;
                const category = product.Category?.dataValues?.name || "";
                const sku = product.dataValues.sku;
                const barcode = product.dataValues.barcode;
                const soldBy = product.dataValues.soldBy;

                const productImage = product.dataValues.image;

                return <tr className='border-b border-b-ipos-grey-100' key={index}>
                  <td className='py-3 pl-4'>{index+1}</td>
                  <td className='py-3'>
                    {
                      productImage !== undefined && productImage !== null && productImage !== "" 
                      ? <img src={productImage} alt="product img" className='w-16 h-16 rounded-2xl object-cover' /> 
                      : <div className='w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-100 text-gray-400'>
                        {name[0].toUpperCase()}.
                      </div>
                    }
                  </td>
                  <td className='py-3'>{name}</td>
                  <td className='py-3'>{currencySymbol}{price}</td>
                  <td className="py-3">{currencySymbol}{cost}</td>
                  <td className="py-3">{category}</td>
                  <td className="py-3">{sku}</td>
                  <td className="py-3">{barcode}</td>
                  <td className="py-3">{soldBy}</td>
                  <td className='py-3'>
                    <ProductOptionsMenu 
                      onBtnDelete={()=>{
                        btnDeleteProduct(id);
                      }} 
                      onBtnUpdate={()=>{}} 
                      onBtnView={()=>{}}  
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
          <button className='text-sm bg-ipos-grey-50 hover:bg-ipos-grey-100 rounded-2xl w-8 h-8'>1</button>
          <button className='text-sm bg-white hover:bg-ipos-grey-100 rounded-2xl w-8 h-8'>2</button>
          <button className='text-sm bg-white hover:bg-ipos-grey-100 rounded-2xl w-8 h-8'>3</button>
        </div>

        <p className='text-sm'>Showing 5 of 40</p>

        <select className='no-drag bg-ipos-grey-50 rounded-xl px-2 py-2 outline-ipos-blue'>
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
          <h3>Add Product</h3>
        </div>

        <div className="mt-6">

          <div className=' w-full flex flex-col items-center justify-center mt-8'>
            <div className='relative w-32 h-32 bg-ipos-grey-50 rounded-2xl flex items-center justify-center'>
              
              {
                productImage !== undefined && productImage !== '' && productImage !== null ? 
                  <img src={productImage} alt="logo" className='w-32 h-32 object-cover rounded-2xl' />
                :
                <IconPhoto className='text-ipos-grey' />
              }

              {
                productImage !== undefined && productImage !== '' && productImage !== null ? 
                <button onClick={btnRemoveProductImage} className='absolute -top-4 -right-4 w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 transition text-red-600  items-center justify-center flex'>
                <IconTrash />
              </button>
                :
                <button onClick={btnEditProductImage} className="transition bg-white hover:bg-ipos-grey-100 shadow-lg rounded-full absolute -bottom-4 flex items-center justify-center w-8 h-8 ">
                  <IconUpload />
                </button>
              }

              
            </div>
            <p className='mt-4'>Product Image</p>
          </div>


          <label htmlFor="name" className="mt-4 block w-full">
            Product Title
          </label>
          <input
            ref={txtProductTitleRef}
            type="text"
            id="name"
            name="name"
            placeholder="Write Customer Name here..."
            className="block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue"
          />

          <label htmlFor="price" className="mt-4 block w-full">
            Price
          </label>
          <input
            ref={txtProductPriceRef}
            type="number"
            id="price"
            name="price"
            placeholder="Write Price here..."
            min="0"
            className="block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue"
          />

          <label htmlFor="cost" className="mt-4 block w-full">
            Cost
          </label>
          <input
            ref={txtProductCostRef}
            type="number"
            id="cost"
            name="cost"
            min="0"
            placeholder="Write Cost here..."
            className="block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue"
          />

          <label htmlFor="category" className="mt-4 block w-full">
            Category
          </label>
          <select
            ref={txtProductCategoryRef}
            id="category"
            name="category"
            placeholder="Select Category here..."
            className="block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue"
          >
            <option value="">Select Category</option>
            {categories.map((category, index)=>{
              const id = category.dataValues.id;
              const name = category.dataValues.name;

              return <option value={id} key={index}>{name}</option>
            })}
          </select>

          <label htmlFor="sku" className="mt-4 block w-full">
            SKU
          </label>
          <input
            ref={txtProductSKURef}
            type="text"
            id="sku"
            name="sku"
            placeholder="Write SKU here..."
            className="block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue"
          />

          <label htmlFor="Barcode" className="mt-4 block w-full">
            Barcode
          </label>
          <input
            ref={txtProductBarcodeRef}
            type="text"
            id="Barcode"
            name="Barcode"
            placeholder="Write Barcode here..."
            className="block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue"
          />

          <label htmlFor="soldby" className="mt-4 block w-full">
            Sold By
          </label>
          <select
            ref={txtProductSoldByRef}
            id="soldby"
            name="soldby"
            placeholder="Select Soldby here..."
            className="block w-full px-4 py-3 bg-ipos-grey-50 rounded-2xl mt-1 outline-ipos-blue"
          >
            <option value="each">Each</option>
            <option value="weight">Weight</option>
          </select>

        </div>

        <div className="mt-6">
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
