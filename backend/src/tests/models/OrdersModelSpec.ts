import { OrdersModel, Order } from '../../models/Orders'
import { isDeepStrictEqual } from 'util'

describe('OrdersModel test suite', () => {
  it('Current user orders method', done => {
    const test_data: Order[] = [
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
    const orders_model = new OrdersModel()
    orders_model
      .current_user_orders(1)
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
})
