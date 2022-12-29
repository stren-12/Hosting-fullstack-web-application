import { ProductsModel, Product } from '../../models/Products'
import { isDeepStrictEqual } from 'util'

describe('ProductModel test suite', () => {
  it('Index method', done => {
    const test_data: Product[] = [
      { id: 1, name: 'Google Pixel 6', price: 2650, category_id: 1 },
      { id: 2, name: 'Samsung S22', price: 2700, category_id: 1 },
      { id: 3, name: 'Think Pad', price: 4000, category_id: 2 },
      { id: 4, name: 'Apple Macbook Air', price: 6000, category_id: 2 },
      { id: 5, name: 'Asus gaming PC', price: 7300, category_id: 3 },
      { id: 6, name: 'Dell OptiPlex', price: 2000, category_id: 3 },
      { id: 7, name: 'Idea Pad 5', price: 4500, category_id: 1 },
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
    const test_data: Product = {
      id: 1,
      name: 'Google Pixel 6',
      price: 2650,
      category_id: 1,
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
    }

    const products_model = new ProductsModel()
    products_model
      .create(test_data)
      .then(data => {
        // You don't have to touch the id (above is null not 8) in postgres it will stop increasing the
        // Serial Sequence  hence the next row will take the same id => error
        test_data.id = 8
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
    const test_data: Product[] = [
      { id: 3, name: 'Think Pad', price: 4000, category_id: 2 },
      { id: 4, name: 'Apple Macbook Air', price: 6000, category_id: 2 },
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
