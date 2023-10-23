const { pool, format } = require('../helpers/database')
// FIELDS
// -----------------
// id
// trip_id
// transport_id
// client_id
// drive_phone
// drive_name
// origin_address
// destiny_address
// date_retirement
// time_ini_retirement
// time_end_retirement
// date_delivery
// time_ini_delivery
// time_end_delivery
// type_load_shipping
// cubic_meters_shipping
// weight_shipping
// long_load_shipping
// wide_load_shipping
// high_load_shipping
// status
// created_at
// updated_at
// deleted_at

const getByClientId = async (clientId) => {
  const formatQuery = format(
    `SELECT 
      s.id, s.origin_address, s.destiny_address, s.description, s.cubic_meters_shipping , s.transport_id, s.client_id, s.status,
      c.name AS client_name,
      c.last_name AS client_last_name,
      c.email AS client_email,
      c.phone AS client_phone,
      t.name AS transport_name,
      t.last_name AS transport_last_name,
      t.email AS transport_email,
      t.phone AS transport_phone
    FROM shipping s 
    LEFT JOIN client c ON c.id = s.client_id
    LEFT JOIN transport t ON t.id = s.transport_id
    
    WHERE 
      s.client_id = '%s' AND 
      s.deleted_at = false
    ORDER BY id DESC`,
    [clientId]
  )
  const { rows } = await pool.query(formatQuery)
  return rows
}

const getById = async (id) => {
  const formatQuery = format(`SELECT * from shipping WHERE id = '%s'`, [id])
  const { rows } = await pool.query(formatQuery)
  return rows[0]
}

const getByTripId = async (id) => {
  const formatQuery = format(
    `SELECT shipping.id as id_shipping,
  trip_id,
  client_id,
  description,
  origin_address,
  destiny_address,
  cubic_meters_shipping,
  weight_shipping,
  long_load_shipping,
  wide_load_shipping,
  high_load_shipping,
  status,
  transport_id,
  name,
  last_name,
  email,
  phone,
  address,
  img  FROM shipping INNER JOIN client ON shipping.client_id = client.id WHERE trip_id = '%s'`,
    [id]
  )
  const { rows } = await pool.query(formatQuery)
  return rows
}

const update = async (
  shippingId,
  {
    cubic_meters_shipping,
    high_load_shipping,
    long_load_shipping,
    wide_load_shipping,
  }
) => {
  const query = `UPDATE shipping SET 
    cubic_meters_shipping = %s, 
    long_load_shipping = %s,
    high_load_shipping = %s,
    wide_load_shipping = %s
    WHERE id = %s`
  const formatQuery = format(
    query,
    cubic_meters_shipping,
    long_load_shipping,
    high_load_shipping,
    wide_load_shipping,
    shippingId
  )
  await pool.query(formatQuery)
  return await getById(shippingId)
}

const updateState = async (shippingId, { status }) => {
  const query = `UPDATE shipping SET 
    status= %s, 
    WHERE id = %s`
  const formatQuery = format(query, status, shippingId)
  await pool.query(formatQuery)
  return await getById(shippingId)
}

const create = async ({
  trip_id,
  client_id,
  description,
  origin_address,
  destiny_address,
  cubic_meters_shipping,
  weight_shipping,
  long_load_shipping,
  wide_load_shipping,
  high_load_shipping,
  transport_id,
}) => {
  try {
    const values = [
      trip_id,
      client_id,
      description,
      origin_address,
      destiny_address,
      cubic_meters_shipping,
      weight_shipping,
      long_load_shipping,
      wide_load_shipping,
      high_load_shipping,
      transport_id,
    ]

    const consulta = `INSERT INTO shipping (
        trip_id, 
        client_id,   
        description,        
        origin_address,        
        destiny_address,        
        cubic_meters_shipping,   
        weight_shipping,        
        long_load_shipping,        
        wide_load_shipping,        
        high_load_shipping,        
        transport_id) values 
        ( $1, $2, $3, $4, $5,$6, $7, $8, $9, $10, $11)`
    await pool.query(consulta, values)
    return 'ok'
  } catch (error) {
    console.log(error)
    return 'error'
  }
}

module.exports = {
  getByClientId,
  getById,
  update,
  create,
  getByTripId,
  updateState,
}
