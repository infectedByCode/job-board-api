const db = require('../db/connection');
const { v4: uuidv4 } = require('uuid');

exports.insertApplication = (body) => {
  const applicationID = uuidv4();
  const { jobId, companyId, jobseekerId } = body;
  return db
    .promise()
    .query('INSERT INTO applications SET ?;', { applicationID, jobId, companyId, jobseekerId })
    .then(([result]) => {
      result.applicationID = applicationID;
      return result;
    })
    .catch((err) => err);
};

exports.selectApplicationsByJobId = (jobId) => {
  return db
    .promise()
    .query(
      `SELECT
        a.applicationID,
        a.applicationDate,
        a.companyId,
        a.jobId,
        a.jobseekerId,
        j.closingDate,
        j.jobText,
        j.jobTitle,
        js.jobseekerForename,
        js.jobseekerSurname
      FROM applications AS a
        LEFT JOIN jobs AS j ON a.jobId = j.jobId
        LEFT JOIN jobseekers AS js ON a.jobseekerId = js.jobseekerId
        WHERE a.jobId = ?;`,
      [jobId]
    )
    .then(([rows]) => rows)
    .catch((err) => err);
};

exports.selectApplicationsByCompanyId = (companyId) => {
  return db
    .promise()
    .query(
      `
      SELECT
        a.applicationID,
        a.applicationDate,
        a.companyId,
        a.jobId,
        a.jobseekerId,
        j.closingDate,
        j.jobText,
        j.jobTitle,
        js.jobseekerForename,
        js.jobseekerSurname\
      FROM applications AS a
        LEFT JOIN jobs AS j ON a.jobId = j.jobId
        LEFT JOIN jobseekers AS js ON a.jobseekerId = js.jobseekerId
        WHERE a.companyId = ?;
      `,
      [companyId]
    )
    .then(([rows]) => rows)
    .catch((err) => err);
};

exports.selectApplicationsByjobseekerId = (jobseekerId) => {
  return db
    .promise()
    .query(
      `
      SELECT
        a.jobseekerId,
        a.applicationDate,
        a.applicationID,
        a.companyId,
        c.companyEmail,
        c.companyName,
        c.companyPhone,
        j.jobId,
        j.jobLocation,
        j.jobText,
        j.jobTitle,
        j.closingDate
      FROM applications AS a
        LEFT JOIN companies AS c ON a.companyId = c.companyId
        LEFT JOIN jobs AS j on a.jobId = j.jobId
        WHERE a.jobseekerId = ?;
      `,
      [jobseekerId]
    )
    .then(([rows]) => rows)
    .catch((err) => err);
};
