import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

import './Charts.css'

function IncomeExpenseChart({ transactions = [] }) {
  const today = new Date()

  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(
      today.getFullYear(),
      today.getMonth() - 5 + index,
      1
    )

    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      label: date.toLocaleDateString('pt-BR', {
        month: 'short',
      }),
      receitas: 0,
      despesas: 0,
    }
  })

  transactions.forEach((transaction) => {
    if (!transaction.transaction_date) {
      return
    }

    const [year, month] = transaction.transaction_date
      .slice(0, 10)
      .split('-')
      .map(Number)

    const monthData = months.find(
      (item) =>
        item.year === year &&
        item.month === month - 1
    )

    if (!monthData) {
      return
    }

    const amount = Number(transaction.amount) || 0

    if (transaction.type === 'income') {
      monthData.receitas += amount
    } else if (transaction.type === 'expense') {
      monthData.despesas += amount
    }
  })

  function formatCurrency(value) {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  return (
    <div className="chart-card">
      <div className="chart-card__header">
        <h2>Receitas x Despesas</h2>
        <span>Últimos 6 meses</span>
      </div>

      <div className="chart-card__content">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={months}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="label" />

            <YAxis />

            <Tooltip
              formatter={(value) => formatCurrency(value)}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="receitas"
              name="Receitas"
              stroke="#16a34a"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

            <Line
              type="monotone"
              dataKey="despesas"
              name="Despesas"
              stroke="#dc2626"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default IncomeExpenseChart