const jobSeekersRouter = require('express').Router();
const {
  postJobSeeker,
  getJobSeekerById,
  patchJobSeekerById,
  deleteJobSeekerById,
} = require('../controllers/jobseekers-controller.js');

jobSeekersRouter.route('/').post(postJobSeeker);
jobSeekersRouter.route('/:jobseekerId').get(getJobSeekerById).patch(patchJobSeekerById).delete(deleteJobSeekerById);

module.exports = jobSeekersRouter;
