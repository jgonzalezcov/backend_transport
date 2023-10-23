require('dotenv').config()
const globalContants = {
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  serverPort: process.env.PORT,
  dbPort: process.env.DB_PORT,
}
module.exports = globalContants
