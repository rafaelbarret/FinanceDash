import { BrowserRouter, Routes, Route } from 'react-router-dom'

import DashboardLayout from '../layouts/DashboardLayout/DashboardLayout'

import Login from '../pages/Login/Login'

import Dashboard from '../pages/Dashboard/Dashboard'
import Transactions from '../pages/Transactions/Transactions'
import Categories from '../pages/Categories/Categories'
import Reports from '../pages/Reports/Reports'

import ProtectedRoute from './ProtectedRoute'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>

            <Route path="/" element={<Dashboard />} />

            <Route
              path="/transactions"
              element={<Transactions />}
            />

            <Route
              path="/categories"
              element={<Categories />}
            />

            <Route
              path="/reports"
              element={<Reports />}
            />

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes