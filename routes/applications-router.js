const applicationsRouter = require('express').Router();
const {
  postApplication,
  getApplicationsByJobId,
  getApplicationsByCompanyId,
  getApplicationsByjobseekerId,
} = require('../controllers/applications-controller');

applicationsRouter.route('/').post(postApplication);
applicationsRouter.route('/job/:jobId').get(getApplicationsByJobId);
applicationsRouter.route('/company/:companyId').get(getApplicationsByCompanyId);
applicationsRouter.route('/jobseeker/:jobseekerId').get(getApplicationsByjobseekerId);

module.exports = applicationsRouter;
