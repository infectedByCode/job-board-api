const db = require('../db/connection');
const { v4: uuidv4 } = require('uuid');

exports.selectJobs = () => {
  return db
    .promise()
    .query('SELECT * FROM jobs')
    .then(([rows]) => {
      return rows;
    })
    .catch((err) => {
      return err;
    });
};

exports.insertJob = (body) => {
  const jobId = uuidv4();
  const { jobTitle, jobText, salary, applyEmail, closingDate, tags, companyId } = body;
  return db
    .promise()
    .query('INSERT INTO jobs SET ?;', { jobId, jobTitle, jobText, salary, applyEmail, closingDate, tags, companyId })
    .then(([result]) => {
      result.jobId = jobId;
      return result;
    })
    .catch((err) => err);
};

exports.selectJobsByTerm = (searchTerms) => {
  let query = 'SELECT * FROM jobs WHERE jobTitle LIKE ? OR jobText LIKE ?';
  const words = [`%${searchTerms[0]}%`, `%${searchTerms[0]}%`];
  if (searchTerms.length > 1) {
    searchTerms.forEach((x, i) => {
      if (i !== 0) {
        query += ' OR jobTitle LIKE ? OR jobText LIKE ?';
        words.push(`%${searchTerms[i]}%`, `%${searchTerms[i]}%`);
      }
    });
  }
  return db
    .promise()
    .query(query, words)
    .then(([rows]) => {
      return rows;
    })
    .catch((err) => {
      return err;
    });
};

exports.selectJobsByCompanyId = (companyId) => {
  return db
    .promise()
    .query('SELECT * FROM jobs WHERE companyId = ?', [companyId])
    .then(([rows]) => {
      return rows;
    })
    .catch((err) => {
      return err;
    });
};

exports.selectJobById = (jobId) => {
  return db
    .promise()
    .query('SELECT * FROM jobs WHERE jobId = ?', [jobId])
    .then(([rows]) => {
      return rows;
    })
    .catch((err) => {
      return err;
    });
};

exports.updateJobById = (jobId, body) => {
  return db
    .promise()
    .query('UPDATE jobs SET ? WHERE jobId = ?', [body, jobId])
    .then(([result]) => {
      result.jobId = jobId;
      return result;
    })
    .catch((err) => err);
};
