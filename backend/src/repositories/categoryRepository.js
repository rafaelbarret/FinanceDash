import pool from '../config/database.js'

export async function findAllCategories(userId) {
  const result = await pool.query(
    `
      SELECT
        categories.id,
        categories.user_id,
        categories.name,
        categories.created_at,
        COUNT(transactions.id)::INTEGER AS transaction_count

      FROM categories

      LEFT JOIN transactions
        ON transactions.category_id = categories.id
        AND transactions.user_id = categories.user_id

      WHERE categories.user_id = $1

      GROUP BY
        categories.id,
        categories.user_id,
        categories.name,
        categories.created_at

      ORDER BY categories.name ASC
    `,
    [userId]
  )

  return result.rows
}

export async function createCategory(userId, name) {
  const result = await pool.query(
    `
      INSERT INTO categories (
        user_id,
        name
      )
      VALUES ($1, $2)
      RETURNING
        id,
        user_id,
        name,
        created_at
    `,
    [userId, name]
  )

  return result.rows[0]
}

export async function updateCategory(
  id,
  userId,
  name
) {
  const result = await pool.query(
    `
      UPDATE categories
      SET
        name = $1
      WHERE id = $2
        AND user_id = $3
      RETURNING
        id,
        user_id,
        name,
        created_at
    `,
    [name, id, userId]
  )

  return result.rows[0]
}

export async function deleteCategory(
  id,
  userId
) {
  const result = await pool.query(
    `
      DELETE FROM categories
      WHERE id = $1
        AND user_id = $2
      RETURNING id
    `,
    [id, userId]
  )

  return result.rows[0]
}