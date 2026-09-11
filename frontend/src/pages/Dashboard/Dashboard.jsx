import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from 'lucide-react'

import Card from '../../components/Card/Card'
import IncomeExpenseChart from '../../components/Chart/IncomeExpenseChart'
import CategoryChart from '../../components/Chart/CategoryChart'
import RecentTransactions from '../../components/Transactions/RecentTransactions'

import './Dashboard.css'

function Dashboard() {
  return (
    <section className="dashboard">
      <div className="dashboard__heading">
        <div>
          <h1>Dashboard</h1>
          <p>Visão geral das suas finanças.</p>
        </div>
      </div>

      <div className="dashboard__cards">
        <Card
          title="Saldo atual"
          value="R$ 8.450,00"
          icon={<Wallet size={20} />}
          description="Saldo disponível"
        />

        <Card
          title="Receitas"
          value="R$ 12.500,00"
          icon={<TrendingUp size={20} />}
          description="Total recebido"
        />

        <Card
          title="Despesas"
          value="R$ 4.050,00"
          icon={<TrendingDown size={20} />}
          description="Total gasto"
        />

        <Card
          title="Economia"
          value="R$ 8.450,00"
          icon={<PiggyBank size={20} />}
          description="Valor economizado"
        />
      </div>

      <div className="dashboard__charts">
        <IncomeExpenseChart />
        <CategoryChart />
      </div>

      <RecentTransactions />
      
    </section>
  )
}

export default Dashboard