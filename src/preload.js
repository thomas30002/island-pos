// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import {addPaymentType,getPaymentTypes, removePaymentType} from "./backend/controllers/paymentType.controller"
import {addTax,getTaxes, removeTax} from "./backend/controllers/taxes.controller"
import {addDiningOption,getDiningOptions,removeDiningOption} from "./backend/controllers/diningOptions.controller"

window.api = {

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
};
