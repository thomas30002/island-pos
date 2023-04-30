// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import {addPaymentType,getPaymentTypes, removePaymentType} from "./backend/controllers/paymentType.controller"

window.api = {
  addPaymentType,
  getPaymentTypes,
  removePaymentType
};
