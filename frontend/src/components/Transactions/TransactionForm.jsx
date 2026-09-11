import { useState } from 'react'

import './TransactionForm.css'

function TransactionForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'Alimentação',
    date: '',
  })

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!formData.description || !formData.amount || !formData.date) {
      return
    }

    onSubmit({
      ...formData,
      amount: Number(formData.amount),
    })
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="transaction-form__field">
        <label htmlFor="description">
          Descrição
        </label>

        <input
          id="description"
          name="description"
          type="text"
          placeholder="Ex: Supermercado"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="transaction-form__field">
        <label htmlFor="amount">
          Valor
        </label>

        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="0,00"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>

      <div className="transaction-form__field">
        <label htmlFor="type">
          Tipo
        </label>

        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="expense">
            Despesa
          </option>

          <option value="income">
            Receita
          </option>
        </select>
      </div>

      <div className="transaction-form__field">
        <label htmlFor="category">
          Categoria
        </label>

        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
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
        </select>
      </div>

      <div className="transaction-form__field">
        <label htmlFor="date">
          Data
        </label>

        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      <div className="transaction-form__actions">
        <button
          type="button"
          className="transaction-form__cancel"
          onClick={onCancel}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="transaction-form__submit"
        >
          Salvar transação
        </button>
      </div>
    </form>
  )
}

export default TransactionForm