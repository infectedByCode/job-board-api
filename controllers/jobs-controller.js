const {
  selectJobs,
  insertJob,
  selectJobById,
  selectJobsByTerm,
  selectJobsByCompanyId,
} = require('../models/job-models');

exports.getJobs = async (req, res, next) => {
  const data = await selectJobs();
  if (data instanceof Error) {
    return next(data);
  }
  return res.status(200).json({
    status: 200,
    jobs: data,
  });
};

exports.postJob = async (req, res, next) => {
  const data = await insertJob(req.body);
  if (data instanceof Error) {
    return next(data);
  }
  if (data.affectedRows === 1) {
    return res.status(201).json({
      status: 201,
      msg: 'job created successfully',
      ref: data.jobId,
    });
  }
};

exports.getJobsByTerm = async (req, res, next) => {
  const { searchTerm } = req.params;
  const searchList = searchTerm.split('+');
  const data = await selectJobsByTerm(searchList);
  if (data instanceof Error) {
    return next(data);
  }
  return res.status(200).json({
    status: 200,
    jobs: data,
  });
};

exports.getJobsByCompanyId = async (req, res, next) => {
  const { companyId } = req.params;
  const data = await selectJobsByCompanyId(companyId);
  if (data instanceof Error) {
    return next(data);
  }
  return res.status(200).json({
    status: 200,
    jobs: data,
  });
};

exports.getJobById = async (req, res, next) => {
  const { jobId } = req.params;
  const data = await selectJobById(jobId);
  if (data instanceof Error) {
    return next(data);
  }
  if (data.length === 0) {
    return res.status(200).json({
      status: 204,
      msg: 'No content',
    });
  }
  return res.status(200).json({
    status: 200,
    job: data[0],
  });
};
