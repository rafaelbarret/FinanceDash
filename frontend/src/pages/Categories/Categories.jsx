import { useEffect, useState } from 'react'

import {
  Pencil,
  Trash2,
} from 'lucide-react'

import Modal from '../../components/Modal/Modal'

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../services/categoryService'

import './Categories.css'

const categoryIcons = {
  Alimentação: '🛒',
  Transporte: '🚗',
  Moradia: '🏠',
  Lazer: '🎮',
  Saúde: '❤️',
  Educação: '📚',
  Outros: '📦',
  Trabalho: '💼',
  Viagem: '✈️',
}

function Categories() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)

  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState([])

  const [categoryName, setCategoryName] = useState('')
  const [categoryIcon, setCategoryIcon] = useState('📦')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true)
        setError('')

        const data = await getCategories()

        const formattedCategories = data.map(
          (category) => ({
            ...category,
            icon:
              categoryIcons[category.name] || '📦',
            transactions: 0,
          })
        )

        setCategories(formattedCategories)
      } catch (error) {
        console.error(
          'Erro ao carregar categorias:',
          error
        )

        setError(
          error.response?.data?.message ||
            'Não foi possível carregar as categorias.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

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
    setCategoryIcon(category.icon || '📦')
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setEditingCategory(null)
    setCategoryName('')
    setCategoryIcon('📦')
  }

  async function handleSaveCategory(event) {
    event.preventDefault()

    const name = categoryName.trim()

    if (!name) {
      return
    }

    try {
      if (editingCategory) {
        const updatedCategory =
          await updateCategory(
            editingCategory.id,
            name
          )

        setCategories(
          (previousCategories) =>
            previousCategories.map((category) =>
              category.id === editingCategory.id
                ? {
                    ...category,
                    ...updatedCategory,
                    icon: categoryIcon,
                  }
                : category
            )
        )
      } else {
        const newCategory =
          await createCategory(name)

        setCategories(
          (previousCategories) => [
            ...previousCategories,
            {
              ...newCategory,
              icon: categoryIcon,
              transactions: 0,
            },
          ]
        )
      }

      handleCloseModal()
    } catch (error) {
      console.error(
        'Erro ao salvar categoria:',
        error
      )

      window.alert(
        error.response?.data?.message ||
          'Não foi possível salvar a categoria.'
      )
    }
  }

  async function handleDelete(category) {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir a categoria "${category.name}"?`
    )

    if (!confirmed) {
      return
    }

    try {
      await deleteCategory(category.id)

      setCategories(
        (previousCategories) =>
          previousCategories.filter(
            (item) => item.id !== category.id
          )
      )
    } catch (error) {
      console.error(
        'Erro ao excluir categoria:',
        error
      )

      window.alert(
        error.response?.data?.message ||
          'Não foi possível excluir a categoria.'
      )
    }
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
            {loading ? (
              <tr>
                <td
                  colSpan="3"
                  className="categories__empty"
                >
                  Carregando categorias...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  colSpan="3"
                  className="categories__empty"
                >
                  {error}
                </td>
              </tr>
            ) : filteredCategories.length > 0 ? (
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
              <option value="🛒">
                🛒 Alimentação
              </option>

              <option value="🚗">
                🚗 Transporte
              </option>

              <option value="🏠">
                🏠 Moradia
              </option>

              <option value="🎮">
                🎮 Lazer
              </option>

              <option value="❤️">
                ❤️ Saúde
              </option>

              <option value="📚">
                📚 Educação
              </option>

              <option value="📦">
                📦 Outros
              </option>

              <option value="💼">
                💼 Trabalho
              </option>

              <option value="✈️">
                ✈️ Viagem
              </option>
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