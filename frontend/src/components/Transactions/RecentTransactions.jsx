import {
  ShoppingCart,
  Car,
  BriefcaseBusiness,
  Gamepad2,
} from 'lucide-react'

import './RecentTransactions.css'

const transactions = [
  {
    id: 1,
    description: 'Supermercado',
    category: 'Alimentação',
    type: 'expense',
    amount: 320,
    icon: ShoppingCart,
  },
  {
    id: 2,
    description: 'Combustível',
    category: 'Transporte',
    type: 'expense',
    amount: 180,
    icon: Car,
  },
  {
    id: 3,
    description: 'Salário',
    category: 'Receita',
    type: 'income',
    amount: 5200,
    icon: BriefcaseBusiness,
  },
  {
    id: 4,
    description: 'Steam',
    category: 'Lazer',
    type: 'expense',
    amount: 89.9,
    icon: Gamepad2,
  },
]

function RecentTransactions() {
  function formatCurrency(value) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  return (
    <section className="recent-transactions">
      <div className="recent-transactions__header">
        <div>
          <h2>Transações recentes</h2>
          <span>Últimas movimentações financeiras</span>
        </div>

        <a href="/transactions" className="recent-transactions__link">
          Ver todas →
        </a>
      </div>

      <div className="recent-transactions__list">
        {transactions.map((transaction) => {
          const Icon = transaction.icon

          return (
            <div
              key={transaction.id}
              className="recent-transactions__item"
            >
              <div className="recent-transactions__icon">
                <Icon size={20} />
              </div>

              <div className="recent-transactions__info">
                <strong>{transaction.description}</strong>
                <span>{transaction.category}</span>
              </div>

              <strong
                className={`recent-transactions__amount ${
                  transaction.type === 'income'
                    ? 'recent-transactions__amount--income'
                    : 'recent-transactions__amount--expense'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </strong>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default RecentTransactions