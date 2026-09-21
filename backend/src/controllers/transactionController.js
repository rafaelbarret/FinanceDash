import {
  getTransactions as getTransactionsService,
  createTransaction as createTransactionService,
  updateTransaction as updateTransactionService,
  deleteTransaction as deleteTransactionService,
} from '../services/transactionService.js'

export async function getTransactions(request, response) {
  try {
    const userId = request.user.userId

    const transactions = await getTransactionsService(userId)

    return response.status(200).json(transactions)
  } catch (error) {
    console.error(
      'Erro ao buscar transações:',
      error.message
    )

    return response.status(error.statusCode || 500).json({
      message: error.statusCode
        ? error.message
        : 'Erro interno do servidor.',
    })
  }
}

export async function createTransaction(request, response) {
  try {
    const userId = request.user.userId

    const transactionData = {
      ...request.body,
      user_id: userId,
    }

    const transaction = await createTransactionService(
      transactionData
    )

    return response.status(201).json(transaction)
  } catch (error) {
    console.error(
      'Erro ao criar transação:',
      error.message
    )

    return response.status(error.statusCode || 500).json({
      message: error.statusCode
        ? error.message
        : 'Erro interno do servidor.',
    })
  }
}

export async function updateTransaction(request, response) {
  try {
    const userId = request.user.userId
    const { id } = request.params

    const transaction = await updateTransactionService(
      id,
      userId,
      request.body
    )

    return response.status(200).json(transaction)
  } catch (error) {
    console.error(
      'Erro ao atualizar transação:',
      error.message
    )

    return response.status(error.statusCode || 500).json({
      message: error.statusCode
        ? error.message
        : 'Erro interno do servidor.',
    })
  }
}

export async function deleteTransaction(request, response) {
  try {
    const userId = request.user.userId
    const { id } = request.params

    await deleteTransactionService(id, userId)

    return response.status(200).json({
      message: 'Transação excluída com sucesso!',
    })
  } catch (error) {
    console.error(
      'Erro ao excluir transação:',
      error.message
    )

    return response.status(error.statusCode || 500).json({
      message: error.statusCode
        ? error.message
        : 'Erro interno do servidor.',
    })
  }
}