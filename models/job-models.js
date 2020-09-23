const db = require('../db/connection');

exports.selectJobs = () => {
  return db
    .promise()
    .query('SELECT * FROM job')
    .then(([rows]) => {
      return rows;
    })
    .catch((err) => {
      return err;
    });
};
