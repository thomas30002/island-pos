import React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import Dashboard from './Dashboard.jsx';
import HomePage from './HomePage.jsx';

export default function RouterPage() {
  return (
    <div>
      <HashRouter>
        <Toaster />
        <Routes>
          <Route path='/' element={<Dashboard />}>
            <Route path='' element={<HomePage/>} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  )
}
