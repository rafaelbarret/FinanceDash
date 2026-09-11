import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts'

import './Charts.css'

const data = [
  {
    name: 'Moradia',
    value: 1800,
  },
  {
    name: 'Alimentação',
    value: 950,
  },
  {
    name: 'Transporte',
    value: 550,
  },
  {
    name: 'Lazer',
    value: 350,
  },
  {
    name: 'Outros',
    value: 400,
  },
]

const COLORS = [
  '#2563eb',
  '#16a34a',
  '#f59e0b',
  '#dc2626',
  '#8b5cf6',
]

function CategoryChart() {
  return (
    <div className="chart-card">
      <div className="chart-card__header">
        <h2>Despesas por categoria</h2>
        <span>Este mês</span>
      </div>

      <div className="chart-card__content">
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
              formatter={(value) =>
                `R$ ${value.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}`
              }
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default CategoryChart