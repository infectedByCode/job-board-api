const { selectCompanies } = require('../models/company-models');

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
