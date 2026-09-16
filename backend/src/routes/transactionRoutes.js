import { Router } from 'express'

import {
  getTransactions,
  createTransaction,
  updateTransaction,
} from '../controllers/transactionController.js'

const router = Router()

router.get('/', getTransactions)

router.post('/', createTransaction)

router.put('/:id', updateTransaction)

export default router