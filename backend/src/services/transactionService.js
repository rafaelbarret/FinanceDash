import {
  findAllTransactions,
  createTransaction as createTransactionRepository,
  updateTransaction as updateTransactionRepository,
  deleteTransaction as deleteTransactionRepository,
} from '../repositories/transactionRepository.js'

export async function getTransactions() {
  return findAllTransactions()
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
    throw new Error(
      'Preencha todos os campos obrigatórios.'
    )
  }

  if (!['income', 'expense'].includes(type)) {
    throw new Error(
      'Tipo de transação inválido.'
    )
  }

  if (Number(amount) <= 0) {
    throw new Error(
      'O valor deve ser maior que zero.'
    )
  }

  return createTransactionRepository(data)
}

export async function updateTransaction(id, data) {
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
    throw new Error(
      'Preencha todos os campos obrigatórios.'
    )
  }

  if (!['income', 'expense'].includes(type)) {
    throw new Error(
      'Tipo de transação inválido.'
    )
  }

  if (Number(amount) <= 0) {
    throw new Error(
      'O valor deve ser maior que zero.'
    )
  }

  const transaction =
    await updateTransactionRepository(
      id,
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

export async function deleteTransaction(id) {
  const transaction =
    await deleteTransactionRepository(id)

  if (!transaction) {
    const error = new Error(
      'Transação não encontrada.'
    )

    error.statusCode = 404

    throw error
  }

  return transaction
}