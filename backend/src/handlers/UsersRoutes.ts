import express, { Request, Response } from 'express'
import { User, UsersModel } from '../models/Users'
import { body, param, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import verifyAuthToken from './auth'

const model = new UsersModel()

const show_validation_rules = [
  // 2147483647 is the maximum value for INT type in postgres
  // see: https://www.postgresql.org/docs/current/datatype-numeric.html
  verifyAuthToken,
  param('user_id').notEmpty().isInt({ min: 1, max: 2147483647 }),
]

const create_validation_rules = [
  verifyAuthToken,
  body('username').notEmpty().isLength({ min: 3, max: 255 }),
  body('first_name').notEmpty().isLength({ min: 3, max: 255 }),
  body('last_name').notEmpty().isLength({ min: 3, max: 255 }),
  body('password').notEmpty().isLength({ min: 4, max: 60 }),
]

const authenticate_validation_rules = [
  body('username').notEmpty().isLength({ min: 3, max: 255 }),
  body('password').notEmpty().isLength({ min: 4, max: 60 }),
]

const index = async (req: Request, res: Response) => {
  try {
    const result = await model.index()
    return res.json(result)
  } catch (error) {
    res.status(500).json({ errors: 'an error has occurred' })
    console.log(error)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const user_id = parseInt(req.params.user_id)
    const result = await model.show(user_id)
    return res.json(result)
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

    const user: User = {
      id: null,
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password_digest: req.body.password,
    }
    const userRecourd = await model.create(user)
    const token = jwt.sign(
      { user: userRecourd },
      process.env.TOKEN_SECRET || 'LONG_PASSWORD_IF_SECRET_IS_NOT_FOUND'
    )
    res.json(token)
  } catch (error) {
    res.status(500).json({ errors: 'an error has occurred' })
    console.log(error)
  }
}

const authenticate = async (req: Request, res: Response) => {
  try {
    const result = await model.authenticate(
      req.body.username,
      req.body.password
    )
    // For security reasons we shouldn't tell user if he enter wrong password or username
    // see: https://superuser.com/questions/1048747/username-or-password-is-incorrect-why-not-specify-which
    if (result == null) {
      return res.status(401).json({ errors: 'wrong username or password' })
    }
    const token = jwt.sign(
      { user: result },
      process.env.TOKEN_SECRET || 'LONG_PASSWORD_IF_SECRET_IS_NOT_FOUND'
    )
    res.json(token)
  } catch (error) {
    res.status(500).json({ errors: 'an error has occurred' })
    console.log(error)
  }
}

const users_routes = (app: express.Application) => {
  app.post('/users', create_validation_rules, create)
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:user_id', show_validation_rules, show)
  app.post('/users/authenticate', authenticate_validation_rules, authenticate)
}

export default users_routes
