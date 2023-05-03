import React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import Dashboard from './Dashboard.jsx';
import HomePage from './HomePage.jsx';
import POSPage from './POSPage.jsx';
import ProductsPage from "./ProductsPage.jsx";
import CustomersPage from "./CustomersPage.jsx";
import ExpensesPage from "./ExpensesPage.jsx";
import DiscountPage from "./DiscountPage.jsx";
import ReportsPage from "./ReportsPage.jsx";
import SettingsPage from "./SettingsPage.jsx";

import SettingFeaturesPage from "./settings_pages/Features.jsx";
import SettingPaymentTypePage from "./settings_pages/PaymentType.jsx";
import SettingReceiptPage from "./settings_pages/Receipt.jsx";
import SettingTaxesPage from "./settings_pages/Taxes.jsx";
import SettingDiningOptionsPage from "./settings_pages/DiningOptions.jsx";


export default function RouterPage() {
  return (
    <div>
      <HashRouter>
        <Toaster />
        <Routes>
          <Route path='/' element={<Dashboard />}>
            <Route path='' element={<HomePage/>} />
            <Route path='pos' element={<POSPage />} />
            <Route path='products' element={<ProductsPage />} />
            <Route path='customers' element={<CustomersPage />} />
            <Route path='expenses' element={<ExpensesPage />} />
            <Route path='discount' element={<DiscountPage />} />
            <Route path='reports' element={<ReportsPage />} />
            <Route path='settings' element={<SettingsPage />} >
              <Route path='' element={<SettingFeaturesPage />} />
              <Route path='features' element={<SettingFeaturesPage />} />
              <Route path='payment-type' element={<SettingPaymentTypePage />} />
              <Route path='taxes' element={<SettingTaxesPage />} />
              <Route path='receipt' element={<SettingReceiptPage />} />
              <Route path='dining-options' element={<SettingDiningOptionsPage />} />
            </Route>

          </Route>
        </Routes>
      </HashRouter>
    </div>
  )
}
