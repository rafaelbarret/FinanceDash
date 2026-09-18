import pool from '../config/database.js'

export async function findAllCategories(userId) {
  const result = await pool.query(
    `
      SELECT
        id,
        user_id,
        name,
        created_at
      FROM categories
      WHERE user_id = $1
      ORDER BY name ASC
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