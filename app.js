const express = require('express');
const app = express();
require('dotenv').config();
// Routers
const jobsRouter = require('./routes/jobs-router.js');

app.use(express.json());

// health checker
app.all('/', (req, res, next) => {
  res.json({
    status: 200,
    msg: 'OK',
  });
});
app.use('/jobs', jobsRouter);
// errors
app.use((err, req, res, next) => {
  res.json({
    status: 500,
    msg: 'error',
  });
});

module.exports = app;
