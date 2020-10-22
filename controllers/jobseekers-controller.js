const {
  insertJobSeeker,
  selectJobSeekerById,
  updateJobSeekerById,
  deleteJobSeekerByIdQuery,
} = require('../models/jobseeker-models');

exports.postJobSeeker = async (req, res, next) => {
  const result = await insertJobSeeker(req.body);
  if (result instanceof Error) {
    return next(result);
  }
  if (typeof result === 'undefined')
    return res.status(400).json({
      status: 400,
      msg: 'missing or malformed data',
    });
  if (result.affectedRows === 1) {
    return res.status(201).json({
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
  if (result.length === 0) {
    return res.status(404).json({
      status: 404,
      msg: `jobseeker with ID ${jobseekerId} not found`,
    });
  }
  if (result.length === 1) {
    return res.status(200).json({
      status: 200,
      jobseeker: result[0],
    });
  }
};

exports.patchJobSeekerById = async (req, res, next) => {
  const { jobseekerId } = req.params;
  const result = await updateJobSeekerById(jobseekerId, req.body);
  if (result instanceof Error) {
    return next(result);
  }
  if (result.affectedRows === 0) {
    return res.status(404).json({
      status: 404,
      msg: `jobseeker with ID ${jobseekerId} unable to be updated`,
    });
  }
  if (result.affectedRows === 1) {
    return res.status(200).json({
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
  if (result.affectedRows === 0) {
    return res.status(404).json({
      status: 404,
      msg: `unable to delete jobseeker with ID ${jobseekerId}`,
    });
  }
  if (result.affectedRows === 1) {
    return res.sendStatus(204);
  }
};
