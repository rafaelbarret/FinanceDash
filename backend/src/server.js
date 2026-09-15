import app from './app.js'
import pool from './config/database.js'

const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    await pool.query('SELECT NOW()')

    console.log('🟢 PostgreSQL conectado com sucesso!')

    app.listen(PORT, () => {
      console.log(
        `🚀 FinanceDash API rodando na porta ${PORT}`
      )
    })
  } catch (error) {
    console.error(
      '🔴 Erro ao conectar ao PostgreSQL:',
      error.message
    )

    process.exit(1)
  }
}

startServer()