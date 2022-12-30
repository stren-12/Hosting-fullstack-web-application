import client from '../database'

export type Product = {
  id: number | null
  name: string
  price: number
  category_id: number,
  url: string,
  description: string
}

export class ProductsModel {
  async index(): Promise<Product[]> {
    try {
      const sql = 'SELECT id,name,price,url,description FROM products'
      const result = await client.query(sql)
      return result.rows
    } catch (error) {
      throw new Error(`DB error ${error}`)
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const sql = 'SELECT id,name,price,url,description FROM products WHERE id = $1'
      const result = await client.query(sql, [id])
      return result.rows[0]
    } catch (error) {
      throw new Error(`DB error ${error}`)
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products(name, price ,category_id,url,description) VALUES ($1, $2, $3, $4, $5) RETURNING * '
      const result = await client.query(sql, [
        product.name,
        product.price,
        product.category_id,
        product.url,
        product.description
      ])
      return result.rows[0]
    } catch (error) {
      throw new Error(`DB error ${error}`)
    }
  }

  async products_by_category(category_id: number): Promise<Product[]> {
    try {
      const sql = 'SELECT id,name,price,url,description  FROM products WHERE category_id = $1'
      const result = await client.query(sql, [category_id])
      return result.rows
    } catch (error) {
      throw new Error(`DB error ${error}`)
    }
  }
}
