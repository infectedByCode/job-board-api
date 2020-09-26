const jobsRouter = require('express').Router();
const { getJobs, postJob, getJobById, getJobsByTerm, getJobsByCompanyId } = require('../controllers/jobs-controller');

jobsRouter.route('/').get(getJobs).post(postJob);
jobsRouter.get('/:jobId', getJobById);
jobsRouter.get('/search/:searchTerm', getJobsByTerm);
jobsRouter.get('/company/:companyId', getJobsByCompanyId);

module.exports = jobsRouter;
