const companiesRouter = require('express').Router();
const { getCompanies, postCompany, deleteCompanyById } = require('../controllers/companies-controller');

companiesRouter.route('/').get(getCompanies).post(postCompany);
companiesRouter.route('/:companyId').delete(deleteCompanyById);

module.exports = companiesRouter;
