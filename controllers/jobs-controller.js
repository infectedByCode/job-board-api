const {
  selectJobs,
  insertJob,
  selectJobById,
  updateJobById,
  deleteJobByIdQuery,
  selectJobsByTerm,
  selectJobsByCompanyId,
} = require('../models/job-models');

exports.getJobs = async (req, res, next) => {
  const result = await selectJobs();
  if (result instanceof Error) {
    return next(result);
  }
  return res.status(200).json({
    status: 200,
    jobs: result,
  });
};

exports.postJob = async (req, res, next) => {
  const result = await insertJob(req.body);
  if (result instanceof Error) {
    return next(result);
  }
  if (result.affectedRows === 1) {
    return res.status(201).json({
      status: 201,
      msg: 'job created successfully',
      ref: result.jobId,
    });
  }
};

exports.getJobsByTerm = async (req, res, next) => {
  const { searchTerm } = req.params;
  const searchList = searchTerm.split('+');
  const result = await selectJobsByTerm(searchList);
  if (result instanceof Error) {
    return next(result);
  }
  return res.status(200).json({
    status: 200,
    jobs: result,
  });
};

exports.getJobsByCompanyId = async (req, res, next) => {
  const { companyId } = req.params;
  const result = await selectJobsByCompanyId(companyId);
  if (result instanceof Error) {
    return next(result);
  }
  return res.status(200).json({
    status: 200,
    jobs: result,
  });
};

exports.getJobById = async (req, res, next) => {
  const { jobId } = req.params;
  const result = await selectJobById(jobId);
  if (result instanceof Error) {
    return next(result);
  }
  if (result.length === 0) {
    return res.status(200).json({
      status: 204,
      msg: 'No content',
    });
  }
  return res.status(200).json({
    status: 200,
    job: result[0],
  });
};

exports.patchJobById = async (req, res, next) => {
  const { jobId } = req.params;
  const result = await updateJobById(jobId, req.body);
  if (result instanceof Error) {
    return next(result);
  }
  if (result.affectedRows === 1) {
    return res.status(200).json({
      status: 200,
      msg: `job ${result.jobId} updated successfully`,
    });
  }
};

exports.deleteJobById = async (req, res, next) => {
  const { jobId } = req.params;
  const result = await deleteJobByIdQuery(jobId);
  if (result instanceof Error) {
    return next(result);
  }
  return res.sendStatus(204);
};
