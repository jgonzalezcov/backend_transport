const { pool, format } = require('../helpers/database')

const create = async (
  truck_id,
  transport_id,
  driver_id,
  country_origin,
  country_destiny,
  city_origin,
  city_destiny,
  trip_date_ini,
  time_ini,
  time_end,
  trip_date_end,
  type_load,
  cubic_meters_trip,
  max_weight_trip,
  long_load_trip,
  wide_load_trip,
  high_load_trip
) => {
  try {
    const values = [
      truck_id,
      transport_id,
      driver_id,
      country_origin,
      country_destiny,
      city_origin,
      city_destiny,
      trip_date_ini,
      time_ini,
      time_end,
      trip_date_end,
      type_load,
      cubic_meters_trip,
      max_weight_trip,
      long_load_trip,
      wide_load_trip,
      high_load_trip,
    ]

    const consulta =
      'INSERT INTO trip values (DEFAULT, $1, $2, $3, $4, $5,$6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, DEFAULT, DEFAULT, DEFAULT, DEFAULT)'
    await pool.query(consulta, values)
  } catch (error) {
    console.log(error)
    return 'error'
  }
}

const update = async (
  truck_id,
  transport_id,
  driver_id,
  country_origin,
  country_destiny,
  city_origin,
  city_destiny,
  trip_date_ini,
  time_ini,
  time_end,
  trip_date_end,
  type_load_trip,
  cubic_meters_trip,
  max_weight_trip,
  long_load_trip,
  wide_load_trip,
  high_load_trip,
  id
) => {
  console.log(
    'estp recivi',
    truck_id,
    transport_id,
    driver_id,
    country_origin,
    country_destiny,
    city_origin,
    city_destiny,
    trip_date_ini,
    time_ini,
    time_end,
    trip_date_end,
    type_load_trip,
    cubic_meters_trip,
    max_weight_trip,
    long_load_trip,
    wide_load_trip,
    high_load_trip,
    id
  )
  try {
    const values = [
      truck_id,
      transport_id,
      driver_id,
      country_origin,
      country_destiny,
      city_origin,
      city_destiny,
      trip_date_ini,
      time_ini,
      time_end,
      trip_date_end,
      type_load_trip,
      cubic_meters_trip,
      max_weight_trip,
      long_load_trip,
      wide_load_trip,
      high_load_trip,
      id,
    ]
    const consulta =
      'UPDATE trip set  truck_id=$1, transport_id=$2, driver_id=$3,country_origin=$4, country_destiny=$5, city_origin=$6, city_destiny=$7, trip_date_ini=$8, time_ini=$9, time_end=$10, trip_date_end=$11, type_load_trip=$12, cubic_meters_trip=$13, max_weight_trip=$14, long_load_trip=$15, wide_load_trip=$16, high_load_trip=$17 WHERE id=$18'
    await pool.query(consulta, values)
  } catch (error) {
    return 'error'
  }
}

const remove = async (id) => {
  try {
    const values = [id]
    const consulta = 'DELETE FROM trip WHERE id=$1'
    await pool.query(consulta, values)
  } catch (error) {
    return 'error'
  }
}
const list = async (transport_id) => {
  try {
    const values = [transport_id]
    const consulta =
      'SELECT trip.id,truck_id,trip.transport_id,driver_id,country_origin,country_destiny,city_origin,city_destiny,trip_date_ini,time_ini,time_end,trip_date_end,type_load_trip,cubic_meters_trip,max_weight_trip, long_load_trip,wide_load_trip,high_load_trip,trip.status,truck.name AS truck_name,country_patent,patent,maken,model,color,driver.name AS driver_name,last_name  AS driver_last_name,phone,dni,img from trip INNER JOIN  truck ON trip.truck_id = truck.id INNER JOIN driver ON trip.driver_id = driver.id WHERE trip.deleted_at=false AND trip.transport_id=$1 ORDER BY trip.id DESC'

    const { rows } = await pool.query(consulta, values)
    return rows
  } catch (error) {
    return 'error'
  }
}

const softDelete = async (id) => {
  try {
    const values = [id]
    const consulta = 'UPDATE trip set deleted_at = true WHERE id=$1'
    await pool.query(consulta, values)
  } catch (error) {
    return 'error'
  }
}

const updateState = async (id, status) => {
  try {
    const values = [status, id]
    const consulta = 'UPDATE trip set status = $1 WHERE id=$2'
    await pool.query(consulta, values)
  } catch (error) {
    return 'error'
  }

  try {
    const values = [status, id]
    const consulta = 'UPDATE shipping set status = $1 WHERE trip_id=$2'
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

const listforclient = async (
  type_load_shipping,
  city_origin,
  city_destiny,
  country_destiny,
  country_origin,
  cubic_meters_shipping,
  high_load_shipping,
  long_load_shipping,
  status,
  time_end,
  time_ini,
  trip_date_end,
  trip_date_ini,
  weight_shipping,
  wide_load_shipping
) => {
  try {
    const cubic_meters_shipping_edit =
      cubic_meters_shipping == '' ? 0 : cubic_meters_shipping
    const high_load_shipping_edit =
      high_load_shipping == '' ? 0 : high_load_shipping
    const long_load_shipping_edit =
      long_load_shipping == '' ? 0 : long_load_shipping
    const time_end_edit = time_end == '' ? '23:59' : time_end
    const time_ini_edit = time_ini == '' ? '00:00' : time_ini
    const trip_date_end_edit =
      trip_date_end == '' ? '4000-01-01' : trip_date_end
    const trip_date_ini_edit =
      trip_date_ini == '' ? '0001-01-01' : trip_date_ini
    const weight_shipping_edit = weight_shipping == '' ? 0 : weight_shipping
    const wide_load_shipping_edit =
      wide_load_shipping == '' ? 0 : wide_load_shipping
    const values = [
      type_load_shipping,
      city_origin,
      city_destiny,
      country_destiny,
      country_origin,
      cubic_meters_shipping_edit,
      high_load_shipping_edit,
      long_load_shipping_edit,
      status,
      time_end_edit,
      time_ini_edit,
      trip_date_end_edit,
      trip_date_ini_edit,
      weight_shipping_edit,
      wide_load_shipping_edit,
    ]

    const consulta = `SELECT trip.id,truck_id,trip.transport_id,driver_id,country_origin,country_destiny,city_origin,city_destiny,trip_date_ini,time_ini,time_end,trip_date_end,type_load_trip,cubic_meters_trip,max_weight_trip, long_load_trip,wide_load_trip,high_load_trip,trip.status,truck.name AS truck_name,country_patent,patent,maken,model,color,driver.name AS driver_name,last_name  AS driver_last_name,phone,dni,img from trip INNER JOIN  truck ON trip.truck_id = truck.id INNER JOIN driver ON trip.driver_id = driver.id 
    WHERE trip.deleted_at=false AND ${
      type_load_shipping == '' ? `type_load_trip <> $1` : 'type_load_trip=$1'
    } AND ${city_origin == '' ? `city_origin <>$2` : 'city_origin=$2'}
    AND ${city_destiny == '' ? `city_destiny <>$3` : 'city_destiny=$3'}
    AND ${country_destiny == '' ? `country_destiny <>$4` : 'country_destiny=$4'}
    AND ${country_origin == '' ? `country_origin <>$5` : 'country_origin=$5'}
    AND cubic_meters_trip>=$6 
    AND high_load_trip>=$7
    AND long_load_trip>=$8
    AND trip.status=$9
    AND time_ini <= $10
    AND time_ini >= $11
    AND trip_date_ini <= $12
    AND trip_date_ini >= $13
    AND max_weight_trip >=$14
    AND wide_load_trip >=$15
    
    `
    const result = await pool.query(consulta, values)
    return result.rows
  } catch (error) {
    console.log(error)
    return 'error'
  }
}
module.exports = {
  all,
  create,
  update,
  remove,
  softDelete,
  list,
  listforclient,
  updateState,
}
