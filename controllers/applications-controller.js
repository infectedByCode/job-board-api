const {
  insertApplication,
  selectApplicationsByJobId,
  selectApplicationsByCompanyId,
  selectApplicationsByjobseekerId,
} = require('../models/application-models');

exports.postApplication = async (req, res, next) => {
  const result = await insertApplication(req.body);
  if (result instanceof Error) {
    return next(result);
  }
  // TODO: logic for dealing with applications, e.g. email, form data
  if (result.affectedRows === 1) {
    res.status(201).json({
      status: 201,
      msg: 'application successful',
      ref: result.applicationID,
    });
  }
};

exports.getApplicationsByJobId = async (req, res, next) => {
  const { jobId } = req.params;
  const result = await selectApplicationsByJobId(jobId);
  if (result instanceof Error) {
    return next(result);
  }
  res.status(200).json({
    status: 200,
    applications: result,
  });
};

exports.getApplicationsByCompanyId = async (req, res, next) => {
  const { companyId } = req.params;
  const result = await selectApplicationsByCompanyId(companyId);
  if (result instanceof Error) {
    return next(result);
  }
  res.status(200).json({
    status: 200,
    companyId,
    applications: result,
  });
};

exports.getApplicationsByjobseekerId = async (req, res, next) => {
  const { jobseekerId } = req.params;
  const result = await selectApplicationsByjobseekerId(jobseekerId);
  if (result instanceof Error) {
    return next(result);
  }
  res.status(200).json({
    status: 200,
    applications: result,
  });
};
