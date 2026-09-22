import api from './api'

export async function getTransactions() {
  const response = await api.get('/transactions')

  return response.data
}

export async function deleteTransaction(id) {
  const response = await api.delete(
    `/transactions/${id}`
  )

  return response.data
}

export async function updateTransaction(
  id,
  transactionData
) {
  const response = await api.put(
    `/transactions/${id}`,
    transactionData
  )

  return response.data
}

export async function createTransaction(
  transactionData
) {
  const response = await api.post(
    '/transactions',
    transactionData
  )

  return response.data
}


