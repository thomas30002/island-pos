import React, { useEffect, useState } from "react";
import { IconClearAll, IconDiscount2, IconFilter, IconPencil, IconSearch, IconTrash, IconUserSearch } from "@tabler/icons-react";

import { toast } from 'react-hot-toast'
import { CURRENCIES } from "../config/currencies.config.js";
import { playTapSound } from "../utils/playTapSound.js";
import { Autocomplete } from "@mui/material";

export default function POSPage() {

  // get currency
  const currencyCode = window.api.getCurrency();
  const currencyFind =  CURRENCIES.find(c=>c.cc == currencyCode);
  const currencySymbol = currencyFind !== undefined ? currencyFind.symbol : '';
  // get currency

  
  const [state, setState] = useState({
    products: [],
    categories: [],
    customers: [],
    customerList: [],
    selectedCustomer: null,
    cart: []
  });

  const { products, categories, customers, selectedCustomer, customerList, cart } = state;

  // cart total
  const cartTotal = cart.reduce((pV, cV, index, arr)=>{
    const itemTotal = cV.price * cV.quantity;

    return pV+itemTotal;
  }, 0);
  // cart total

  useEffect(() => {
    _initPOS();
  }, [])

  const _initPOS = async () => {
    const categoriesResponse = await window.api.getCategories()
    const productsResponse = await window.api.getProducts()
    const customersResponse = await window.api.getCustomers()

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
      selectedCustomer: customersOptions[0]
    });
  };


  const btnPOSItemTap = async ({id, name, price}) => {
    playTapSound();

    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === id);
    const newCart = cart;
    if(existingItemIndex === -1) {
      // item not found
      newCart.push({id, name, price, quantity: 1});
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
  // cart


  return (
    <div className="px-8 py-6 w-full flex gap-6">
      {/* all items */}
      <div className="border rounded-2xl w-[70%] h-[95vh] p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">All Items</h3>

          <div className="flex items-center gap-4">
            <button>
              <IconFilter />
            </button>
            <button>
              <IconSearch />
            </button>
          </div>
        </div>

        {/* products */}
        <div className="grid grid-cols-3 xl:grid-cols-4 mt-4 w-full h-[95%] overflow-y-scroll gap-4">
          {
            products
            .map((product, index)=>{

              const id = product.dataValues.id;
              const name = product.dataValues.name;
              const price = product.dataValues.price;
              const productImage = product.dataValues.image;


              return <button className="block w-full h-52" key={index} onClick={()=>{
                btnPOSItemTap({id: id, name, price});
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
                <p className="text-sm">{currencySymbol}{price}</p>
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
          {/* <select className="mt-4 w-full px-4 py-3 border rounded-2xl">
              <option value="walk-in">Walk In Customer</option>
          </select> */}
          
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
                      <IconPencil />
                    </button>
                    <button onClick={()=>{
                      btnRemoveCartItem(index);
                    }} className="text-red-400">
                      <IconTrash />
                    </button>
                  </td>
                  <td className="text-sm text-right py-3">{cartItem.quantity}</td>
                  <td className="text-sm text-right py-3">{currencySymbol}{Math.round(cartItem.quantity*cartItem.price)}</td>
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
            <p className="font-bold">{currencySymbol}{cartTotal}</p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p>Discount</p>
            <p className="font-bold text-red-400">-{currencySymbol}0</p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p>Payable Total</p>
            <p className="font-bold">{currencySymbol}{cartTotal}</p>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <button className="px-4 py-3 rounded-2xl bg-ipos-grey-100 text-ipos-grey hover:bg-ipos-grey-50 flex justify-center gap-2">
              <IconDiscount2 />
              Apply Discount
            </button>
            <button className="px-4 py-3 rounded-2xl bg-ipos-blue hover:bg-ipos-logo-color text-white block">
              Checkout
            </button>
          </div>
        </div> : <></>
        }
      </div>
      {/* cart */}
    </div>
  );
}
