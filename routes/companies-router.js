const companiesRouter = require('express').Router();
const { getCompanies, postCompany } = require('../controllers/companies-controller');

companiesRouter.route('/').get(getCompanies).post(postCompany);

module.exports = companiesRouter;
