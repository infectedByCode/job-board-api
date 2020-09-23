const db = require('../db/connection');

exports.selectJobs = () => {
  return db
    .promise()
    .query('SELECT * FROM jobs')
    .then(([rows]) => {
      return rows;
    })
    .catch((err) => {
      return err;
    });
};

exports.selectJobById = (jobId) => {
  return db
    .promise()
    .query('SELECT jobTitle AS title FROM jobs WHERE jobId = ?', [jobId])
    .then(([rows]) => {
      return rows;
    })
    .catch((err) => {
      return err;
    });
};
