const db = require('../db/connection');

exports.selectCompanies = () => {
  return db
    .promise()
    .query('SELECT * FROM companies;')
    .then(([rows]) => rows)
    .catch((err) => err);
};
