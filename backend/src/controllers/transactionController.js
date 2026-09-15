import pool from '../config/database.js'

export async function getTransactions(
  request,
  response
) {
  try {
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

    response.json(result.rows)
  } catch (error) {
    console.error(
      'Erro ao buscar transações:',
      error
    )

    response.status(500).json({
      message: 'Erro ao buscar transações.',
    })
  }
}