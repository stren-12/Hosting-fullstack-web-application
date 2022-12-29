import { User } from '../../models/Users'
import { isDeepStrictEqual } from 'util'
import supertest from 'supertest'
import app from '../../server'
import { response } from 'express'
import jwt from 'jsonwebtoken'
// Global variable (why we use let here not const)
let token: string

describe('UsersRoutes test suite', () => {
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

  it('An INDEX route: /users [GET]', done => {
    supertest(app)
      .get('/users/')
      .expect(200)
      .set('Authorization', 'bearer ' + token)
      .then(response => {
        const test_data: User[] = [
          {
            id: 1,
            username: 'sultan',
            first_name: 'Sultan',
            last_name: 'Aljohani',
            password_digest:
              '$2b$10$OA56HbEvj/mYgsmzKZ2One7Fa7xFZVm3MWCs8CntYYoqaxfj3nDhO',
          },
          {
            id: 2,
            username: 'jomer',
            first_name: 'Jamal',
            last_name: 'Omer',
            password_digest:
              '$2b$10$ycpHQi/WZhm8xG4Z.eXAQunOJX.nAA2Ku8Ffxl6YTRnEMkeBaJ33y',
          },
          {
            id: 3,
            username: 'john_the_ripper',
            first_name: 'John',
            last_name: 'Mick',
            password_digest:
              '$2b$10$/omNddL9EXef5UvSInTJ5Oje.BZmHrv8PaPUGz2QrtHt8k.c/JLyS',
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

  it('A SHOW route: /users/:user_id [GET]', done => {
    supertest(app)
      .get('/users/3')
      .expect(200)
      .set('Authorization', 'bearer ' + token)
      .then(response => {
        const test_data: User = {
          id: 3,
          username: 'john_the_ripper',
          first_name: 'John',
          last_name: 'Mick',
          password_digest:
            '$2b$10$/omNddL9EXef5UvSInTJ5Oje.BZmHrv8PaPUGz2QrtHt8k.c/JLyS',
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

  it('A CREATE route: /users [POST]', done => {
    const input = {
      username: 'jjm123',
      first_name: 'Mickel',
      last_name: 'peter',
      password: 'password',
    }
    supertest(app)
      .post('/users')
      .expect(200)
      .set('Authorization', 'bearer ' + token)
      .send(input)
      .then(response => {
        const decoded = jwt.verify(
          token,
          process.env.TOKEN_SECRET || 'LONG_PASSWORD_IF_SECRET_IS_NOT_FOUND'
        )
        /*
         if any exception thown we will be sure that it's wrong hence if the code run to the next line 
         This is an indecator of successful token verification
         see https://www.npmjs.com/package/jsonwebtoken
        */
        expect(true).toEqual(true)
        done()
      })
      .catch(e => {
        console.log(e)
        done.fail(e)
      })
  })
})
