const multer = require('multer');
const upload = multer();
const applicationsRouter = require('express').Router();
const { authUser } = require('../controllers/auth-controller');
const {
  postApplication,
  getApplicationsByJobId,
  getApplicationsByCompanyId,
  getApplicationsByjobseekerId,
} = require('../controllers/applications-controller');

applicationsRouter.route('/').post(upload.any(), postApplication);
applicationsRouter.route('/job/:jobId').get(authUser, getApplicationsByJobId);
applicationsRouter
  .route('/company/:companyId')
  .get(authUser, getApplicationsByCompanyId);
applicationsRouter
  .route('/jobseeker/:jobseekerId')
  .get(authUser, getApplicationsByjobseekerId);

module.exports = applicationsRouter;
