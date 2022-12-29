import { Product } from '../../models/Products'
import { isDeepStrictEqual } from 'util'
import supertest from 'supertest'
import app from '../../server'

// Global variable (why we use let here not const)
let token: string

describe('ProductsRoutes test suite', () => {
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
  it('An INDEX route: /products [GET]', done => {
    supertest(app)
      .get('/products')
      .expect(200)
      .then(response => {
        const test_data = [
          {
            id: 1,
            name: 'Google Pixel 6',
            price: 2650.0,
            category_id: 1,
          },
          {
            id: 2,
            name: 'Samsung S22',
            price: 2700.0,
            category_id: 1,
          },
          {
            id: 3,
            name: 'Think Pad',
            price: 4000.0,
            category_id: 2,
          },
          {
            id: 4,
            name: 'Apple Macbook Air',
            price: 6000.0,
            category_id: 2,
          },
          {
            id: 5,
            name: 'Asus gaming PC',
            price: 7300.0,
            category_id: 3,
          },
          {
            id: 6,
            name: 'Dell OptiPlex',
            price: 2000.0,
            category_id: 3,
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
  it('A SHOW route: /products/:product_id [GET]', done => {
    supertest(app)
      .get('/products/6')
      .expect(200)
      .then(response => {
        const test_data = {
          id: 6,
          name: 'Dell OptiPlex',
          price: 2000,
          category_id: 3,
        }

        const result = isDeepStrictEqual(response.body, test_data)
        expect(result).toEqual(true)
        done()
      })
      .catch(e => {
        console.log(e)
        done.fail(e)
      })
  })

  it('A CREATE route: /products/ [POST]', done => {
    supertest(app)
      .post('/products/')
      .set('Authorization', 'bearer ' + token)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ name: 'Idea Pad 5', price: 4500.0, category_id: 1 })
      .expect(200)
      .then(response => {
        const test_data: Product = {
          id: 7,
          name: 'Idea Pad 5',
          price: 4500,
          category_id: 1,
        }

        const result = isDeepStrictEqual(response.body, test_data)
        expect(result).toEqual(true)
        done()
      })
      .catch(e => {
        console.log(e)
        done.fail(e)
      })
  })

  it('A SHOW route: /products/by_category/:category_id [GET]', done => {
    supertest(app)
      .get('/products/by_category/2')
      .then(response => {
        const test_data: Product[] = [
          { id: 3, name: 'Think Pad', price: 4000, category_id: 2 },
          { id: 4, name: 'Apple Macbook Air', price: 6000, category_id: 2 },
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
