const companiesRouter = require('express').Router();
const {
  getCompanies,
  postCompany,
  getCompanyById,
  patchCompanyById,
  deleteCompanyById,
} = require('../controllers/companies-controller');

companiesRouter.route('/').get(getCompanies).post(postCompany);
companiesRouter.route('/:companyId').get(getCompanyById).patch(patchCompanyById).delete(deleteCompanyById);

module.exports = companiesRouter;
