import {
  ShoppingCart,
  Car,
  BriefcaseBusiness,
  Gamepad2,
  Heart,
  House,
  BookOpen,
  Plane,
  Package,
  Wallet,
} from 'lucide-react'

import './RecentTransactions.css'

const categoryIcons = {
  Alimentação: ShoppingCart,
  Transporte: Car,
  Moradia: House,
  Lazer: Gamepad2,
  Saúde: Heart,
  Educação: BookOpen,
  Trabalho: BriefcaseBusiness,
  Viagem: Plane,
  Outros: Package,
}

function RecentTransactions({ transactions = [] }) {
  function formatCurrency(value) {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  const recentTransactions = [...transactions]
    .sort((a, b) => {
      const dateA = a.transaction_date || a.date || ''
      const dateB = b.transaction_date || b.date || ''

      return dateB.localeCompare(dateA)
    })
    .slice(0, 5)

  return (
    <section className="recent-transactions">
      <div className="recent-transactions__header">
        <div>
          <h2>Transações recentes</h2>
          <span>Últimas movimentações financeiras</span>
        </div>

        <a
          href="/transactions"
          className="recent-transactions__link"
        >
          Ver todas →
        </a>
      </div>

      <div className="recent-transactions__list">
        {recentTransactions.length > 0 ? (
          recentTransactions.map((transaction) => {
            const category =
              transaction.category ||
              transaction.category_name ||
              'Sem categoria'

            const Icon =
              categoryIcons[category] || Wallet

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
                  <span>{category}</span>
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
          })
        ) : (
          <p className="recent-transactions__empty">
            Nenhuma transação cadastrada.
          </p>
        )}
      </div>
    </section>
  )
}

export default RecentTransactions