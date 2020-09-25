const jobsRouter = require('express').Router();
const { getJobs, getJobById, getJobsByTerm, getJobsByCompanyId } = require('../controllers/jobs-controller');

jobsRouter.get('/', getJobs);
jobsRouter.get('/:jobId', getJobById);
jobsRouter.get('/search/:searchTerm', getJobsByTerm);
jobsRouter.get('/company/:companyId', getJobsByCompanyId);

module.exports = jobsRouter;
