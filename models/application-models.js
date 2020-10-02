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
