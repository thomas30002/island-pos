import React, { useEffect, useRef, useState } from "react";
import { IconArrowBackUp, IconClearAll, IconDiscount2, IconFilter, IconMinus, IconPencil, IconPlus, IconReceipt, IconSearch, IconTrash, IconUserSearch, IconX } from "@tabler/icons-react";

import { toast } from 'react-hot-toast'
import { CURRENCIES } from "../config/currencies.config.js";
import { playTapSound } from "../utils/playTapSound.js";
import { Autocomplete } from "@mui/material";
import { DISCOUNT_TYPE } from "../config/discountType.config.js";
import { calculatePriceAfterTax, calculateTax } from "../utils/calculateTax.js";
import { TAX_TYPES } from "../config/taxType.config.js";
import { CUSTOMER_TYPE } from "../config/customerType.config.js";

export default function POSPage() {

  // get currency
  const currencyCode = window.api.getCurrency();
  const currencyFind =  CURRENCIES.find(c=>c.cc == currencyCode);
  const currencySymbol = currencyFind !== undefined ? currencyFind.symbol : '';
  // get currency

  
  const [state, setState] = useState({
    products: [],
    categories: [],
    category: '',
    customers: [],
    customerList: [],
    selectedCustomer: null,
    discount: 0,
    discountCode: null,
    paymentTypes: [],
    showPaymentMethodModal: false,
    cart: [],
    showSearchModal: false,
  });

  const [searchValue, setSearchValue] = useState("");

  const [showEditCartItemQuantity, setShowEditCartItemQuantity] = useState(false);
  const [showApplyDiscountModal, setShowApplyDiscountModal] = useState(false);
  const [showCategoryFilterModal, setShowCategoryFilterModal] = useState(false);
  const txtEditCartItemIDRef = useRef(null);
  const txtEditCartItemQuantityRef = useRef(null);

  const printInvoiceChkRef = useRef(null);
  const paymentTypeRef = useRef(null);

  const { products, categories, category, customers, selectedCustomer, customerList, cart, discount, discountCode, paymentTypes, showPaymentMethodModal, showSearchModal } = state;

  const netTotal = cart.reduce((pV, cV, index, arr)=>{
    let itemTotal = 0;

    if(cV.taxType == TAX_TYPES.EXCLUSIVE) {
      itemTotal = (cV.price * cV.quantity);
    } else if (cV.taxType == TAX_TYPES.INCLUSIVE) {
      itemTotal = (cV.price - cV.tax) * cV.quantity;
    } else {
      itemTotal = (cV.price * cV.quantity);
    }

    return pV+itemTotal;
  }, 0);

  const taxTotal = cart.reduce((pV, cV, index, arr)=>{
    return pV+(cV.tax * cV.quantity);
  }, 0);

  const payableTotal = netTotal + taxTotal - discount;

  // cart total

  useEffect(() => {
    _initPOS();
  }, [])

  const _initPOS = async () => {
    try {
      const categoriesResponse = await window.api.getCategories()
      const productsResponse = await window.api.getProducts()
      const customersResponse = await window.api.getCustomers()

      const paymentTypesResponse = await window.api.getPaymentTypes();

      const customersOptions = [];
      customersOptions.push({id: "walk-in",label: "Walk In Customer"});

      if(customersResponse) {
        customersResponse.forEach((customer)=>{
          customersOptions.push({
            id: customer.dataValues.id,
            label: `${customer.dataValues.name} (${customer.dataValues.phone})`
          });
        })
      }

      setState({
        ...state,
        products: productsResponse,
        categories: categoriesResponse,
        customers: customersResponse,
        customerList: customersOptions,
        selectedCustomer: customersOptions[0],
        paymentTypes: paymentTypesResponse
      });
    } catch (error) {
      console.error(error);
    }
  };


  const btnPOSItemTap = async ({id, name, price, tax, priceAfterTax, taxType}) => {
    playTapSound();

    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === id);
    const newCart = cart;
    if(existingItemIndex === -1) {
      // item not found
      newCart.push({id, name, price, quantity: 1, tax, priceAfterTax, taxType});
      setState({
        ...state,
        cart: newCart,
      });
      return;
    }

    newCart[existingItemIndex].quantity = newCart[existingItemIndex].quantity + 1;
    setState({
      ...state,
      cart: newCart,
    });
    return;
  }
  


  // cart
  const btnRemoveCartItem = index => {
    const newCart = cart.filter((v,i)=> i !== index);
    setState({
      ...state,
      cart: newCart,
    })
  }
  const btnClearCart = () => {
    setState({
      ...state,
      cart: []
    });
  }
  const btnCartCheckout = () => {
    openPaymentMethodModal();
  };

  const openPaymentMethodModal = () => {
    setState({
      ...state,
      showPaymentMethodModal: true,
    })
  }
  const closePaymentMethodModal = () => {
    setState({
      ...state,
      showPaymentMethodModal: false,
    })
  }
  const btnCreateSale = async () => {
    const printInvoice = printInvoiceChkRef.current.checked;
    const paymentTypeId = parseInt(paymentTypeRef.current.value) || null;

    try {

      const cartProducts = cart.map((cartItem, index)=>{
        return {id: cartItem.id, quantity: cartItem.quantity, price: cartItem.priceAfterTax, name: cartItem.name};
      });
      
      // customerType, cartTotal, taxTotal, payableTotal, discountValue, isDiscountApplied, CustomerId, PaymentTypeId, DiscountId, products

      const customerType = selectedCustomer.id === 'walk-in' ? CUSTOMER_TYPE.WALKIN : CUSTOMER_TYPE.CUSTOMER;
      const customerId = selectedCustomer.id === 'walk-in' ? null : selectedCustomer.id;

      const res = await window.api.addSale(customerType, netTotal, taxTotal, payableTotal, discount, discount !== 0, customerId, paymentTypeId, discountCode, cartProducts);

      const saleId = res.dataValues.id;

      toast.success(`Sale: ${saleId} created.`);
      
      if(printInvoice) {
        //TODO: print invoice, open new window with the invoice design and run window.print to open print dialog.
        
      }

      // clear cart and dismiss popup
      setState({
        ...state,
        cart: [],
        discount: 0,
        discountCode: null,
        showPaymentMethodModal: false,
      });

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };
  // cart


  // modal: cart item quantity edit
  const btnShowEditCartQuantityModal = (itemId, itemQuantity) => {
    txtEditCartItemIDRef.current.value = itemId;
    txtEditCartItemQuantityRef.current.value = itemQuantity;
    setShowEditCartItemQuantity(true);
  }
  const btnCloseEditCartQuantityModal = () => {
    txtEditCartItemIDRef.current.value = null;
    txtEditCartItemQuantityRef.current.value = null;
    setShowEditCartItemQuantity(false);
  }
  const btnEditCartQuantityPlus = () => {
    let currentQty = parseInt(txtEditCartItemQuantityRef.current.value) || 0;
    currentQty += 1;
    txtEditCartItemQuantityRef.current.value = currentQty;
  };
  const btnEditCartQuantityMinus = () => {
    let currentQty = parseInt(txtEditCartItemQuantityRef.current.value) || 0;
    if(currentQty != 0) {
      currentQty -= 1;
    }
    txtEditCartItemQuantityRef.current.value = currentQty;
  };
  const btnEditCartQuantityModalSave = () => {
    const itemId = txtEditCartItemIDRef.current.value
    const qty = parseInt(txtEditCartItemQuantityRef.current.value) || 0;
    
    if(qty > 0) {
      const itemIndex = cart.findIndex((v, i)=>v.id == itemId);

      const newCart = cart;
      newCart[itemIndex].quantity = qty;

      setState({
        ...state,
        cart: newCart,
      });

      btnCloseEditCartQuantityModal();
      return;
    } else {
      const newCart = cart.filter((v,i)=> v.id != itemId);
      setState({
        ...state,
        cart: newCart,
      });
      btnCloseEditCartQuantityModal();
      return;
    }
  };
  // modal: cart item quantity edit



  // discount
  const handleApplyDiscountFormSubmit = async e => {
    e.preventDefault();

    const discountCode = e.target.discountCode.value;
    
    if(!discountCode) {
      toast.error("Please provide Disocunt Code!");
      return;
    }

    try {
      const res = await window.api.getDiscount(discountCode);
      console.log(res);

      if(res === null) {
        toast.error("Discount Code is Invalid!");
        return;
      } 

      const discountValue = res.dataValues.discountValue;
      const discountType = res.dataValues.discountType;

      if(discountType == DISCOUNT_TYPE.FIXED) {
        setState({
          ...state,
          discount: discountValue,
          discountCode: discountCode,
        });
        closeApplyDiscountModal();
      } else if (discountType == DISCOUNT_TYPE.PERCENTAGE) {

        const discountAmount = Math.round((netTotal * discountValue) / 100);
        setState({
          ...state,
          discount: discountAmount,
          discountCode: discountCode,
        });
        closeApplyDiscountModal();
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }
  const openApplyDiscountModal = () => {
    setShowApplyDiscountModal(true);
  };
  const closeApplyDiscountModal = (e) => {
    // e.preventDefault();
    setShowApplyDiscountModal(false);
  };
  const btnRemoveDiscount = () => {
    setState({
      ...state,
      discount: 0,
      discountCode: null,
    })
  };
  // discount


  // filter
  const onSelectedCategoryChange = e => {
    setState({
      ...state,
      category: e.target.value,
    })
  };
  const clearCategoryFilter = () => {
    setState({
      ...state,
      category: '',
    });
    closeCategoryFilterModal();
  }
  const openCategoryFilterModal = () => {
    setShowCategoryFilterModal(true);
  };
  const closeCategoryFilterModal = () => {
    setShowCategoryFilterModal(false);
  }
  // filter


  // product search filter
  const productSearchFilter = (product)=>{
    const id = product.dataValues.id;
    const name = product.dataValues.name;
    const category = product.Category?.dataValues?.name || "";
    const sku = product.dataValues.sku;
    const barcode = product.dataValues.barcode;

    if(searchValue == "") {
      return false;
    }
    if(searchValue.startsWith("#")) {
      const searchId = parseInt(searchValue.replace("#", ""));
      if(!searchId) {
        return true;
      }
      return id == searchId;
    }
    if(String(name).toLowerCase().includes(searchValue.toLowerCase()) || String(category).toLowerCase().includes(searchValue.toLowerCase()) || String(sku).toLowerCase().includes(searchValue.toLowerCase()) || String(barcode).toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
  };
  const openProductSearchModal = () => {
    setState({
      ...state,
      showSearchModal: true,
    });
  }
  const closeProductSearchModal = () => {
    setState({
      ...state,
      showSearchModal: false,
    });
  }
  // product search filter

  return (
    <div className="px-8 py-6 w-full flex gap-6">
      {/* all items */}
      <div className="border rounded-2xl w-[70%] h-[95vh] p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">All Items</h3>

          <div className="flex items-center gap-4">
            <button onClick={openCategoryFilterModal}>
              <IconFilter />
            </button>
            <button onClick={openProductSearchModal}>
              <IconSearch />
            </button>
          </div>
        </div>

        {/* products */}
        <div className="grid grid-cols-3 xl:grid-cols-4 mt-4 w-full h-[95%] overflow-y-scroll gap-4">
          {
            products
            .filter((product)=>{
              const CategoryId = product.dataValues.CategoryId;
              if(category == "") {
                return true;
              } else {
                return CategoryId == category;
              }
            })
            .map((product, index)=>{

              const id = product.dataValues.id;
              const name = product.dataValues.name;
              const price = product.dataValues.price;
              const productImage = product.dataValues.image;

              // price + tax
              const taxRate = product?.Tax?.dataValues?.taxRate || 0;
              const taxType = product?.Tax?.dataValues?.type || null;

              const calculatedTax = calculateTax(price, taxRate, taxType);
              const priceAfterTax = calculatePriceAfterTax(price, taxRate, taxType);
              // price + tax

              return <button className="block w-full h-52" key={index} onClick={()=>{
                btnPOSItemTap({id: id, name, price:price, tax: calculatedTax, priceAfterTax: priceAfterTax, taxType});
              }}>
                <div className="w-full h-44 rounded-2xl border">
                  {
                    productImage !== undefined && productImage !== null && productImage !== "" 
                    ? <img src={productImage} alt="product img" className='w-full h-full rounded-2xl object-cover' /> 
                    : <div className='w-full h-full rounded-2xl flex items-center justify-center bg-gray-100 text-gray-400'>
                      {name.toUpperCase()}
                    </div>
                  }
                </div>
                <p className="mt-1 text-sm overflow-hidden text-ellipsis whitespace-nowrap max-w-full">{name}</p>
                <p className="text-sm">{currencySymbol}{priceAfterTax}</p>
              </button>;
            }
            )
          }
        </div>
        {/* products */}
      </div>
      {/* all items */}

      {/* cart */}
      <div className="border rounded-2xl w-[30%] h-[95vh] relative overflow-y-scroll">
        <div className="bg-white/80 backdrop-blur-sm sticky top-0 left-0 right-0 rounded-2xl px-4 py-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Cart</h3>

            <button onClick={btnClearCart} className="text-red-400">
              <IconClearAll />
            </button>
          </div>
          
            <Autocomplete
            className="mt-4 w-full border rounded-2xl"
              sx={{
                display: 'block',
                '& input': {
                  outline: "none",
                  padding: "12px 16px",
                  borderRadius: "16px",
                  width: "100%",
                  bgcolor: 'background.paper',
                  color: (theme) =>
                    theme.palette.getContrastText(theme.palette.background.paper),
                },
              }}
              id="customer-autocomplete-input"
              options={customerList}
              value={selectedCustomer}
              onChange={(e, newValue)=>setState({...state, selectedCustomer: newValue})}
              renderInput={(params) => (
                <div ref={params.InputProps.ref} className="flex items-center">
                  <IconUserSearch className="ml-4" />
                  <input type="text" {...params.inputProps} className="block" />
                </div>
              )}
            />
        </div>

        {
          cart.length !== 0 ? <div className=" px-4">

          <table className="w-full border-collapse">
            <thead>
              <tr className="">
                <th className="py-3 text-sm font-normal text-left max-w-[120px]">Item</th>
                <th className="py-3 text-sm font-normal text-left"></th>
                <th className="py-3 text-sm font-normal text-right">Qty</th>
                <th className="py-3 text-sm font-normal text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cartItem, index)=>{
                return <tr key={index} className="border-b border-b-ipos-grey-100">
                  <td className="text-sm py-3 max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">{cartItem.name}</td>
                  <td className="text-sm py-3 flex gap-2">
                    <button className="text-ipos-blue block">
                      <IconPencil onClick={()=>{
                        btnShowEditCartQuantityModal(cartItem.id, cartItem.quantity);
                      }} />
                    </button>
                    <button onClick={()=>{
                      btnRemoveCartItem(index);
                    }} className="text-red-400">
                      <IconTrash />
                    </button>
                  </td>
                  <td className="text-sm text-right py-3">{cartItem.quantity}</td>
                  <td className="text-sm text-right py-3">{currencySymbol}{(cartItem.quantity*cartItem.priceAfterTax).toFixed(2)}</td>
                </tr>
              })}
            </tbody>
          </table>
          <div className="h-96"></div>
        </div> : <></>
        }

        {
          cart.length !== 0 ? <div className="bg-white/80 backdrop-blur-sm py-3 sticky bottom-0 left-0 right-0 rounded-2xl px-4">
          <div className="flex items-center justify-between">
            <p>Net Total</p>
            <p className="font-bold">{currencySymbol}{netTotal.toFixed(2)}</p>
          </div>
          
          <div className="mt-2 flex items-center justify-between">
            <p>Tax Total</p>
            <p className="font-bold">+{currencySymbol}{taxTotal.toFixed(2)}</p>
          </div>

          {discount !== 0 ? <div className="mt-2 flex items-center justify-between">
            <div className="flex gap-2">
              <p>Discount</p>
              <button className="text-red-400" onClick={btnRemoveDiscount}>
                <IconTrash />
              </button>
            </div>
            <p className="font-bold text-red-400">-{currencySymbol}{discount.toFixed(2)}</p>
          </div>: <></>}

          <div className="mt-2 flex items-center justify-between">
            <p>Payable Total</p>
            <p className="font-bold">{currencySymbol}{payableTotal.toFixed(2)}</p>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <button onClick={openApplyDiscountModal} className="px-4 py-3 rounded-2xl bg-ipos-grey-100 text-ipos-grey hover:bg-ipos-grey-50 flex justify-center gap-2">
              <IconDiscount2 />
              Apply Discount
            </button>
            <button onClick={btnCartCheckout} className="px-4 py-3 rounded-2xl bg-ipos-blue hover:bg-ipos-logo-color text-white block">
              Checkout
            </button>
          </div>
        </div> : <></>
        }
      </div>
      {/* cart */}



      {/* edit cart item quantity */}
      <div className={showEditCartItemQuantity ? "w-full h-screen flex justify-center items-center fixed top-0 left-0 right-0": "hidden"}>
        <div className="bg-white rounded-2xl px-4 py-3 shadow-xl w-96">
         
            <h3 className="text-center">Edit Item Quantity</h3>

          
          <div className="mt-8">
            <input type="hidden" ref={txtEditCartItemIDRef} />
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={btnEditCartQuantityMinus}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-ipos-grey-50 hover:bg-ipos-grey-100 text-ipos-grey"
              >
                <IconMinus />
              </button>
              <input ref={txtEditCartItemQuantityRef} type="number" min="0" className="h-12 w-16 rounded-2xl bg-ipos-grey-50 text-ipos-grey text-center outline-none" />
              <button
                onClick={btnEditCartQuantityPlus}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-ipos-grey-50 hover:bg-ipos-grey-100 text-ipos-grey"
              >
                <IconPlus />
              </button>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={btnEditCartQuantityModalSave}
                className="rounded-2xl px-4 py-3 bg-ipos-blue hover:bg-ipos-logo-color text-white"
              >
                Save
              </button>
              <button
                onClick={btnCloseEditCartQuantityModal}
                className="rounded-2xl px-4 py-3 bg-ipos-grey-50 hover:bg-ipos-grey-100 text-ipos-grey ml-2"
              >
                Cancel
              </button>
            </div>
          </div>

        </div>
      </div>
      {/* edit cart item quantity */}


      {/* apply discount */}
      <div className={showApplyDiscountModal?"w-full h-screen flex justify-center items-center fixed top-0 left-0 right-0":"hidden"}>
        <div className="bg-white rounded-2xl px-4 py-3 shadow-xl w-96">

          <div className="mt-4">

            <form onSubmit={handleApplyDiscountFormSubmit}>
              <label htmlFor="discountCode" className="w-full block">Discount Code</label>
              <input type="text" name="discountCode" placeholder="Enter Discount Code here..." className="mt-1 w-full block px-4 py-3 rounded-2xl border outline-indigo-500" />

              <div className="mt-8 flex justify-center">
                <button
                  className="rounded-2xl px-4 py-3 bg-ipos-blue hover:bg-ipos-logo-color text-white"
                  type="submit"
                >
                  Apply
                </button>
                <button
                  onClick={closeApplyDiscountModal}
                  className="rounded-2xl px-4 py-3 bg-ipos-grey-50 hover:bg-ipos-grey-100 text-ipos-grey ml-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
      {/* apply discount */}


      {/* filter */}
      <div className={showCategoryFilterModal ? "w-full h-screen flex justify-center items-center fixed top-0 left-0 right-0":"hidden"}>
        <div className="bg-white rounded-2xl px-4 py-3 shadow-xl w-96">
        <div className="flex items-center justify-between gap-3 mt-4">
          <div className="flex items-center gap-3">
            <button
              onClick={closeCategoryFilterModal}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-ipos-grey-50 hover:bg-ipos-grey-100 text-ipos-grey"
            >
              <IconX />
            </button>
            <h3>Apply Filter</h3>
          </div>

          <button
            onClick={clearCategoryFilter}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-ipos-grey-50 hover:bg-ipos-grey-100 text-ipos-grey"
          >
            <IconArrowBackUp />
          </button>
        </div>

          <div className="mt-4">

              <label htmlFor="categories" className="w-full block">Categories</label>
              <select 
                name="categories" id="categories" 
                placeholder="Enter Discount Code here..." 
                className="mt-1 w-full block px-4 py-3 rounded-2xl border outline-indigo-500" 
                value={category}
                onChange={onSelectedCategoryChange}
              >
                <option value="">Select Category</option>
                {
                  categories.map((category, index)=>{
                    const id = category.dataValues.id;
                    const name = category.dataValues.name;

                    return <option key={index} value={id}>{name}</option>
                  })
                }
              </select>

          </div>

        </div>
      </div>
      {/* filter */}


      {/* sale payment type */}
      <div className={showPaymentMethodModal ? "w-full h-screen flex justify-center items-center fixed top-0 left-0 right-0":"hidden"}>
        <div className="bg-white rounded-2xl px-5 py-6 shadow-xl w-96">
          <div className="flex items-center justify-between gap-3 mt-4">
            <div className="flex items-center gap-3">
              <button
                onClick={closePaymentMethodModal}
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-ipos-grey-50 hover:bg-ipos-grey-100 text-ipos-grey"
              >
                <IconX />
              </button>
              <h3 className="text-ipos-grey">Payment Method</h3>
            </div>
            
          </div>

          <div className="mt-10">

              <h1 className="text-center text-5xl font-bold">
                {currencySymbol}{payableTotal}
              </h1>

              <label htmlFor="paymentMethod" className="mt-10 w-full block">Payment Method</label>
              <select 
                name="paymentMethod" id="paymentMethod" 
                placeholder="Select Payment Method here..." 
                className="mt-1 w-full block px-4 py-3 rounded-2xl border outline-indigo-500" 
                ref={paymentTypeRef}
              >
                <option value="">Select Payment Method</option>
                {
                  paymentTypes.map((paymentType, index)=>{
                    const id = paymentType.dataValues.id;
                    const name = paymentType.dataValues.name;

                    return <option key={index} value={id}>{name}</option>
                  })
                }
              </select>

              <label htmlFor="salePrintInvoice" className="mt-6 w-full flex items-center justify-between text-ipos-grey">
                <div className="flex items-center gap-2">
                  <IconReceipt />
                  Print Invoice?
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer no-drag">
                    <input ref={printInvoiceChkRef} defaultChecked name="salePrintInvoice" id="salePrintInvoice" type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
                  </label>
                </div>
              </label>


              <button onClick={btnCreateSale} className="mt-6 block bg-ipos-blue hover:bg-ipos-logo-color text-white rounded-2xl w-full px-4 py-3">
                Create Sale
              </button>

          </div>

        </div>
      </div>
      {/* sale payment type */}


      {/* search */}
      <div className={showSearchModal ? "w-full h-screen flex items-start justify-center fixed top-0 left-0 right-0 bg-black/30 " : "hidden"}>
        <div className="bg-white rounded-2xl px-4 py-3 shadow-xl w-[600px] mt-20">
          <div className="flex items-center justify-between gap-3 mt-4">
            <div className="flex items-center gap-3">
              <button
                onClick={closeProductSearchModal}
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-ipos-grey-50 hover:bg-ipos-grey-100 text-ipos-grey"
              >
                <IconX />
              </button>
              <h3>Search</h3>
            </div>
          </div>

          <div className="mt-4">
            {/* search input */}
            <div className='hover:cursor-pointer no-drag flex items-center justify-between gap-2 bg-ipos-grey-50 text-ipos-grey rounded-2xl px-4'>
              <div className='flex items-center gap-2 w-full'>
                <IconSearch />
                <input 
                  type="text" 
                  value={searchValue} 
                  onChange={e=>setSearchValue(e.target.value)} 
                  placeholder='Search Products' 
                  className='bg-ipos-grey-50 text-ipos-grey py-4 outline-none grow' 
                />
              </div>
            </div>
            {/* search input */}

            {/* result */}
            <div className="flex flex-col gap-4 mt-4 max-h-80 overflow-y-scroll show-scrollbar">
              {
                products.filter(productSearchFilter).map((product, index)=>{
                  const id = product.dataValues.id;
                  const name = product.dataValues.name;
                  const category = product.Category?.dataValues?.name || "";
                  const sku = product.dataValues.sku;
                  const barcode = product.dataValues.barcode;

                  const price = product.dataValues.price;
                  const productImage = product.dataValues.image;

                  // price + tax
                  const taxRate = product?.Tax?.dataValues?.taxRate || 0;
                  const taxType = product?.Tax?.dataValues?.type || null;

                  const calculatedTax = calculateTax(price, taxRate, taxType);
                  const priceAfterTax = calculatePriceAfterTax(price, taxRate, taxType);
                  // price + tax

                  return <div key={index} className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <div className="w-16 h-16 rounded-2xl border">
                        {
                          productImage !== undefined && productImage !== null && productImage !== "" 
                          ? <img src={productImage} alt="product img" className='w-full h-full rounded-2xl object-cover' /> 
                          : <div className='w-full h-full rounded-2xl flex items-center justify-center bg-gray-100 text-gray-400'>
                            {name.toUpperCase()}
                          </div>
                        }
                      </div>

                      <div>
                        <p className="text-sm text-ipos-grey">#{id}</p>
                        <p className="text-sm">{name} <span className="text-ipos-grey text-xs">(in {category})</span></p>
                        <p className="text-sm">{currencySymbol}{priceAfterTax}</p>
                      </div>
                    </div>

                    <button 
                      onClick={()=>{
                        btnPOSItemTap({id: id, name, price:price, tax: calculatedTax, priceAfterTax: priceAfterTax, taxType});
                      }}
                      className="flex gap-2 items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-500 px-4 py-3 mr-2 rounded-2xl text-sm">
                      <IconPlus />
                      Add
                    </button>
                  </div>
                })
              }
            </div>
            {/* result */}
          </div>

        </div>
      </div>
      {/* search */}

    </div>
  );
}
