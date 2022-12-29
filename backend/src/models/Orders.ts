import client from '../database'

export type OrderItem = {
  id: number
  order_id: number
  product_id: number
  quantity: number
}
export type Order = {
  id: number
  user_id: number
  status: string
  // Null to be filled later
  detailes: OrderItem[] | null
}

export class OrdersModel {
  async current_user_orders(user_id: number): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=$1'
      const result = await client.query(sql, [user_id])
      const rows = result.rows
      for (const row of rows) {
        row.detailes = await this.get_order_details(row.id)
      }
      return rows
    } catch (error) {
      throw new Error(`DB error ${error}`)
    }
  }

  // No need to test this method to it't sub-method for above method
  // And we can varify the result by test the result of above method only
  async get_order_details(order_id: number): Promise<OrderItem[]> {
    try {
      const sql = 'SELECT * FROM orders_details WHERE order_id=$1'
      const result = await client.query(sql, [order_id])
      return result.rows
    } catch (error) {
      throw new Error(`DB error ${error}`)
    }
  }
}
