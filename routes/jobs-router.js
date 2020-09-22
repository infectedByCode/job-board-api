const jobsRouter = require("express").Router();
const { getJobs } = require("../controllers/jobs-controller");

jobsRouter.get("/", getJobs);

module.exports = jobsRouter;
