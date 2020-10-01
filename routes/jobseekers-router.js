const jobSeekersRouter = require('express').Router();
const { insertJobSeeker, getJobSeekerById, patchJobSeekerById } = require('../controllers/jobseekers-controller.js');

jobSeekersRouter.route('/').post(insertJobSeeker);
jobSeekersRouter.route('/:jobseekerId').get(getJobSeekerById).patch(patchJobSeekerById);

module.exports = jobSeekersRouter;
