import React, { useEffect, useState } from "react";
import { IconClearAll, IconFilter, IconPencil, IconSearch, IconTrash } from "@tabler/icons-react";

import { toast } from 'react-hot-toast'
import { CURRENCIES } from "../config/currencies.config.js";
import { playTapSound } from "../utils/playTapSound.js";

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
    cart: []
  });

  const { products, categories, customers, cart } = state;

  useEffect(() => {
    _initPOS();
  }, [])

  const _initPOS = async () => {
    const categoriesResponse = await window.api.getCategories()
    const productsResponse = await window.api.getProducts()
    const customersResponse = await window.api.getCustomers()

    setState({
      ...state,
      products: productsResponse,
      categories: categoriesResponse,
      customers: customersResponse,
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
      <div className="border rounded-2xl w-[30%] h-[95vh] p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">Cart</h3>

          <button className="text-red-400">
            <IconClearAll />
          </button>
        </div>

        <div className="mt-4">
          <select className="w-full px-4 py-3 border rounded-2xl">
            <option value="walk-in">Walk In Customer</option>
          </select>

          <table className="w-full border-collapse mt-4">
            <thead>
              <tr className="border-b border-b-ipos-grey-100">
                <th className="py-3 font-normal text-left max-w-[120px]">Item</th>
                <th className="py-3 font-normal text-left"></th>
                <th className="py-3 font-normal text-left">Qty</th>
                <th className="py-3 font-normal text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cartItem, index)=>{
                return <tr key={index} className="border-b border-b-ipos-grey-100">
                  <td className="py-3 max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">{cartItem.name}</td>
                  <td className="py-3 flex gap-2">
                    <button className="text-ipos-blue block">
                      <IconPencil />
                    </button>
                    <button onClick={()=>{
                      btnRemoveCartItem(index);
                    }} className="text-red-400">
                      <IconTrash />
                    </button>
                  </td>
                  <td className="py-3">{cartItem.quantity}</td>
                  <td className="py-3">{currencySymbol}{Math.round(cartItem.quantity*cartItem.price)}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* cart */}
    </div>
  );
}
