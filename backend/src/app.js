import express from 'express'
import cors from 'cors'

import transactionRoutes from './routes/transactionRoutes.js'

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

export default app