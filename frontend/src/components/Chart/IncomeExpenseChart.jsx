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

const data = [
  {
    month: 'Jan',
    receitas: 5200,
    despesas: 3100,
  },
  {
    month: 'Fev',
    receitas: 6100,
    despesas: 3500,
  },
  {
    month: 'Mar',
    receitas: 5800,
    despesas: 3900,
  },
  {
    month: 'Abr',
    receitas: 7200,
    despesas: 4100,
  },
  {
    month: 'Mai',
    receitas: 6800,
    despesas: 3800,
  },
  {
    month: 'Jun',
    receitas: 7900,
    despesas: 4500,
  },
]

function IncomeExpenseChart() {
  return (
    <div className="chart-card">
      <div className="chart-card__header">
        <h2>Receitas x Despesas</h2>
        <span>Últimos 6 meses</span>
      </div>

      <div className="chart-card__content">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip
              formatter={(value) =>
                `R$ ${value.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}`
              }
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