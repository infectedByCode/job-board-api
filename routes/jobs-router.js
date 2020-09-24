const jobsRouter = require('express').Router();
const { getJobs, getJobById, getJobsByTerm } = require('../controllers/jobs-controller');

jobsRouter.get('/', getJobs);
jobsRouter.get('/:jobId', getJobById);
jobsRouter.get('/search/:searchTerm', getJobsByTerm);

module.exports = jobsRouter;
