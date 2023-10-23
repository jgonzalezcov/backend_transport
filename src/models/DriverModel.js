const { pool, format } = require('../helpers/database')

const create = async (transport_id, dni, img, last_name, name, phone) => {
  try {
    const values = [transport_id, name, last_name, phone, dni, img]
    const consulta =
      'INSERT INTO driver values (DEFAULT, $1, $2, $3, $4, $5,$6, DEFAULT, DEFAULT, DEFAULT, DEFAULT)'
    await pool.query(consulta, values)
  } catch (error) {
    return 'error'
  }
}

const update = async (name, last_name, phone, dni, img, id) => {
  console.log(name, last_name, phone, dni, img, id, 'mirame')
  try {
    const values = [name, last_name, phone, dni, img, id]
    const consulta =
      'UPDATE driver set name=$1, last_name=$2, phone=$3, dni=$4, img=$5 WHERE id=$6'
    await pool.query(consulta, values)
  } catch (error) {
    return 'error'
  }
}

const list = async (transport_id) => {
  try {
    const values = [transport_id]
    const consulta =
      'SELECT * FROM driver WHERE deleted_at=false AND transport_id=$1 ORDER BY id DESC'
    const { rows } = await pool.query(consulta, values)
    return rows
  } catch (error) {
    return 'error'
  }
}
const softDelete = async (id) => {
  try {
    console.log('soy sofdetele y este es mi id', id)
    const values = [id]
    const consulta = 'UPDATE driver set deleted_at = true WHERE id=$1'
    await pool.query(consulta, values)
  } catch (error) {
    return 'error'
  }
}

const all = async () => {
  const formatQuery = format('SELECT * FROM trip ORDER BY id DESC')
  const { rows } = await pool.query(formatQuery)
  return rows
}

module.exports = { all, list, create, softDelete, update }
