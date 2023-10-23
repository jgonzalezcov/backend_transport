const { pool, format } = require('../helpers/database')

const create = async (
  transport_id,
  name,
  country_patent,
  patent,
  maken,
  model,
  color,
  type_load,
  cubic_meters,
  max_weight,
  long_load,
  wide_load,
  high_load
) => {
  try {
    const values = [
      transport_id,
      name,
      country_patent,
      patent,
      maken,
      model,
      color,
      type_load,
      cubic_meters,
      max_weight,
      long_load,
      wide_load,
      high_load,
    ]
    const consulta =
      'INSERT INTO truck values (DEFAULT, $1, $2, $3, $4, $5,$6, $7, $8, $9, $10, $11, $12, $13, DEFAULT, DEFAULT, DEFAULT, DEFAULT)'
    await pool.query(consulta, values)
  } catch (error) {
    return 'error'
  }
}

const update = async (
  name,
  country_patent,
  patent,
  maken,
  model,
  color,
  type_load,
  cubic_meters,
  max_weight,
  long_load,
  wide_load,
  high_load,
  id
) => {
  try {
    const values = [
      name,
      country_patent,
      patent,
      maken,
      model,
      color,
      type_load,
      cubic_meters,
      max_weight,
      long_load,
      wide_load,
      high_load,
      id,
    ]
    const consulta =
      'UPDATE truck set name =$1, country_patent=$2, patent=$3, maken=$4, model=$5, color=$6, type_load=$7, cubic_meters=$8, max_weight=$9, long_load=$10, wide_load=$11, high_load=$12 WHERE id=$13'
    await pool.query(consulta, values)
  } catch (error) {
    return 'error'
  }
}

const remove = async (id) => {
  try {
    const values = [id]
    const consulta = 'DELETE FROM truck WHERE id=$1'
    await pool.query(consulta, values)
  } catch (error) {
    return 'error'
  }
}
const list = async (transport_id) => {
  try {
    const values = [transport_id]
    const consulta =
      'SELECT * FROM truck WHERE deleted_at=false AND transport_id=$1 ORDER BY id DESC'
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
    const consulta = 'UPDATE truck set deleted_at = true WHERE id=$1'
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

module.exports = { all, create, update, remove, softDelete, list }
