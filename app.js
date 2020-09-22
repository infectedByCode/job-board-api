const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Routers
const jobsRouter = require("./routes/jobs-router.js");

// health checker
app.all("/", (req, res, next) => {
  res.json({
    status: 200,
    msg: "OK",
  });
});
app.use("/jobs", jobsRouter);

app.listen(port, () => {
  console.log("server started");
});
