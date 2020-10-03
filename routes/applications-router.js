const applicationsRouter = require('express').Router();
const { postApplication, getApplicationsByJobId } = require('../controllers/applications-controller');

applicationsRouter.route('/').post(postApplication);
applicationsRouter.route('/:jobId').get(getApplicationsByJobId);
// get applications by companyId
// get applications by applicant

module.exports = applicationsRouter;
