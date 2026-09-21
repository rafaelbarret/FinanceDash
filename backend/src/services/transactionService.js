import {
  findAllTransactions,
  createTransaction as createTransactionRepository,
  updateTransaction as updateTransactionRepository,
  deleteTransaction as deleteTransactionRepository,
} from '../repositories/transactionRepository.js'

export async function getTransactions(userId) {
  return findAllTransactions(userId)
}

export async function createTransaction(data) {
  const {
    user_id,
    description,
    amount,
    type,
    transaction_date,
  } = data

  if (
    !user_id ||
    !description ||
    !amount ||
    !type ||
    !transaction_date
  ) {
    const error = new Error(
      'Todos os campos obrigatórios devem ser preenchidos.'
    )

    error.statusCode = 400

    throw error
  }

  if (!['income', 'expense'].includes(type)) {
    const error = new Error(
      'O tipo deve ser income ou expense.'
    )

    error.statusCode = 400

    throw error
  }

  if (Number(amount) <= 0) {
    const error = new Error(
      'O valor deve ser maior que zero.'
    )

    error.statusCode = 400

    throw error
  }

  return createTransactionRepository(data)
}

export async function updateTransaction(
  id,
  userId,
  data
) {
  const {
    description,
    amount,
    type,
    transaction_date,
  } = data

  if (
    !description ||
    !amount ||
    !type ||
    !transaction_date
  ) {
    const error = new Error(
      'Todos os campos obrigatórios devem ser preenchidos.'
    )

    error.statusCode = 400

    throw error
  }

  if (!['income', 'expense'].includes(type)) {
    const error = new Error(
      'O tipo deve ser income ou expense.'
    )

    error.statusCode = 400

    throw error
  }

  if (Number(amount) <= 0) {
    const error = new Error(
      'O valor deve ser maior que zero.'
    )

    error.statusCode = 400

    throw error
  }

  const transaction = await updateTransactionRepository(
    id,
    userId,
    data
  )

  if (!transaction) {
    const error = new Error(
      'Transação não encontrada.'
    )

    error.statusCode = 404

    throw error
  }

  return transaction
}

export async function deleteTransaction(
  id,
  userId
) {
  const transaction = await deleteTransactionRepository(
    id,
    userId
  )

  if (!transaction) {
    const error = new Error(
      'Transação não encontrada.'
    )

    error.statusCode = 404

    throw error
  }

  return transaction
}