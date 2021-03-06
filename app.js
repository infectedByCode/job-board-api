const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
// Routers
const authRouter = require('./routes/auth-router');
const jobsRouter = require('./routes/jobs-router');
const companiesRouter = require('./routes/companies-router');
const jobSeekersRouter = require('./routes/jobseekers-router');
const applicationsRouter = require('./routes/applications-router');

app.use(cors());
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
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// errors
app.use((err, req, res, next) => {
  if (err.errno) {
    res.status(400).json({
      status: 400,
      msg: 'missing or malformed data',
    });
  }
  res.status(500).json({
    status: 500,
    msg: 'error',
  });
});

module.exports = app;
