process.env.NODE_ENV = 'test';

const { exec } = require('child_process');

const app = require('../app');
const db = require('../db/connection');

const { assert } = require('chai');
const request = require('supertest');
const agent = request.agent(app);
let addedJobId;
let addedCompanyId;
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
              'jobLocation',
              'companyName',
              'companyAddress',
              'companyEmail',
              'companyPhone',
            ]);
          });
        });
    });
    it('POST:201, returns a job reference if posted successfully', () => {
      const jobData = {
        jobTitle: 'developer',
        jobText: 'require 200 years experience',
        salary: 9000,
        applyEmail: 'company@companyemail.com',
        closingDate: '2020-10-01',
        tags: 'developer,full-stack,nodejs',
        companyId: '8888-8888-8888-8888-8888-8888-888888',
      };
      return request(app)
        .post('/jobs')
        .send(jobData)
        .expect(201)
        .then(({ body }) => {
          assert.hasAllKeys(body, ['status', 'msg', 'ref']);
          addedJobId = body.ref;
        });
    });
    describe('/:jobId', () => {
      it('GET:200, returns a single job with correct keys', () => {
        return request(app)
          .get(`/jobs/${addedJobId}`)
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
              'jobLocation',
              'companyName',
              'companyAddress',
              'companyEmail',
              'companyPhone',
            ]);
          });
      });
      it('PATCH:200, updates a single job by its ID', () => {
        const data = {
          jobTitle: 'sample randomness',
          jobText: 'none',
          salary: 1,
          applyEmail: 'email@email.com',
          closingDate: '2020-10-01',
          tags: 'developer,full-stack,nodejs',
          companyId: '8888-8888-8888-8888-8888-8888-888888',
          jobLocation: 'Manchester',
        };
        return request(app)
          .patch(`/jobs/${addedJobId}`)
          .send(data)
          .expect(200)
          .then(({ body }) => {
            assert.hasAllKeys(body, ['status', 'msg']);
          });
      });
      it('DELETE:204, removes a job by ID', () => {
        return request(app).delete(`/jobs/${addedJobId}`).expect(204);
      });
    });
    describe('/search/:searchTerm', () => {
      it('returns an array of jobs matching the a single search keyword in the title or text', () => {
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
                'jobLocation',
                'companyName',
                'companyAddress',
                'companyEmail',
                'companyPhone',
              ]);
            });
          });
      });
      it('returns an array of jobs matching the any of the given search keywords', () => {
        return request(app)
          .get('/jobs/search/pot+sample')
          .expect(200)
          .then(({ body: { jobs } }) => {
            assert.typeOf(jobs, 'array');
            assert.ok(jobs.length > 0);
            jobs.forEach((j) => {
              assert.ok(j.jobTitle.includes('sample') || j.jobText.includes('sample'));
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
                'jobLocation',
                'companyName',
                'companyAddress',
                'companyEmail',
                'companyPhone',
              ]);
            });
          });
      });
    });
    describe('/comapny/:companyId', () => {
      it('returns an array of jobs for a given companyId', () => {
        const companyId = '8888-8888-8888-8888-8888-8888-888888';
        return request(app)
          .get(`/jobs/company/${companyId}`)
          .expect(200)
          .then(({ body: { jobs } }) => {
            assert.typeOf(jobs, 'array');
            jobs.forEach((j) => {
              assert.ok(j.companyId === companyId);
            });
          });
      });
    });
  });
  describe('/companies', () => {
    it('GET:200, returns an array of companies with correct keys', () => {
      return request(app)
        .get('/companies')
        .expect(200)
        .then(({ body: { companies } }) => {
          assert.typeOf(companies, 'array');
          companies.forEach((c) => {
            assert.hasAllKeys(c, ['companyAddress', 'companyEmail', 'companyId', 'companyName', 'companyPhone']);
          });
        });
    });
    it('POST:201, creates a new company', () => {
      const companyData = {
        companyAddress: 'Pizza Shop',
        companyEmail: 'companyZ@email.com',
        companyName: 'Pizza-Z-a',
        companyPhone: '01234 687 900',
      };
      return request(app)
        .post('/companies')
        .send(companyData)
        .expect(201)
        .then(({ body }) => {
          assert.hasAllKeys(body, ['status', 'msg', 'ref']);
          addedCompanyId = body.ref;
        });
    });
    describe('/:companyId', () => {
      it('DELETE:204, removes a company from database and associated jobs', () => {
        return request(app).delete(`/companies/${addedCompanyId}`).expect(204);
      });
    });
  });
});
