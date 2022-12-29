import { Order } from '../../models/Orders'
import { isDeepStrictEqual } from 'util'
import supertest from 'supertest'
import app from '../../server'
import { response } from 'express'

// Global variable (why we use let here not const)
let token: string

describe('OrdersRoutes test suite', () => {
  beforeAll(done => {
    supertest(app)
      .post('/users/authenticate/')
      .expect(200)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ username: 'sultan', password: 'password' })
      .then(response => {
        token = response.body
        done()
      })
      .catch(e => {
        console.log(e)
        done.fail(e)
      })
  })
  it('A SHOW route: /orders/current_user_orders/:user_id [GET]', done => {
    supertest(app)
      .get('/orders/current_user_orders/1')
      .expect(200)
      .set('Authorization', 'bearer ' + token)
      .then(response => {
        const test_data = [
          {
            id: 1,
            user_id: 1,
            status: 'complete',
            detailes: [
              {
                id: 1,
                order_id: 1,
                product_id: 1,
                quantity: 2,
              },
              {
                id: 2,
                order_id: 1,
                product_id: 6,
                quantity: 1,
              },
            ],
          },
        ]
        const result = isDeepStrictEqual(response.body, test_data)
        expect(result).toEqual(true)
        done()
      })
      .catch(e => {
        console.log(e)
        done.fail(e)
      })
  })
})
