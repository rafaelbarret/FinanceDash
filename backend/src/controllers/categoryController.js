import {
  getCategories as getCategoriesService,
  createCategory as createCategoryService,
  updateCategory as updateCategoryService,
  deleteCategory as deleteCategoryService,
} from '../services/categoryService.js'

export async function getCategories(
  request,
  response
) {
  try {
    const { user_id } = request.query

    const categories =
      await getCategoriesService(user_id)

    return response.json(categories)
  } catch (error) {
    console.error(
      'Erro ao buscar categorias:',
      error
    )

    return response.status(
      error.statusCode || 500
    ).json({
      message: error.message,
    })
  }
}

export async function createCategory(
  request,
  response
) {
  try {
    const { user_id, name } = request.body

    const category =
      await createCategoryService(
        user_id,
        name
      )

    return response
      .status(201)
      .json(category)
  } catch (error) {
    console.error(
      'Erro ao criar categoria:',
      error
    )

    return response.status(
      error.statusCode || 500
    ).json({
      message: error.message,
    })
  }
}

export async function updateCategory(
  request,
  response
) {
  try {
    const { id } = request.params
    const { user_id, name } = request.body

    const category =
      await updateCategoryService(
        id,
        user_id,
        name
      )

    return response.json(category)
  } catch (error) {
    console.error(
      'Erro ao atualizar categoria:',
      error
    )

    return response.status(
      error.statusCode || 500
    ).json({
      message: error.message,
    })
  }
}

export async function deleteCategory(
  request,
  response
) {
  try {
    const { id } = request.params
    const { user_id } = request.body

    await deleteCategoryService(
      id,
      user_id
    )

    return response.json({
      message: 'Categoria excluída com sucesso.',
      id,
    })
  } catch (error) {
    console.error(
      'Erro ao excluir categoria:',
      error
    )

    return response.status(
      error.statusCode || 500
    ).json({
      message: error.message,
    })
  }
}