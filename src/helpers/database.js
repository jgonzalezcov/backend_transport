const { Pool } = require('pg')
const format = require('pg-format')
const globalContants = require('../config/globalContants')
const pool = new Pool({
  user: globalContants.user,
  host: globalContants.host,
  database: globalContants.database,
  password: globalContants.password,
  port: globalContants.dbPort,
})
module.exports = { pool, format }
