import {
  getTransactions as getTransactionsService,
  createTransaction as createTransactionService,
  updateTransaction as updateTransactionService,
  deleteTransaction as deleteTransactionService,
} from '../services/transactionService.js'

export async function getTransactions(
  request,
  response
) {
  try {
    const transactions =
      await getTransactionsService()

    return response.json(transactions)
  } catch (error) {
    console.error(
      'Erro ao buscar transações:',
      error
    )

    return response.status(500).json({
      message: 'Erro ao buscar transações.',
    })
  }
}

export async function createTransaction(
  request,
  response
) {
  try {
    const transaction =
      await createTransactionService(
        request.body
      )

    return response.status(201).json(transaction)
  } catch (error) {
    console.error(
      'Erro ao criar transação:',
      error
    )

    return response.status(
      error.statusCode || 400
    ).json({
      message: error.message,
    })
  }
}

export async function updateTransaction(
  request,
  response
) {
  try {
    const { id } = request.params

    const transaction =
      await updateTransactionService(
        id,
        request.body
      )

    return response.json(transaction)
  } catch (error) {
    console.error(
      'Erro ao atualizar transação:',
      error
    )

    return response.status(
      error.statusCode || 400
    ).json({
      message: error.message,
    })
  }
}

export async function deleteTransaction(
  request,
  response
) {
  try {
    const { id } = request.params

    await deleteTransactionService(id)

    return response.json({
      message: 'Transação excluída com sucesso.',
      id,
    })
  } catch (error) {
    console.error(
      'Erro ao excluir transação:',
      error
    )

    return response.status(
      error.statusCode || 500
    ).json({
      message: error.message,
    })
  }
}