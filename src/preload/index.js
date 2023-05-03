import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import {addPaymentType,getPaymentTypes, removePaymentType} from "./backend/controllers/paymentType.controller"
import {addTax,getTaxes, removeTax} from "./backend/controllers/taxes.controller"
import {addDiningOption,getDiningOptions,removeDiningOption} from "./backend/controllers/diningOptions.controller"
import {getReceiptSettings,saveReceiptSettings} from "./backend/controllers/receiptSetting.controller"


// Custom APIs for renderer
const api = {
  helloworld: ()=>{
    console.log("Hello world from API");
  },

  // payment types
  addPaymentType,
  getPaymentTypes,
  removePaymentType,
  // payment types

  // taxes
  addTax, 
  getTaxes,
  removeTax,
  // taxes

  // dining options
  addDiningOption,
  getDiningOptions,
  removeDiningOption,
  // dining options

  // receipt settings
  getReceiptSettings,
  saveReceiptSettings,
  // receipt settings
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
