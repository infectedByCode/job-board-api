const express = require('express');
const app = express();
require('dotenv').config();
// Routers
const authRouter = require('./routes/auth-router');
const jobsRouter = require('./routes/jobs-router');
const companiesRouter = require('./routes/companies-router');
const jobSeekersRouter = require('./routes/jobseekers-router');
const applicationsRouter = require('./routes/applications-router');

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
app.use('/auth', authRouter);
app.use('/companies', companiesRouter);
app.use('/jobseekers', jobSeekersRouter);
app.use('/applications', applicationsRouter);
// errors
app.use((err, req, res, next) => {
  if (err.errno) {
    res.status(400).json({
      status: 400,
      msg: 'missing or malformed data',
    });
  }
  res.json({
    status: 500,
    msg: 'error',
  });
});

module.exports = app;
