import pool from '../config/database.js'

export async function findAllTransactions(userId) {
  const result = await pool.query(
    `
      SELECT
        transactions.id,
        transactions.user_id,
        transactions.category_id,
        transactions.description,
        transactions.amount,
        transactions.type,
        transactions.transaction_date,
        transactions.created_at,
        transactions.updated_at,
        categories.name AS category_name
      FROM transactions
      LEFT JOIN categories
        ON transactions.category_id = categories.id
      WHERE transactions.user_id = $1
      ORDER BY transactions.transaction_date DESC
    `,
    [userId]
  )

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

export async function updateTransaction(
  id,
  userId,
  data
) {
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
        AND user_id = $7
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
      userId,
    ]
  )

  return result.rows[0]
}

export async function deleteTransaction(
  id,
  userId
) {
  const result = await pool.query(
    `
      DELETE FROM transactions
      WHERE id = $1
        AND user_id = $2
      RETURNING id
    `,
    [id, userId]
  )

  return result.rows[0]
}