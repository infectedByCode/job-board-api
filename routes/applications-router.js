const applicationsRouter = require('express').Router();
const {
  postApplication,
  getApplicationsByJobId,
  getApplicationsByCompanyId,
} = require('../controllers/applications-controller');

applicationsRouter.route('/').post(postApplication);
applicationsRouter.route('/job/:jobId').get(getApplicationsByJobId);
applicationsRouter.route('/company/:companyId').get(getApplicationsByCompanyId);
// get applications by applicant

module.exports = applicationsRouter;
