import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import products_routes from './handlers/ProductsRoutes'
import users_routes from './handlers/UsersRoutes'
import orders_routes from './handlers/OrdersRoutes'
import bcrypt from 'bcrypt'
const app: express.Application = express()
const address = '*'
const corsOptions = {
  origin: address,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(bodyParser.json())

app.use(cors(corsOptions))

products_routes(app)
users_routes(app)
orders_routes(app)

// To fix eb health cheacks (if HTTP code is not 200 this will gives you warrning)
app.get("/",async (req: Request, res: Response) => {
  res.status(200).json({"health" : "good"})
})
app.listen(8080, function () {
  console.log(`starting app on: ${address}`)
})

export default app
