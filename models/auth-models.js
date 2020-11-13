const db = require('../db/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwtSecret } = require('../config').createConfig();

exports.loginUserQuery = (data) => {
  const { password, email, userId, role } = data;
  const table = role === 'jobseeker' ? 'jobseekersLogin' : 'companiesLogin';
  return db
    .promise()
    .query(
      `SELECT ${role}Id AS userId, ${role}Password AS hash FROM ${table} WHERE ${role}Id = ? OR ${role}Email = ?;`,
      [userId, email]
    )
    .then(([rows]) => {
      if (rows.length === 0) {
        return rows;
      }
      const isMatch = bcrypt.compareSync(password, rows[0].hash);
      if (isMatch) {
        const token = jwt.sign({ userId }, jwtSecret, { expiresIn: '30m' });
        rows[0].token = token;
        return rows[0];
      } else {
        return [];
      }
    })
    .catch((err) => err);
};

exports.checkAuth = (token, userId) => {
  return jwt.verify(token, jwtSecret, (err, decodedToken) => {
    if (err || !decodedToken) {
      return false;
    }
    return true;
  });
};
