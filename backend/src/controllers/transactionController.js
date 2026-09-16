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

export async function createTransaction(
  request,
  response
) {
  try {
    const {
      user_id,
      category_id,
      description,
      amount,
      type,
      transaction_date,
    } = request.body

    if (
      !user_id ||
      !description ||
      !amount ||
      !type ||
      !transaction_date
    ) {
      return response.status(400).json({
        message: 'Preencha todos os campos obrigatórios.',
      })
    }

    if (!['income', 'expense'].includes(type)) {
      return response.status(400).json({
        message: 'Tipo de transação inválido.',
      })
    }

    if (Number(amount) <= 0) {
      return response.status(400).json({
        message: 'O valor deve ser maior que zero.',
      })
    }

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

    return response.status(201).json(result.rows[0])
  } catch (error) {
    console.error(
      'Erro ao criar transação:',
      error
    )

    return response.status(500).json({
      message: 'Erro ao criar transação.',
    })
  }
}