const db = require('../db/connection');
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');
const { jwtSecret } = require('../config').createConfig();

exports.loginUserQuery = (data) => {
  const { password, email, userId, role } = data;
  const table = role === 'jobseeker' ? 'jobseekersLogin' : 'companiesLogin';
  return db
    .promise()
    .query(`SELECT ${role}Id AS userId, ${role}Password AS hash FROM ${table} WHERE ${role}Id = ?;`, [userId])
    .then(([rows]) => {
      if (rows.length === 0) {
        return rows;
      }
      const pw = crypto.AES.decrypt(rows[0].hash, process.env.HASH_SECRET).toString(crypto.enc.Utf8);
      if (rows[0].userId === userId && password === pw) {
        const token = jwt.sign({ userId }, jwtSecret, { expiresIn: '1m' });
        rows[0].token = token;
        console.log(token);
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
    return decodedToken.userId === userId;
  });
};
