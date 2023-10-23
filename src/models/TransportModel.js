const { pool, format } = require('../helpers/database')

const getById = async (id) => {
  const query = 'SELECT * FROM transport WHERE id= %s ORDER BY id DESC'
  const formatQuery = format(query, id)
  const { rows } = await pool.query(formatQuery)
  return rows[0]
}

const getByEmail = async (email) => {
  try {
    const query = `SELECT * FROM transport WHERE email= '%s' ORDER BY id DESC`
    const formatQuery = format(query, email)
    const { rows } = await pool.query(formatQuery)
    return rows[0]
  } catch (e) {
    console.log(e)
  }
}

const remove = async (id) => {
  const query = 'UPDATE transport SET deleted_at = true WHERE id = %s'
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
  const query = `INSERT INTO transport 
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

const updateData = async (name, last_name, phone, address, id) => {
  try {
    const values = [name, last_name, phone, address, id]
    const consulta =
      'UPDATE transport set name =$1, last_name=$2, phone=$3, address=$4 WHERE id=$5'
    await pool.query(consulta, values)
    return 'Usuario actualizado exitosamente'
  } catch (error) {
    return 'error'
  }
}

const updatePassword = async (password, id) => {
  try {
    const values = [password, id]
    const consulta = `UPDATE transport set password =$1 WHERE id=$2`
    console.log('pasa por aqui con estos datos', password, id)
    await pool.query(consulta, values)
    return 'Password actualizada correctamente'
  } catch (error) {
    console.log(error)
    return 'error'
  }
}

const update = async ({ email, password, name, last_name, phone, address }) => {
  const query = `UPDATE transport SET 
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
  const formatQuery = format('SELECT * FROM transport ORDER BY id DESC')
  const { rows } = await pool.query(formatQuery)
  return rows
}

const deleteByEmail = async (email) => {
  const query = `DELETE FROM transport WHERE email = '%s'`
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
  deleteByEmail,
  updateData,
  updatePassword,
}
