const jwt = require('jsonwebtoken');

const jwtDecode = (token) => {
  const payload = jwt.decode(token);
  return payload;
};

module.exports = { jwtDecode };
