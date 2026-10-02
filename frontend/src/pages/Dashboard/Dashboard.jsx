import { useEffect, useState } from 'react'

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

import { getTransactions } from '../../services/transactionService'

import './Dashboard.css'

function Dashboard() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadTransactions() {
      try {
        setLoading(true)
        setError('')

        const data = await getTransactions()

        setTransactions(data)
      } catch (error) {
        console.error(
          'Erro ao carregar dados do Dashboard:',
          error
        )

        setError(
          error.response?.data?.message ||
          'Não foi possível carregar os dados financeiros.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadTransactions()
  }, [])

  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce(
      (total, transaction) => total + Number(transaction.amount),
      0
    )

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce(
      (total, transaction) => total + Number(transaction.amount),
      0
    )

  const currentBalance = totalIncome - totalExpenses

  function formatCurrency(value) {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  return (
    <section className="dashboard">
      <div className="dashboard__heading">
        <div>
          <h1>Dashboard</h1>
          <p>Visão geral das suas finanças.</p>
        </div>
      </div>

      {error && (
        <p role="alert">
          {error}
        </p>
      )}

      <div className="dashboard__cards">
        <Card
          title="Saldo atual"
          value={loading ? 'Carregando...' : formatCurrency(currentBalance)}
          icon={<Wallet size={20} />}
          description="Receitas menos despesas"
        />

        <Card
          title="Receitas"
          value={loading ? 'Carregando...' : formatCurrency(totalIncome)}
          icon={<TrendingUp size={20} />}
          description="Total recebido"
        />

        <Card
          title="Despesas"
          value={loading ? 'Carregando...' : formatCurrency(totalExpenses)}
          icon={<TrendingDown size={20} />}
          description="Total gasto"
        />

        <Card
          title="Economia"
          value={loading ? 'Carregando...' : formatCurrency(currentBalance)}
          icon={<PiggyBank size={20} />}
          description="Receitas menos despesas"
        />
      </div>

      <div className="dashboard__charts">
        <IncomeExpenseChart transactions={transactions} />
        <CategoryChart transactions={transactions} />
      </div>

      <RecentTransactions transactions={transactions} />
    </section>
  )
}

export default Dashboard