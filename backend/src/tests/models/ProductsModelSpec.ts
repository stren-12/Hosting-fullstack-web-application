import { ProductsModel, Product } from '../../models/Products'
import { isDeepStrictEqual } from 'util'

describe('ProductModel test suite', () => {
  it('Index method', done => {
    const test_data: object[] = [
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

    const products_model = new ProductsModel()
    products_model
      .index()
      .then(data => {
        const result = isDeepStrictEqual(data, test_data)
        expect(result).toBe(true)
        done()
      })
      .catch(e => {
        console.log(e)
        done.fail(e)
      })
  })

  it('Show method', done => {
    const test_data = {
      "id": 1,
      "name": "Book",
      "price": 9.99,
      "url": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "description": "You can read it!"
    }

    const products_model = new ProductsModel()
    products_model
      .show(1)
      .then(data => {
        const result = isDeepStrictEqual(data, test_data)
        expect(result).toBe(true)
        done()
      })
      .catch(e => {
        console.log(e)
        done.fail(e)
      })
  })

  it('Create method', done => {
    const test_data: Product = {
      id: null,
      name: 'Idea Pad 5',
      price: 4500,
      category_id: 1,
      url: 'google.com',
      description: 'Dummy data time'
    }


    const products_model = new ProductsModel()
    products_model
      .create(test_data)
      .then(data => {
        // You don't have to touch the id (above is null not 8) in postgres it will stop increasing the
        // Serial Sequence  hence the next row will take the same id => error
        test_data.id = 7
        const result = isDeepStrictEqual(data, test_data)
        expect(result).toBe(true)
        done()
      })
      .catch(e => {
        console.log(e)
        done.fail()
      })
  })

  it('Products by category method', done => {
    const test_data  = [

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

    const products_model = new ProductsModel()
    products_model
      .products_by_category(2)
      .then(data => {
        const result = isDeepStrictEqual(data, test_data)
        expect(result).toBe(true)
        done()
      })
      .catch(e => {
        console.log(e)
        done.fail()
      })
  })
})
