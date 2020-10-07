const db = require('../db/connection');
const jwt = require('jsonwebtoken');
const encrypt = require('crypto-js/sha256');

exports.loginUserQuery = (data) => {
  const { password, email, userId, role } = data;
  const table = role === 'jobseeker' ? 'jobseekersLogin' : 'companiesLogin';
  const hash = String(encrypt(password));
  return db
    .promise()
    .query(`SELECT ${role}Id FROM ${table} WHERE ${role}Id = ? AND ${role}Password = ?;`, [userId, hash])
    .then(([rows]) => {
      // TODO: tidy up code
      if (rows[0].jobseekerId === userId) {
        const token = jwt.sign({ userId }, 'ourlittlesecret', { expiresIn: '1h' });
        rows[0].token = token;
        rows[0].userId = rows[0].jobseekerId;
        return rows[0];
      }
    })
    .catch((err) => err);
};