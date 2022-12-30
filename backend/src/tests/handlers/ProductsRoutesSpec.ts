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
            name: 'Book',
            price: 9.99,
            url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            description: 'You can read it!'
          },
          {
            id: 2,
            name: 'Headphones',
            price: 249.99,
            url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            description: 'Listen to stuff!'
          },
          {
            id: 3,
            name: 'Backpack',
            price: 79.99,
            url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            description: 'Carry things around town!'
          },
          {
            id: 4,
            name: 'Glasses',
            price: 129.99,
            url: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            description: 'description Now you can see!'
          },
          {
            id: 5,
            name: 'name Cup',
            price: 4.99,
            url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            description: 'description Drink anything with it!'
          },
          {
            id: 6,
            name: 'name Shirt',
            price: 29.99,
            url: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80',
            description: 'description Wear it with style!'
          }
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
        const test_data =   {
          id: 6,
          name: 'name Shirt',
          price: 29.99,
          url: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80',
          description: 'description Wear it with style!'
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
        const test_data =  [
          
            {
              id: 4,
              name: 'Glasses',
              price: 129.99,
              url: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              description: 'description Now you can see!'
            },
            {
              id: 5,
              name: 'name Cup',
              price: 4.99,
              url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              description: 'description Drink anything with it!'
            }
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
