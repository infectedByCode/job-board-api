const db = require('../db/connection');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

exports.insertJobSeeker = (data) => {
  const jobSeekerId = uuidv4();
  const { jobseekerForename, jobseekerSurname, jobKeywords, password, email } = data;
  if (typeof password === 'undefined') return;
  const hash = bcrypt.hashSync(password, 15);
  return db
    .promise()
    .query('INSERT INTO jobseekers SET ?;', { jobSeekerId, jobseekerForename, jobseekerSurname, jobKeywords })
    .then(([rows]) => {
      rows.jobSeekerId = jobSeekerId;
      return rows;
    })
    .then((result) => {
      if (result.affectedRows === 1) {
        return db
          .promise()
          .query('INSERT INTO jobseekersLogin SET ?;', {
            jobseekerId: result.jobSeekerId,
            jobseekerPassword: hash,
            jobseekerEmail: email,
          })
          .then(([dbResult]) => {
            return dbResult.affectedRows === 1 ? result : null;
          })
          .catch((err) => err);
      }
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
