import { useState } from 'react'

import {
  Pencil,
  Trash2,
} from 'lucide-react'

import Modal from '../../components/Modal/Modal'
import TransactionForm from '../../components/Transactions/TransactionForm'

import './Transactions.css'

function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      description: 'Salário',
      category: 'Receita',
      type: 'income',
      date: '05/09/2026',
      amount: 5200,
    },
    {
      id: 2,
      description: 'Supermercado',
      category: 'Alimentação',
      type: 'expense',
      date: '04/09/2026',
      amount: 320,
    },
    {
      id: 3,
      description: 'Combustível',
      category: 'Transporte',
      type: 'expense',
      date: '03/09/2026',
      amount: 180,
    },
    {
      id: 4,
      description: 'Steam',
      category: 'Lazer',
      type: 'expense',
      date: '02/09/2026',
      amount: 89.9,
    },
  ])

  function formatCurrency(value) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  function handleEditTransaction(transaction) {
    setEditingTransaction(transaction)
    setIsModalOpen(true)
  }

  function handleDeleteTransaction(id) {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir esta transação?'
    )

    if (!confirmed) {
      return
    }

    setTransactions((previousTransactions) =>
      previousTransactions.filter(
        (transaction) => transaction.id !== id
      )
    )
  }

  function handleSaveTransaction(transactionData) {
    if (editingTransaction) {
      setTransactions((previousTransactions) =>
        previousTransactions.map((transaction) =>
          transaction.id === editingTransaction.id
            ? {
              ...transaction,
              ...transactionData,
            }
            : transaction
        )
      )
    } else {
      const newTransaction = {
        ...transactionData,
        id: Date.now(),
      }

      setTransactions((previousTransactions) => [
        newTransaction,
        ...previousTransactions,
      ])
    }

    setEditingTransaction(null)
    setIsModalOpen(false)
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesType =
      typeFilter === 'all' ||
      transaction.type === typeFilter

    const matchesCategory =
      categoryFilter === 'all' ||
      transaction.category === categoryFilter

    return (
      matchesSearch &&
      matchesType &&
      matchesCategory
    )
  })

  return (
    <section className="transactions">
      <div className="transactions__heading">
        <div>
          <h1>Transações</h1>
          <p>Gerencie suas receitas e despesas.</p>
        </div>

        <button
          type="button"
          className="transactions__add-button"
          onClick={() => {
            setEditingTransaction(null)
            setIsModalOpen(true)
          }}
        >
          + Nova transação
        </button>
      </div>

      <div className="transactions__filters">
        <input
          type="text"
          placeholder="Buscar transação..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
        >
          <option value="all">Todos</option>
          <option value="income">Receitas</option>
          <option value="expense">Despesas</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(event) =>
            setCategoryFilter(event.target.value)
          }
        >
          <option value="all">
            Todas as categorias
          </option>

          <option value="Alimentação">
            Alimentação
          </option>

          <option value="Transporte">
            Transporte
          </option>

          <option value="Moradia">
            Moradia
          </option>

          <option value="Lazer">
            Lazer
          </option>

          <option value="Saúde">
            Saúde
          </option>

          <option value="Educação">
            Educação
          </option>

          <option value="Outros">
            Outros
          </option>

          <option value="Receita">
            Receita
          </option>
        </select>
      </div>

      <div className="transactions__table-container">
        <table className="transactions__table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Tipo</th>
              <th>Data</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="transactions__description">
                    {transaction.description}
                  </td>

                  <td>
                    {transaction.category}
                  </td>

                  <td>
                    <span
                      className={`transactions__type ${transaction.type === 'income'
                          ? 'transactions__type--income'
                          : 'transactions__type--expense'
                        }`}
                    >
                      {transaction.type === 'income'
                        ? 'Receita'
                        : 'Despesa'}
                    </span>
                  </td>

                  <td>
                    {transaction.date}
                  </td>

                  <td
                    className={`transactions__amount ${transaction.type === 'income'
                        ? 'transactions__amount--income'
                        : 'transactions__amount--expense'
                      }`}
                  >
                    {transaction.type === 'income'
                      ? '+'
                      : '-'}
                    {formatCurrency(transaction.amount)}
                  </td>

                  <td className="transactions__actions">
                    <button
                      type="button"
                      className="transactions__action transactions__action--edit"
                      onClick={() =>
                        handleEditTransaction(transaction)
                      }
                      aria-label={`Editar ${transaction.description}`}
                      title="Editar transação"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      className="transactions__action transactions__action--delete"
                      onClick={() =>
                        handleDeleteTransaction(
                          transaction.id
                        )
                      }
                      aria-label={`Excluir ${transaction.description}`}
                      title="Excluir transação"
                    >
                      <Trash2 size={17} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="transactions__empty"
                >
                  Nenhuma transação encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingTransaction(null)
        }}
        title={
          editingTransaction
            ? 'Editar transação'
            : 'Nova transação'
        }
      >
        <TransactionForm
          key={editingTransaction?.id || 'new'}
          transaction={editingTransaction}
          onSubmit={handleSaveTransaction}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingTransaction(null)
          }}
        />
      </Modal>
    </section>
  )
}

export default Transactions