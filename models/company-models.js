const db = require('../db/connection');
const { v4: uuidv4 } = require('uuid');

exports.selectCompanies = () => {
  return db
    .promise()
    .query('SELECT * FROM companies;')
    .then(([rows]) => rows)
    .catch((err) => err);
};

exports.insertCompany = (data) => {
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

exports.selectCompanyById = (companyId) => {
  return db
    .promise()
    .query('SELECT * FROM companies WHERE companyId = ? LIMIT 1;', [companyId])
    .then(([rows]) => rows)
    .catch((err) => err);
};

exports.updateCompanyById = (companyId, body) => {
  return db
    .promise()
    .query('UPDATE companies SET ? WHERE companyId = ?', [body, companyId])
    .then(([result]) => {
      result.companyId = companyId;
      return result;
    })
    .catch((err) => err);
};

exports.deleteCompanyByIdQuery = (companyId) => {
  return db
    .promise()
    .query('DELETE FROM companies WHERE companyId = ?;', [companyId])
    .then(([result]) => result)
    .catch((err) => err);
};
