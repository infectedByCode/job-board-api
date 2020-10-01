const jobSeekersRouter = require('express').Router();
const { getJobSeekerById, insertJobSeeker } = require('../controllers/jobseekers-controller.js');

jobSeekersRouter.route('/').post(insertJobSeeker);
jobSeekersRouter.route('/:jobseekerId').get(getJobSeekerById);

module.exports = jobSeekersRouter;
