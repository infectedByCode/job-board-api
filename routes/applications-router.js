const applicationsRouter = require('express').Router();
const { postApplication } = require('../controllers/applications-controller');

applicationsRouter.route('/').post(postApplication);

module.exports = applicationsRouter;
