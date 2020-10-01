const {
  insertJobSeeker,
  selectJobSeekerById,
  updateJobSeekerById,
  deleteJobSeekerByIdQuery,
} = require('../models/jobseeker-models');

exports.insertJobSeeker = async (req, res, next) => {
  const result = await insertJobSeeker(req.body);
  if (result instanceof Error) {
    return next(result);
  }
  if (result.affectedRows === 1) {
    res.status(201).json({
      status: 201,
      msg: 'jobseeker created',
      ref: result.jobSeekerId,
    });
  }
};

exports.getJobSeekerById = async (req, res, next) => {
  const { jobseekerId } = req.params;
  const result = await selectJobSeekerById(jobseekerId);
  if (result instanceof Error) {
    return next(result);
  }
  res.status(200).json({
    status: 200,
    jobseeker: result[0],
  });
};

exports.patchJobSeekerById = async (req, res, next) => {
  const { jobseekerId } = req.params;
  const result = await updateJobSeekerById(jobseekerId, req.body);
  if (result instanceof Error) {
    return next(result);
  }
  if (result.affectedRows === 1) {
    res.status(200).json({
      status: 200,
      msg: `jobseeker ${jobseekerId} successfully updated`,
    });
  }
};

exports.deleteJobSeekerById = async (req, res, next) => {
  const { jobseekerId } = req.params;
  const result = await deleteJobSeekerByIdQuery(jobseekerId);
  if (result instanceof Error) {
    return next(result);
  }
  if (result.affectedRows === 1) {
    res.sendStatus(204);
  }
};
