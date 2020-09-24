const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
// Routers
const jobsRouter = require('./routes/jobs-router.js');

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

app.listen(port, () => {
  console.log('server started');
});

module.exports = app;
