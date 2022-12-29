import express, { Request, Response } from 'express'
import { param, body, validationResult } from 'express-validator'

import { Order, OrdersModel } from '../models/Orders'
import verifyAuthToken from './auth'

const model = new OrdersModel()

const current_user_orders_validation_rules = [
  verifyAuthToken,
  param('user_id').notEmpty().isInt({ min: 1, max: 2147483647 }),
]
const current_user_orders = async (req: Request, res: Response) => {
  const re = await model.current_user_orders(parseInt(req.params.user_id))
  res.json(re)
}

const orders_routes = (app: express.Application) => {
  app.get(
    '/orders/current_user_orders/:user_id',
    current_user_orders_validation_rules,
    current_user_orders
  )
}

export default orders_routes
