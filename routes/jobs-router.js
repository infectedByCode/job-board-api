const jobsRouter = require('express').Router();
const { getJobs, getJobById } = require('../controllers/jobs-controller');

jobsRouter.get('/', getJobs);
jobsRouter.get('/:jobId', getJobById);

module.exports = jobsRouter;
