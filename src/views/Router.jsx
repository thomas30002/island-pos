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
            <Route path='settings' element={<SettingsPage />} />

          </Route>
        </Routes>
      </HashRouter>
    </div>
  )
}
