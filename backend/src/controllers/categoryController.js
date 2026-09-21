import {
  getCategories as getCategoriesService,
  createCategory as createCategoryService,
  updateCategory as updateCategoryService,
  deleteCategory as deleteCategoryService,
} from '../services/categoryService.js'

export async function getCategories(request, response) {
  try {
    const userId = request.user.userId

    const categories = await getCategoriesService(userId)

    return response.status(200).json(categories)
  } catch (error) {
    console.error(
      'Erro ao buscar categorias:',
      error.message
    )

    return response.status(
      error.statusCode || 500
    ).json({
      message:
        error.statusCode
          ? error.message
          : 'Erro interno do servidor.',
    })
  }
}

export async function createCategory(request, response) {
  try {
    const userId = request.user.userId

    const category = await createCategoryService(
      userId,
      request.body.name
    )

    return response.status(201).json(category)
  } catch (error) {
    console.error(
      'Erro ao criar categoria:',
      error.message
    )

    return response.status(
      error.statusCode || 500
    ).json({
      message:
        error.statusCode
          ? error.message
          : 'Erro interno do servidor.',
    })
  }
}

export async function updateCategory(request, response) {
  try {
    const userId = request.user.userId
    const { id } = request.params

    const category = await updateCategoryService(
      id,
      userId,
      request.body.name
    )

    return response.status(200).json(category)
  } catch (error) {
    console.error(
      'Erro ao atualizar categoria:',
      error.message
    )

    return response.status(
      error.statusCode || 500
    ).json({
      message:
        error.statusCode
          ? error.message
          : 'Erro interno do servidor.',
    })
  }
}

export async function deleteCategory(request, response) {
  try {
    const userId = request.user.userId
    const { id } = request.params

    await deleteCategoryService(
      id,
      userId
    )

    return response.status(200).json({
      message: 'Categoria excluída com sucesso!',
    })
  } catch (error) {
    console.error(
      'Erro ao excluir categoria:',
      error.message
    )

    return response.status(
      error.statusCode || 500
    ).json({
      message:
        error.statusCode
          ? error.message
          : 'Erro interno do servidor.',
    })
  }
}