import client from '../database'
import bcrypt from 'bcrypt'
export type User = {
  id: number | null
  username: string
  first_name: string
  last_name: string
  password_digest: string
}

export class UsersModel {
  async create(user: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (username, first_name, last_name ,password_digest) VALUES($1, $2, $3, $4) RETURNING *'
      // Technique 2 (auto-gen a salt and hash):
      // see https://www.npmjs.com/package/bcrypt
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(user.password_digest, salt)
      const result = await client.query(sql, [
        user.username,
        user.first_name,
        user.last_name,
        hash,
      ])
      const res = result.rows[0]
      return res
    } catch (err) {
      throw new Error(`unable create user (${user.username}): ${err}`)
    }
  }

  async index(): Promise<User[]> {
    try {
      const sql = 'SELECT * FROM users'
      const result = await client.query(sql)
      const res = result.rows
      return res
    } catch (err) {
      throw new Error(`DB error ${err}`)
    }
  }

  async show(user_id: number): Promise<User | null> {
    const sql = 'SELECT * FROM users WHERE id=($1)'
    const result = await client.query(sql, [user_id])
    if (result.rows.length) {
      return result.rows[0]
    }
    return null
  }
  async authenticate(username: string, password: string): Promise<User | null> {
    const sql = 'SELECT * FROM users WHERE username=($1)'
    const result = await client.query(sql, [username])

    if (result.rows.length) {
      const user = result.rows[0]
      if (bcrypt.compareSync(password, user.password_digest)) {
        return user
      }
    }
    return null
  }
}
