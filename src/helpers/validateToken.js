const jwt = require('jsonwebtoken');
const { showError } = require('../helpers/errorHelper');

const validateToken = async (token, res) => {
  try {
    const validate = await jwt.verify(
      token,
      process.env.JWT_SECRET,
      (error, payload) => {
        if (error) {
          throw new Error('El token no ha sido valido', error);
        }
        return payload;
      }
    );
    return validate;
  } catch (e) {
    showError(res, e);
  }
};
module.exports = { validateToken };
