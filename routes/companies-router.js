const companiesRouter = require('express').Router();
const { authUser } = require('../controllers/auth-controller');
const {
  getCompanies,
  postCompany,
  getCompanyById,
  patchCompanyById,
  deleteCompanyById,
} = require('../controllers/companies-controller');

companiesRouter.route('/').get(getCompanies).post(postCompany);
companiesRouter
  .route('/:companyId')
  .get(authUser, getCompanyById)
  .patch(authUser, patchCompanyById)
  .delete(authUser, deleteCompanyById);

module.exports = companiesRouter;
