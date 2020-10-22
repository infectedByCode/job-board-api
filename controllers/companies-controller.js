const {
  selectCompanies,
  insertCompany,
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
  const result = await insertCompany(req.body);
  if (result instanceof Error) {
    return next(result);
  }
  if (typeof result === 'undefined') {
    return res.status(400).json({
      status: 400,
      msg: 'missing or malformed data',
    });
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
  if (result.length === 0) {
    return res.status(400).json({
      status: 4000,
      msg: `unable to get company with ID ${companyId}`,
    });
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
  if (result.affectedRows === 0) {
    return res.status(404).json({
      status: 404,
      msg: `unable to update company with ID ${companyId}`,
    });
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
  if (result.affectedRows === 0) {
    return res.status(404).json({
      status: 404,
      msg: `unable to delete company with ID ${companyId}`,
    });
  }
  return res.sendStatus(204);
};
