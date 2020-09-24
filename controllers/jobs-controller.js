const { selectJobs, selectJobById, selectJobsByTerm } = require('../models/job-models');

exports.getJobs = async (req, res, next) => {
  const data = await selectJobs();
  if (data instanceof Error) {
    return next(data);
  }
  return res.json({
    status: 200,
    jobs: data,
  });
};

exports.getJobsByTerm = async (req, res, next) => {
  const { searchTerm } = req.params;
  const data = await selectJobsByTerm(searchTerm);
  if (data instanceof Error) {
    return next(data);
  }
  return res.json({
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
    return res.json({
      status: 204,
      msg: 'No content',
    });
  }
  return res.json({
    status: 200,
    job: data[0],
  });
};
