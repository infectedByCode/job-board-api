const companiesRouter = require('express').Router();
const { getCompanies, postCompany, getCompanyById, deleteCompanyById } = require('../controllers/companies-controller');

companiesRouter.route('/').get(getCompanies).post(postCompany);
companiesRouter.route('/:companyId').get(getCompanyById).delete(deleteCompanyById);

module.exports = companiesRouter;
