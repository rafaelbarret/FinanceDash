import { useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
} from 'lucide-react'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

import './Reports.css'

const monthlyData = [
  {
    month: 'Abr',
    income: 7200,
    expenses: 4100,
  },
  {
    month: 'Mai',
    income: 6800,
    expenses: 3800,
  },
  {
    month: 'Jun',
    income: 7900,
    expenses: 4500,
  },
  {
    month: 'Jul',
    income: 7500,
    expenses: 4200,
  },
  {
    month: 'Ago',
    income: 8200,
    expenses: 4700,
  },
  {
    month: 'Set',
    income: 8500,
    expenses: 4050,
  },
]

const categoryData = [
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

function Reports() {
  const [period, setPeriod] = useState('6months')

  function formatCurrency(value) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  const totalIncome = monthlyData.reduce(
    (total, month) => total + month.income,
    0
  )

  const totalExpenses = monthlyData.reduce(
    (total, month) => total + month.expenses,
    0
  )

  const balance = totalIncome - totalExpenses

  const economyPercentage =
    totalIncome > 0
      ? (balance / totalIncome) * 100
      : 0

  return (
    <section className="reports">
      <div className="reports__heading">
        <div>
          <h1>Relatórios</h1>

          <p>
            Analise o desempenho das suas finanças.
          </p>
        </div>

        <select
          className="reports__period"
          value={period}
          onChange={(event) =>
            setPeriod(event.target.value)
          }
        >
          <option value="month">
            Este mês
          </option>

          <option value="3months">
            Últimos 3 meses
          </option>

          <option value="6months">
            Últimos 6 meses
          </option>

          <option value="year">
            Este ano
          </option>
        </select>
      </div>

      <div className="reports__cards">
        <article className="report-card">
          <div className="report-card__header">
            <span>Receitas</span>

            <div className="report-card__icon report-card__icon--income">
              <TrendingUp size={20} />
            </div>
          </div>

          <strong>
            {formatCurrency(totalIncome)}
          </strong>

          <small>
            Total recebido no período
          </small>
        </article>

        <article className="report-card">
          <div className="report-card__header">
            <span>Despesas</span>

            <div className="report-card__icon report-card__icon--expense">
              <TrendingDown size={20} />
            </div>
          </div>

          <strong>
            {formatCurrency(totalExpenses)}
          </strong>

          <small>
            Total gasto no período
          </small>
        </article>

        <article className="report-card">
          <div className="report-card__header">
            <span>Saldo</span>

            <div className="report-card__icon report-card__icon--balance">
              <Wallet size={20} />
            </div>
          </div>

          <strong>
            {formatCurrency(balance)}
          </strong>

          <small>
            Resultado financeiro
          </small>
        </article>

        <article className="report-card">
          <div className="report-card__header">
            <span>Economia</span>

            <div className="report-card__icon report-card__icon--saving">
              <PiggyBank size={20} />
            </div>
          </div>

          <strong>
            {economyPercentage.toFixed(1)}%
          </strong>

          <small>
            Percentual da renda economizado
          </small>
        </article>
      </div>

      <div className="reports__charts">
        <section className="report-chart">
          <div className="report-chart__header">
            <div>
              <h2>Receitas x Despesas</h2>

              <span>
                Evolução financeira no período
              </span>
            </div>
          </div>

          <div className="report-chart__content">
            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip
                  formatter={(value) =>
                    formatCurrency(value)
                  }
                />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="income"
                  name="Receitas"
                  stroke="#16a34a"
                  strokeWidth={3}
                />

                <Line
                  type="monotone"
                  dataKey="expenses"
                  name="Despesas"
                  stroke="#dc2626"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="report-chart">
          <div className="report-chart__header">
            <div>
              <h2>Despesas por categoria</h2>

              <span>
                Distribuição dos seus gastos
              </span>
            </div>
          </div>

          <div className="report-chart__content report-chart__content--pie">
            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={105}
                  label
                >
                  {categoryData.map(
                    (entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip
                  formatter={(value) =>
                    formatCurrency(value)
                  }
                />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="reports__summary">
        <div className="reports__summary-header">
          <div>
            <h2>Resumo mensal</h2>

            <span>
              Comparativo das movimentações
            </span>
          </div>
        </div>

        <div className="reports__table-container">
          <table className="reports__table">
            <thead>
              <tr>
                <th>Mês</th>
                <th>Receitas</th>
                <th>Despesas</th>
                <th>Saldo</th>
              </tr>
            </thead>

            <tbody>
              {monthlyData.map((month) => {
                const monthlyBalance =
                  month.income -
                  month.expenses

                return (
                  <tr key={month.month}>
                    <td className="reports__month">
                      {month.month}
                    </td>

                    <td className="reports__income">
                      {formatCurrency(
                        month.income
                      )}
                    </td>

                    <td className="reports__expense">
                      {formatCurrency(
                        month.expenses
                      )}
                    </td>

                    <td
                      className={
                        monthlyBalance >= 0
                          ? 'reports__balance'
                          : 'reports__balance reports__balance--negative'
                      }
                    >
                      {formatCurrency(
                        monthlyBalance
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  )
}

export default Reports