const { pool, format } = require('../helpers/database')

const getByEmail = async (email) => {
  try {
    const query = `SELECT * FROM client WHERE email= '%s' ORDER BY id DESC`
    const formatQuery = format(query, email)
    const { rows } = await pool.query(formatQuery)
    return rows[0]
  } catch (e) {
    console.log(e)
  }
}

const updateData = async (name, last_name, phone, address, id) => {
  try {
    const values = [name, last_name, phone, address, id]
    const consulta =
      'UPDATE client set name =$1, last_name=$2, phone=$3, address=$4 WHERE id=$5'
    await pool.query(consulta, values)
    return 'Usuario actualizado exitosamente'
  } catch (error) {
    return 'error'
  }
}

const updatePassword = async (password, id) => {
  try {
    const values = [password, id]
    const consulta = `UPDATE client set password =$1 WHERE id=$2`
    console.log('pasa por aqui con estos datos', password, id)
    await pool.query(consulta, values)
    return 'Password actualizada correctamente'
  } catch (error) {
    console.log(error)
    return 'error'
  }
}
const getById = async (id) => {
  const query = 'SELECT * FROM client WHERE id= %s ORDER BY id DESC'
  const formatQuery = format(query, id)
  const { rows } = await pool.query(formatQuery)
  return rows[0]
}

const remove = async (id) => {
  const query = 'UPDATE client SET deleted_at = true WHERE id = %s'
  const formatQuery = format(query, id)
  await pool.query(formatQuery)
}

const signin = async ({
  email,
  password,
  name,
  last_name,
  phone,
  address,
  img,
}) => {
  const query = `INSERT INTO client 
  (email, password, name, last_name, phone, address, img) 
  VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s')`
  const formatQuery = format(
    query,
    email,
    password,
    name,
    last_name,
    phone,
    address,
    img || ''
  )
  const { rows } = await pool.query(formatQuery)
  return rows[0]
}

const update = async ({ email, password, name, last_name, phone, address }) => {
  const query = `UPDATE client SET 
  email= %s, password = %s, name = %s, last_name = %s, phone = %s, address = %s 
  WHERE id = %s
  `
  const formatQuery = format(
    query,
    email,
    password,
    name,
    last_name,
    phone,
    address,
    id
  )
  const { rows } = await pool.query(formatQuery)
  return rows[0]
}

const list = async () => {
  const formatQuery = format('SELECT * FROM client ORDER BY id DESC')
  const { rows } = await pool.query(formatQuery)
  return rows
}

const duplicateUser = async (email) => {
  try {
    const values = [email]
    const consulta = 'SELECT count(email) as num FROM client WHERE email = $1'
    resp = await pool.query(consulta, values)
    return resp.rows[0].num
  } catch (error) {
    return 'error'
  }
}

const deleteByEmail = async (email) => {
  const query = `DELETE FROM client WHERE email = '%s'`
  const formatQuery = format(query, email)
  await pool.query(formatQuery)
  return { msj: 'Usuario eliminado exitosamente' }
}

module.exports = {
  list,
  getById,
  getByEmail,
  signin,
  remove,
  update,
  duplicateUser,
  deleteByEmail,
  updateData,
  updatePassword,
}
