const jobSeekersRouter = require('express').Router();
const { authUser } = require('../controllers/auth-controller');
const {
  postJobSeeker,
  getJobSeekerById,
  patchJobSeekerById,
  deleteJobSeekerById,
} = require('../controllers/jobseekers-controller.js');

jobSeekersRouter.route('/').post(postJobSeeker);
jobSeekersRouter
  .route('/:jobseekerId')
  .get(authUser, getJobSeekerById)
  .patch(authUser, patchJobSeekerById)
  .delete(authUser, deleteJobSeekerById);

module.exports = jobSeekersRouter;
