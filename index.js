const app = require('./app');
const { serverPort } = require('./src/config/globalContants');

app.listen(
  serverPort,
  console.log('SERVIDOR ENCENDIDO EN EL PUERTO ' + serverPort)
);
