import express, { Request, Response } from 'express'
import { User, UsersModel } from '../models/Users'
import { body, check, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
const verifyAuthToken = (
  req: Request,
  res: Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader == undefined) {
      return res.status(401).json({ errors: 'no auth token was provided' })
    }
    const token = authorizationHeader.split(' ')[1]

    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET || 'LONG_PASSWORD_IF_SECRET_IS_NOT_FOUND'
    )

    next()
  } catch (error) {
    res.status(401)
  }
}

export default verifyAuthToken
