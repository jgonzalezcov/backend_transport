const express = require('express');
const app = express();
const cors = require('cors');

const CsbInspector = require('csb-inspector');
CsbInspector();
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use('/client', require('./src/routes/ClientRoutes'));
app.use('/transport', require('./src/routes/TransportRoutes'));
app.use('/trip', require('./src/routes/TripRoutes'));
app.use('/truck', require('./src/routes/TruckRoutes'));
app.use('/driver', require('./src/routes/DriverRoutes'));
app.use('/shipping', require('./src/routes/ShippingRoutes'));

app.get('*', (req, res) => {
  res.status(404).send('Page not found');
});

module.exports = app;
