import { useEffect, useState } from 'react'

import {
  Pencil,
  Trash2,
} from 'lucide-react'

import Modal from '../../components/Modal/Modal'
import TransactionForm from '../../components/Transactions/TransactionForm'

import {
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from '../../services/transactionService'

import './Transactions.css'

function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

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
          'Erro ao carregar transações:',
          error
        )

        setError(
          error.response?.data?.message ||
          'Não foi possível carregar as transações.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadTransactions()
  }, [])

  function formatCurrency(value) {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  function formatDate(date) {
    if (!date) {
      return ''
    }

    const [year, month, day] = date
      .slice(0, 10)
      .split('-')

    return `${day}/${month}/${year}`
  }

  function handleEditTransaction(transaction) {
    setEditingTransaction(transaction)
    setIsModalOpen(true)
  }

  async function handleDeleteTransaction(id) {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir esta transação?'
    )

    if (!confirmed) {
      return
    }

    try {
      await deleteTransaction(id)

      setTransactions((previousTransactions) =>
        previousTransactions.filter(
          (transaction) => transaction.id !== id
        )
      )
    } catch (error) {
      console.error(
        'Erro ao excluir transação:',
        error
      )

      window.alert(
        error.response?.data?.message ||
        'Não foi possível excluir a transação.'
      )
    }
  }


  async function handleSaveTransaction(
    transactionData
  ) {
    try {
      if (editingTransaction) {
        const updatedTransaction =
          await updateTransaction(
            editingTransaction.id,
            transactionData
          )

        setTransactions(
          (previousTransactions) =>
            previousTransactions.map(
              (transaction) =>
                transaction.id ===
                  editingTransaction.id
                  ? {
                    ...transaction,
                    ...updatedTransaction,
                  }
                  : transaction
            )
        )
      }

      setEditingTransaction(null)
      setIsModalOpen(false)
    } catch (error) {
      console.error(
        'Erro ao salvar transação:',
        error
      )

      window.alert(
        error.response?.data?.message ||
        'Não foi possível salvar a transação.'
      )
    }
  }



  const filteredTransactions = transactions.filter(
    (transaction) => {
      const matchesSearch =
        transaction.description
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
    }
  )

  return (
    <section className="transactions">
      <div className="transactions__heading">
        <div>
          <h1>Transações</h1>
          <p>
            Gerencie suas receitas e despesas.
          </p>
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
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <select
          value={typeFilter}
          onChange={(event) =>
            setTypeFilter(event.target.value)
          }
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
            {loading ? (
              <tr>
                <td
                  colSpan="6"
                  className="transactions__empty"
                >
                  Carregando transações...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  colSpan="6"
                  className="transactions__empty"
                >
                  {error}
                </td>
              </tr>
            ) : filteredTransactions.length > 0 ? (
              filteredTransactions.map(
                (transaction) => (
                  <tr key={transaction.id}>
                    <td className="transactions__description">
                      {transaction.description}
                    </td>

                    <td>
                      {transaction.category ||
                        'Sem categoria'}
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
                      {formatDate(
                        transaction.transaction_date ||
                        transaction.date
                      )}
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
                      {formatCurrency(
                        transaction.amount
                      )}
                    </td>

                    <td className="transactions__actions">
                      <button
                        type="button"
                        className="transactions__action transactions__action--edit"
                        onClick={() =>
                          handleEditTransaction(
                            transaction
                          )
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
                )
              )
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

