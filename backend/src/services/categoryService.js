import {
  findAllCategories,
  createCategory as createCategoryRepository,
  updateCategory as updateCategoryRepository,
  deleteCategory as deleteCategoryRepository,
} from '../repositories/categoryRepository.js'

export async function getCategories(userId) {
  if (!userId) {
    const error = new Error(
      'Usuário não informado.'
    )

    error.statusCode = 400

    throw error
  }

  return findAllCategories(userId)
}

export async function createCategory(
  userId,
  name
) {
  if (!userId) {
    const error = new Error(
      'Usuário não informado.'
    )

    error.statusCode = 400

    throw error
  }

  if (!name || !name.trim()) {
    const error = new Error(
      'O nome da categoria é obrigatório.'
    )

    error.statusCode = 400

    throw error
  }

  return createCategoryRepository(
    userId,
    name.trim()
  )
}

export async function updateCategory(
  id,
  userId,
  name
) {
  if (!name || !name.trim()) {
    const error = new Error(
      'O nome da categoria é obrigatório.'
    )

    error.statusCode = 400

    throw error
  }

  const category =
    await updateCategoryRepository(
      id,
      userId,
      name.trim()
    )

  if (!category) {
    const error = new Error(
      'Categoria não encontrada.'
    )

    error.statusCode = 404

    throw error
  }

  return category
}

export async function deleteCategory(
  id,
  userId
) {
  const category =
    await deleteCategoryRepository(
      id,
      userId
    )

  if (!category) {
    const error = new Error(
      'Categoria não encontrada.'
    )

    error.statusCode = 404

    throw error
  }

  return category
}