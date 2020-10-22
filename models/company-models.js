const db = require('../db/connection');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

exports.selectCompanies = () => {
  return db
    .promise()
    .query('SELECT * FROM companies;')
    .then(([rows]) => rows)
    .catch((err) => err);
};

exports.insertCompany = (data) => {
  const companyId = uuidv4();
  const { companyAddress, email, companyName, companyPhone, password } = data;
  if (typeof password === 'undefined') return;
  const hash = bcrypt.hashSync(password, 15);
  return db
    .promise()
    .query('INSERT INTO companies SET ?;', {
      companyId,
      companyName,
      companyAddress,
      companyEmail: email,
      companyPhone,
    })
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
            companyEmail: email,
            companyPassword: hash,
          })
          .then(([rows]) => {
            return rows.affectedRows === 1 ? result : null;
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
