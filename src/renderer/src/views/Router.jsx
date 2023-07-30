import React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import Dashboard from './Dashboard.jsx';
import HomePage from './HomePage.jsx';
import POSPage from './POSPage.jsx';
import ProductsPage from "./ProductsPage.jsx";
import CategoriesPage from './CategoriesPage.jsx';
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

import SalesSummaryPage from "./reports_pages/SalesSummaryPage.jsx";
import SalesByItemPage from './reports_pages/SalesByItemPage.jsx';
import SalesByCategoryPage from "./reports_pages/SalesByCategoryPage.jsx";
import SalesByPaymentTypesPage from "./reports_pages/SalesByPaymentTypesPage.jsx";
import SalesByCustomersPage from "./reports_pages/SalesByCustomersPage.jsx";
import ReportsReceiptsPage from "./reports_pages/ReceiptsPage.jsx";
import ReportDiscountPage from "./reports_pages/DiscountsPage.jsx";
import ReportsTaxesPage from "./reports_pages/TaxesPage.jsx";
import PrintReceiptPage from './PrintReceiptPage.jsx';
import PrintProductCodesPage from './PrintProductCodesPage.jsx';

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
            <Route path='categories' element={<CategoriesPage />} />
            <Route path='customers' element={<CustomersPage />} />
            <Route path='expenses' element={<ExpensesPage />} />
            <Route path='discount' element={<DiscountPage />} />
            <Route path='reports' element={<ReportsPage />}>
              <Route path='' element={<SalesSummaryPage />} />
              <Route path='sales-summary' element={<SalesSummaryPage />} />
              <Route path='sales-item' element={<SalesByItemPage />} />
              <Route path='sales-category' element={<SalesByCategoryPage />} />
              <Route path='sales-payment-type' element={<SalesByPaymentTypesPage />} />
              <Route path='sales-customers' element={<SalesByCustomersPage />} />
              <Route path='receipts' element={<ReportsReceiptsPage />} />
              <Route path='discounts' element={<ReportDiscountPage />} />
              <Route path='taxes' element={<ReportsTaxesPage />} />
            </Route>
            <Route path='settings' element={<SettingsPage />} >
              <Route path='' element={<SettingFeaturesPage />} />
              <Route path='features' element={<SettingFeaturesPage />} />
              <Route path='payment-type' element={<SettingPaymentTypePage />} />
              <Route path='taxes' element={<SettingTaxesPage />} />
              <Route path='receipt' element={<SettingReceiptPage />} />
              <Route path='dining-options' element={<SettingDiningOptionsPage />} />
            </Route>

          </Route>

          <Route path='/print-receipt/:id' element={<PrintReceiptPage />} />
          <Route path='/print-product-codes' element={<PrintProductCodesPage />} />
        </Routes>
      </HashRouter>
    </div>
  )
}
