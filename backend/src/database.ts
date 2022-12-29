import { Client, Pool, types } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { PGUSER, PGHOST, PGPASSWORD, PGPORT, ENV } = process.env

types.setTypeParser(1700, function (val) {
  return parseFloat(val)
})
if (ENV == 'test') {
  process.env.PGDATABASE = process.env.PGDATABASE_TEST
}
console.log(process.env.PGDATABASE)
const client = new Client()
client.connect(err => {
  if (err) {
    throw Error(`Connection error ${err.stack}`)
  }
})
export default client
