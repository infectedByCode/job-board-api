const jobsRouter = require('express').Router();
const {
  getJobs,
  postJob,
  getJobById,
  patchJobById,
  deleteJobById,
  getJobsByTerm,
  getJobsByCompanyId,
} = require('../controllers/jobs-controller');

jobsRouter.route('/').get(getJobs).post(postJob);
jobsRouter.route('/:jobId').get(getJobById).patch(patchJobById).delete(deleteJobById);
jobsRouter.get('/search/:searchTerm', getJobsByTerm);
jobsRouter.get('/company/:companyId', getJobsByCompanyId);

module.exports = jobsRouter;
