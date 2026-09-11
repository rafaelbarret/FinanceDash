import { BrowserRouter, Routes, Route } from 'react-router-dom'

import DashboardLayout from '../layouts/DashboardLayout/DashboardLayout'

import Dashboard from '../pages/Dashboard/Dashboard'
import Transactions from '../pages/Transactions/Transactions'
import Categories from '../pages/Categories/Categories'
import Reports from '../pages/Reports/Reports'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes