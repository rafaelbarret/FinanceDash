import { useEffect, useState } from 'react'

import { getCategories } from '../../services/categoryService'

import './TransactionForm.css'

function TransactionForm({
  transaction,
  onSubmit,
  onCancel,
}) {
  const [categories, setCategories] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(true)

  const [formData, setFormData] = useState(() => ({
    description: transaction?.description || '',
    amount: transaction?.amount || '',
    type: transaction?.type || 'expense',
    category_id: transaction?.category_id || '',
    date:
      transaction?.transaction_date ||
      transaction?.date ||
      '',
  }))

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories()

        setCategories(data)

        // Ao editar, mantém a categoria já vinculada.
        // Se o registro antigo não tiver category_id,
        // tenta localizar a categoria pelo nome.
        if (transaction && !transaction.category_id) {
          const matchingCategory = data.find(
            (category) =>
              category.name === transaction.category
          )

          if (matchingCategory) {
            setFormData((previousData) => ({
              ...previousData,
              category_id: matchingCategory.id,
            }))
          }
        }
      } catch (error) {
        console.error(
          'Erro ao carregar categorias:',
          error
        )
      } finally {
        setLoadingCategories(false)
      }
    }

    loadCategories()
  }, [transaction])

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (
      !formData.description.trim() ||
      !formData.amount ||
      !formData.date ||
      !formData.category_id
    ) {
      return
    }

    onSubmit({
      description: formData.description,
      amount: Number(formData.amount),
      type: formData.type,
      category_id: formData.category_id,
      transaction_date: formData.date,
    })
  }

  return (
    <form
      className="transaction-form"
      onSubmit={handleSubmit}
    >
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
        <label htmlFor="category_id">
          Categoria
        </label>

        <select
          id="category_id"
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          disabled={loadingCategories || categories.length === 0}
          required
        >
          <option value="">
            {loadingCategories
              ? 'Carregando categorias...'
              : categories.length === 0
                ? 'Nenhuma categoria cadastrada'
                : 'Selecione uma categoria'}
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
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
          disabled={loadingCategories || categories.length === 0}
        >
          Salvar transação
        </button>
      </div>
    </form>
  )
}

export default TransactionForm