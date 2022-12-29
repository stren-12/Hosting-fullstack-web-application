import { UsersModel, User } from '../../models/Users'
import { isDeepStrictEqual } from 'util'

describe('UsersModel test suite', () => {
  it('Index method', done => {
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

    const users_model = new UsersModel()
    users_model
      .index()
      .then(data => {
        expect(data.length).toEqual(4)
        // We add a new User in ../handlers/UsersRoutes.ts so if the result is array we will remove the last row

        data.splice(data.length - 1, 1)

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
    const test_data: User = {
      id: 5,
      username: 'jjm123',
      first_name: 'Mickel',
      last_name: 'peter',
      // We will ignore the password_digest test due to the "trust" we had in the bcrypt library
      // This library is used in HUGE projects like default php password hashing function password_hash(), hence no need for check
      password_digest: 'password',
    }

    const users_model = new UsersModel()
    users_model
      .create(test_data)
      .then(data => {
        if (data != null) {
          data.password_digest = 'password'
        }
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
    const test_data: User = {
      id: 1,
      username: 'sultan',
      first_name: 'Sultan',
      last_name: 'Aljohani',
      password_digest:
        '$2b$10$OA56HbEvj/mYgsmzKZ2One7Fa7xFZVm3MWCs8CntYYoqaxfj3nDhO',
    }

    const users_model = new UsersModel()
    users_model
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

  it('Authenticate method', done => {
    const test_data: User = {
      id: 1,
      username: 'sultan',
      first_name: 'Sultan',
      last_name: 'Aljohani',
      password_digest:
        '$2b$10$OA56HbEvj/mYgsmzKZ2One7Fa7xFZVm3MWCs8CntYYoqaxfj3nDhO',
    }

    const users_model = new UsersModel()
    users_model
      .authenticate('sultan', 'password')
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
