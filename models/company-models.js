const db = require('../db/connection');
const { v4: uuidv4 } = require('uuid');
const encrypt = require('crypto-js/sha256');

exports.selectCompanies = () => {
  return db
    .promise()
    .query('SELECT * FROM companies;')
    .then(([rows]) => rows)
    .catch((err) => err);
};

exports.insertCompany = (data) => {
  const companyId = uuidv4();
  const { companyAddress, companyEmail, companyName, companyPhone, companyPassword } = data;
  const hash = String(encrypt(companyPassword));
  return db
    .promise()
    .query('INSERT INTO companies SET ?;', { companyId, companyName, companyAddress, companyEmail, companyPhone })
    .then(([result]) => {
      result.companyId = companyId;
      return result;
    })
    .then((result) => {
      // TODO: extract logic
      if (result.affectedRows === 1) {
        return db
          .promise()
          .query('INSERT INTO companiesLogin SET ?;', {
            companyId: result.companyId,
            companyEmail,
            companyPassword: hash,
          })
          .then(([rows]) => {
            return rows.affectedRows === 1 ? result : throw new Error('error creating user');
          })
          .catch((err) => err);
      }
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
