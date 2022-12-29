import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import products_routes from './handlers/ProductsRoutes'
import users_routes from './handlers/UsersRoutes'
import orders_routes from './handlers/OrdersRoutes'
import bcrypt from 'bcrypt'
const app: express.Application = express()
const address = 'localhost'
const corsOptions = {
  origin: address,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(bodyParser.json())

app.use(cors(corsOptions))

products_routes(app)
users_routes(app)
orders_routes(app)
app.listen(8081, function () {
  console.log(`starting app on: ${address}`)
})

export default app
