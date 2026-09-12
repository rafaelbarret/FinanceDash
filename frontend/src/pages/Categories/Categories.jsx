import { useState } from 'react'
import {
  Pencil,
  Trash2,
} from 'lucide-react'

import Modal from '../../components/Modal/Modal'

import './Categories.css'

function Categories() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)

  const [search, setSearch] = useState('')

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Alimentação',
      icon: '🛒',
      transactions: 1,
    },
    {
      id: 2,
      name: 'Transporte',
      icon: '🚗',
      transactions: 1,
    },
    {
      id: 3,
      name: 'Moradia',
      icon: '🏠',
      transactions: 0,
    },
    {
      id: 4,
      name: 'Lazer',
      icon: '🎮',
      transactions: 1,
    },
    {
      id: 5,
      name: 'Saúde',
      icon: '❤️',
      transactions: 0,
    },
    {
      id: 6,
      name: 'Educação',
      icon: '📚',
      transactions: 0,
    },
    {
      id: 7,
      name: 'Outros',
      icon: '📦',
      transactions: 0,
    },
  ])

  const [categoryName, setCategoryName] = useState('')
  const [categoryIcon, setCategoryIcon] = useState('📦')

  const filteredCategories = categories.filter(
    (category) =>
      category.name
        .toLowerCase()
        .includes(search.toLowerCase())
  )

  function handleOpenCreate() {
    setEditingCategory(null)
    setCategoryName('')
    setCategoryIcon('📦')
    setIsModalOpen(true)
  }

  function handleEdit(category) {
    setEditingCategory(category)
    setCategoryName(category.name)
    setCategoryIcon(category.icon)
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setEditingCategory(null)
    setCategoryName('')
    setCategoryIcon('📦')
  }

  function handleSaveCategory(event) {
    event.preventDefault()

    if (!categoryName.trim()) {
      return
    }

    if (editingCategory) {
      setCategories((previousCategories) =>
        previousCategories.map((category) =>
          category.id === editingCategory.id
            ? {
                ...category,
                name: categoryName.trim(),
                icon: categoryIcon,
              }
            : category
        )
      )
    } else {
      const newCategory = {
        id: Date.now(),
        name: categoryName.trim(),
        icon: categoryIcon,
        transactions: 0,
      }

      setCategories((previousCategories) => [
        ...previousCategories,
        newCategory,
      ])
    }

    handleCloseModal()
  }

  function handleDelete(category) {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir a categoria "${category.name}"?`
    )

    if (!confirmed) {
      return
    }

    setCategories((previousCategories) =>
      previousCategories.filter(
        (item) => item.id !== category.id
      )
    )
  }

  return (
    <section className="categories">
      <div className="categories__heading">
        <div>
          <h1>Categorias</h1>
          <p>
            Organize suas receitas e despesas por categoria.
          </p>
        </div>

        <button
          type="button"
          className="categories__add-button"
          onClick={handleOpenCreate}
        >
          + Nova categoria
        </button>
      </div>

      <div className="categories__filters">
        <input
          type="text"
          placeholder="Buscar categoria..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />
      </div>

      <div className="categories__table-container">
        <table className="categories__table">
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Transações</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <tr key={category.id}>
                  <td>
                    <div className="categories__name">
                      <div className="categories__icon">
                        {category.icon}
                      </div>

                      <strong>
                        {category.name}
                      </strong>
                    </div>
                  </td>

                  <td>
                    {category.transactions}
                  </td>

                  <td className="categories__actions">
                    <button
                      type="button"
                      className="categories__action categories__action--edit"
                      onClick={() =>
                        handleEdit(category)
                      }
                      aria-label={`Editar ${category.name}`}
                      title="Editar categoria"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      className="categories__action categories__action--delete"
                      onClick={() =>
                        handleDelete(category)
                      }
                      aria-label={`Excluir ${category.name}`}
                      title="Excluir categoria"
                    >
                      <Trash2 size={17} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="categories__empty"
                >
                  Nenhuma categoria encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          editingCategory
            ? 'Editar categoria'
            : 'Nova categoria'
        }
      >
        <form
          className="category-form"
          onSubmit={handleSaveCategory}
        >
          <div className="category-form__field">
            <label htmlFor="category-name">
              Nome da categoria
            </label>

            <input
              id="category-name"
              type="text"
              placeholder="Ex: Alimentação"
              value={categoryName}
              onChange={(event) =>
                setCategoryName(event.target.value)
              }
            />
          </div>

          <div className="category-form__field">
            <label htmlFor="category-icon">
              Ícone
            </label>

            <select
              id="category-icon"
              value={categoryIcon}
              onChange={(event) =>
                setCategoryIcon(event.target.value)
              }
            >
              <option value="🛒">🛒 Alimentação</option>
              <option value="🚗">🚗 Transporte</option>
              <option value="🏠">🏠 Moradia</option>
              <option value="🎮">🎮 Lazer</option>
              <option value="❤️">❤️ Saúde</option>
              <option value="📚">📚 Educação</option>
              <option value="📦">📦 Outros</option>
              <option value="💼">💼 Trabalho</option>
              <option value="✈️">✈️ Viagem</option>
            </select>
          </div>

          <div className="category-form__actions">
            <button
              type="button"
              className="category-form__cancel"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="category-form__submit"
            >
              Salvar categoria
            </button>
          </div>
        </form>
      </Modal>
    </section>
  )
}

export default Categories