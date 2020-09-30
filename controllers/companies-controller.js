const {
  selectCompanies,
  createCompany,
  selectCompanyById,
  updateCompanyById,
  deleteCompanyByIdQuery,
} = require('../models/company-models');

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

exports.getCompanyById = async (req, res, next) => {
  const { companyId } = req.params;
  const result = await selectCompanyById(companyId);
  if (result instanceof Error) {
    return next(result);
  }
  return res.status(200).json({
    status: 200,
    company: result[0],
  });
};

exports.patchCompanyById = async (req, res, next) => {
  const { companyId } = req.params;
  const result = await updateCompanyById(companyId, req.body);
  if (result instanceof Error) {
    return next(result);
  }
  return res.status(200).json({
    status: 200,
    msg: `company ${companyId} updated successfully`,
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
