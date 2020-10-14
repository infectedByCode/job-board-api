const jobsRouter = require('express').Router();
const { authUser } = require('../controllers/auth-controller');
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
jobsRouter.route('/search/:searchTerm').get(getJobsByTerm);
jobsRouter.route('/company/:companyId').get(authUser, getJobsByCompanyId);

module.exports = jobsRouter;
