process.env.NODE_ENV = 'test';

const { exec } = require('child_process');

const app = require('../app');
const db = require('../db/connection');

const { assert } = require('chai');
const request = require('supertest');
const agent = request.agent(app);

describe('#app', () => {
  // TODO: reset all db
  beforeEach(() => {});
  after(() => db.end());
  describe('/jobs', () => {
    it('GET:200, returns an array of jobs with correct keys', () => {
      return request(app)
        .get('/jobs')
        .expect(200)
        .then(({ body: { jobs } }) => {
          assert.typeOf(jobs, 'array');
          jobs.forEach((j) => {
            assert.hasAllKeys(j, [
              'jobId',
              'jobTitle',
              'jobText',
              'salary',
              'tags',
              'closingDate',
              'applyEmail',
              'createdAt',
              'companyId',
            ]);
          });
        });
    });
    describe('/:jobId', () => {
      it('GET:200, returns a single job with correct keys', () => {
        return request(app)
          .get('/jobs/1234-1234-1234-1234-1234-1234-123456')
          .expect(200)
          .then(({ body: { job } }) => {
            assert.typeOf(job, 'object');
            assert.hasAllKeys(job, [
              'jobId',
              'jobTitle',
              'jobText',
              'salary',
              'tags',
              'closingDate',
              'applyEmail',
              'createdAt',
              'companyId',
            ]);
          });
      });
    });
    describe('/search/:searchTerm', () => {
      it('returns an array of jobs matching the search term in the title or text', () => {
        return request(app)
          .get('/jobs/search/sample')
          .expect(200)
          .then(({ body: { jobs } }) => {
            assert.typeOf(jobs, 'array');
            jobs.forEach((j) => {
              assert.hasAllKeys(j, [
                'jobId',
                'jobTitle',
                'jobText',
                'salary',
                'tags',
                'closingDate',
                'applyEmail',
                'createdAt',
                'companyId',
              ]);
            });
          });
      });
    });
  });
});
