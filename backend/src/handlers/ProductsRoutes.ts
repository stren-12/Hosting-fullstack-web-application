import express, { Request, Response } from 'express'
import { param, body, validationResult } from 'express-validator'

import { Product, ProductsModel } from '../models/Products'
import verifyAuthToken from './auth'

const model = new ProductsModel()

const products_by_category_validation_rules = [
  param('category_id').notEmpty().isInt({ min: 1, max: 2147483647 }),
]

const create_validation_rules = [
  verifyAuthToken,
  body('name').notEmpty().isLength({ min: 4, max: 255 }),
  body('price').notEmpty().isFloat({ min: 1, max: 2147483647 }),
  body('category_id').notEmpty().isInt({ min: 1, max: 2147483647 }),
]
const index = async (_req: Request, res: Response) => {
  try {
    const products = await model.index()
    if (products.length === 0) {
      res.status(404).json({ error: 'Not found' })
    } else {
      res.json(products)
    }
  } catch (error) {
    res.status(500).json({ errors: 'an error has occurred' })
    console.log(error)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number
    const product = await model.show(parseInt(req.params.product_id))
    if (product == undefined) {
      res.status(404).json({ error: 'Not found' })
    } else {
      res.json(product)
    }
  } catch (error) {
    res.status(500).json({ errors: 'an error has occurred' })
    console.log(error)
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const newProduct: Product = {
      id: null,
      name: req.body.name,
      price: parseFloat(req.body.price),
      category_id: parseInt(req.body.category_id),
    }
    const product = await model.create(newProduct)
    res.json(product)
  } catch (error) {
    res.status(500).json({ errors: 'an error has occurred' })
    console.log(error)
  }
}

const products_by_category = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const category_id = parseInt(req.params.category_id)

    const result = await model.products_by_category(category_id)
    res.json(result)
  } catch (error) {
    res.status(500).json({ errors: 'an error has occurred' })
    console.log(error)
  }
}

const products_routes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:product_id', show)
  app.post('/products', create_validation_rules, create)
  app.get(
    '/products/by_category/:category_id',
    products_by_category_validation_rules,
    products_by_category
  )
}

export default products_routes
