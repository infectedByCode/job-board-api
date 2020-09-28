const db = require('../db/connection');
const { v4: uuidv4 } = require('uuid');

exports.selectCompanies = () => {
  return db
    .promise()
    .query('SELECT * FROM companies;')
    .then(([rows]) => rows)
    .catch((err) => err);
};

exports.createCompany = (data) => {
  const companyId = uuidv4();
  const { companyAddress, companyEmail, companyName, companyPhone } = data;
  return db
    .promise()
    .query('INSERT INTO companies SET ?;', { companyId, companyName, companyAddress, companyEmail, companyPhone })
    .then(([result]) => {
      result.companyId = companyId;
      return result;
    })
    .catch((err) => err);
};
