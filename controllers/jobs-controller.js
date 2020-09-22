const { selectJobs } = require("../models/job-models");

exports.getJobs = async (req, res, next) => {
  const data = await selectJobs();
  res.json({ jobs: data });
};
