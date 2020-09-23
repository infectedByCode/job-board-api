const { selectJobs } = require('../models/job-models');

exports.getJobs = async (req, res, next) => {
  const data = await selectJobs();
  if (data instanceof Error) {
    return next(data);
  }
  res.json({ jobs: data });
};
