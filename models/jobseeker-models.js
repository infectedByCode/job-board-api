const db = require('../db/connection');
const { v4: uuidv4 } = require('uuid');

exports.insertJobSeeker = (data) => {
  const jobSeekerId = uuidv4();
  const { jobseekerForename, jobseekerSurname, jobKeywords } = data;
  return db
    .promise()
    .query('INSERT INTO jobseekers SET ?;', { jobSeekerId, jobseekerForename, jobseekerSurname, jobKeywords })
    .then(([rows]) => {
      rows.jobSeekerId = jobSeekerId;
      return rows;
    })
    .catch((err) => err);
};

exports.selectJobSeekerById = (jobSeekerId) => {
  return db
    .promise()
    .query('SELECT * FROM jobseekers WHERE jobSeekerId = ?;', [jobSeekerId])
    .then(([rows]) => rows)
    .catch((err) => err);
};

exports.updateJobSeekerById = (jobSeekerId, data) => {
  return db
    .promise()
    .query('UPDATE jobseekers SET ? WHERE jobseekerId = ?;', [data, jobSeekerId])
    .then(([rows]) => {
      rows.jobSeekerId = jobSeekerId;
      return rows;
    })
    .catch((err) => err);
};

exports.deleteJobSeekerByIdQuery = (jobSeekerId) => {
  return db
    .promise()
    .query('DELETE FROM jobseekers WHERE jobseekerId = ?;', [jobSeekerId])
    .then(([rows]) => rows)
    .catch((err) => err);
};