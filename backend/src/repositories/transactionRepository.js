import pool from '../config/database.js'

export async function findAllTransactions() {
  const result = await pool.query(`
    SELECT
      id,
      user_id,
      category_id,
      description,
      amount,
      type,
      transaction_date,
      created_at,
      updated_at
    FROM transactions
    ORDER BY transaction_date DESC
  `)

  return result.rows
}

export async function createTransaction(data) {
  const {
    user_id,
    category_id,
    description,
    amount,
    type,
    transaction_date,
  } = data

  const result = await pool.query(
    `
      INSERT INTO transactions (
        user_id,
        category_id,
        description,
        amount,
        type,
        transaction_date
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING
        id,
        user_id,
        category_id,
        description,
        amount,
        type,
        transaction_date,
        created_at,
        updated_at
    `,
    [
      user_id,
      category_id || null,
      description,
      amount,
      type,
      transaction_date,
    ]
  )

  return result.rows[0]
}

export async function updateTransaction(id, data) {
  const {
    category_id,
    description,
    amount,
    type,
    transaction_date,
  } = data

  const result = await pool.query(
    `
      UPDATE transactions
      SET
        category_id = $1,
        description = $2,
        amount = $3,
        type = $4,
        transaction_date = $5,
        updated_at = NOW()
      WHERE id = $6
      RETURNING
        id,
        user_id,
        category_id,
        description,
        amount,
        type,
        transaction_date,
        created_at,
        updated_at
    `,
    [
      category_id || null,
      description,
      amount,
      type,
      transaction_date,
      id,
    ]
  )

  return result.rows[0]
}

export async function deleteTransaction(id) {
  const result = await pool.query(
    `
      DELETE FROM transactions
      WHERE id = $1
      RETURNING id
    `,
    [id]
  )

  return result.rows[0]
}