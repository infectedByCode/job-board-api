const { selectCompanies, createCompany, deleteCompanyByIdQuery } = require('../models/company-models');

exports.getCompanies = async (req, res, next) => {
  const result = await selectCompanies();
  if (result instanceof Error) {
    return next(result);
  }
  return res.status(200).json({
    status: 200,
    companies: result,
  });
};

exports.postCompany = async (req, res, next) => {
  const result = await createCompany(req.body);
  if (result instanceof Error) {
    return next(result);
  }
  return res.status(201).json({
    status: 201,
    msg: 'Company successfully created',
    ref: result.companyId,
  });
};

exports.deleteCompanyById = async (req, res, next) => {
  const { companyId } = req.params;
  const result = await deleteCompanyByIdQuery(companyId);
  if (result instanceof Error) {
    return next(result);
  }
  return res.sendStatus(204);
};
