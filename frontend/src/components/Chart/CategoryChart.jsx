import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts'

import './Charts.css'

const COLORS = [
  '#2563eb',
  '#16a34a',
  '#f59e0b',
  '#dc2626',
  '#8b5cf6',
  '#0891b2',
  '#db2777',
  '#65a30d',
]

function CategoryChart({ transactions = [] }) {
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth()

  const categoryTotals = {}

  transactions.forEach((transaction) => {
    if (
      transaction.type !== 'expense' ||
      !transaction.transaction_date
    ) {
      return
    }

    const [year, month] = transaction.transaction_date
      .slice(0, 10)
      .split('-')
      .map(Number)

    if (
      year !== currentYear ||
      month - 1 !== currentMonth
    ) {
      return
    }

    const category =
      transaction.category ||
      transaction.category_name ||
      'Sem categoria'

    categoryTotals[category] =
      (categoryTotals[category] || 0) +
      (Number(transaction.amount) || 0)
  })

  const data = Object.entries(categoryTotals).map(
    ([name, value]) => ({
      name,
      value,
    })
  )

  function formatCurrency(value) {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  return (
    <div className="chart-card">
      <div className="chart-card__header">
        <h2>Despesas por categoria</h2>
        <span>Este mês</span>
      </div>

      <div className="chart-card__content">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => formatCurrency(value)}
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="chart-card__empty">
            Nenhuma despesa cadastrada neste mês.
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryChart