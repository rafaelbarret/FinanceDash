import { NavLink, Outlet } from 'react-router-dom'
import {
    LayoutDashboard,
    ArrowLeftRight,
    Tags,
    BarChart3,
} from 'lucide-react'

import './DashboardLayout.css'

function DashboardLayout() {
    const navigationItems = [
        {
            name: 'Dashboard',
            path: '/',
            icon: LayoutDashboard,
        },
        {
            name: 'Transações',
            path: '/transactions',
            icon: ArrowLeftRight,
        },
        {
            name: 'Categorias',
            path: '/categories',
            icon: Tags,
        },
        {
            name: 'Relatórios',
            path: '/reports',
            icon: BarChart3,
        },
    ]

    return (
        <div className="dashboard-layout">
            <aside className="dashboard-layout__sidebar">
                <div className="dashboard-layout__brand">
                    <h2>FinanceDash</h2>
                    <span>Controle financeiro</span>
                </div>

                <nav className="dashboard-layout__nav">
                    {navigationItems.map((item) => {
                        const Icon = item.icon

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `dashboard-layout__nav-link ${isActive ? 'dashboard-layout__nav-link--active' : ''
                                    }`
                                }
                            >
                                <Icon size={20} />
                                <span>{item.name}</span>
                            </NavLink>
                        )
                    })}
                </nav>
            </aside>

            <div className="dashboard-layout__main">
                <header className="dashboard-layout__header">
                    <h1>Painel financeiro</h1>
                </header>

                <main className="dashboard-layout__content">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout