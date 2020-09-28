const express = require('express');
const app = express();
require('dotenv').config();
// Routers
const jobsRouter = require('./routes/jobs-router.js');
const companiesRouter = require('./routes/companies-router.js');

app.use(express.json());

// health checker
app.all('/', (req, res, next) => {
  res.json({
    status: 200,
    msg: 'OK',
  });
});
// routes
app.use('/jobs', jobsRouter);
app.use('/companies', companiesRouter);
// errors
app.use((err, req, res, next) => {
  res.json({
    status: 500,
    msg: 'error',
  });
});

module.exports = app;
