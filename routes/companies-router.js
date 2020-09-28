const companiesRouter = require('express').Router();
const { getCompanies } = require('../controllers/companies-controller');

companiesRouter.route('/').get(getCompanies);

module.exports = companiesRouter;
