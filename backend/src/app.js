import express from 'express'
import cors from 'cors'

import transactionRoutes from './routes/transactionRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.json({
    message: 'FinanceDash API está funcionando!',
  })
})

app.use(
  '/api/transactions',
  transactionRoutes
)

app.use(
  '/api/categories',
  categoryRoutes
)

app.use(
  '/api/auth',
  authRoutes
)

export default app