process.env.NODE_ENV = 'test';

const { exec } = require('child_process');

const app = require('../app');
const db = require('../db/connection');

const { assert } = require('chai');
const request = require('supertest');
const agent = request.agent(app);
let addedJobId;
let addedCompanyId;
let addedJobSeekerId;
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
    it('POST:400, returns an error if required job data if missing', () => {
      const jobData = {
        jobTitle: 'developer',
        jobText: 'require 200 years experience',
        companyId: '8888-8888-8888-8888-8888-8888-888888',
      };
      return request(app)
        .post('/jobs')
        .send(jobData)
        .expect(400)
        .then(({ body }) => {
          assert.hasAllKeys(body, ['status', 'msg']);
          assert.ok(body.msg === 'missing or malformed data');
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
      it('GET:404, returns an error if jobId not found', () => {
        return request(app)
          .get('/jobs/1234')
          .expect(404)
          .then(({ body }) => {
            assert.typeOf(body, 'object');
            assert.hasAllKeys(body, ['status', 'msg']);
            assert.ok(body.msg === 'Unable to get job with ID 1234');
          });
      });
      it('PATCH:400, returns an error is data is missing or malformed', () => {
        return request(app)
          .patch(`/jobs/${addedJobId}`)
          .send({})
          .expect(400)
          .then(({ body }) => {
            assert.hasAllKeys(body, ['status', 'msg']);
            assert.ok(body.msg === 'missing or malformed data');
          });
      });
      it('PATCH:404, returns an error if job is not found', () => {
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
          .patch('/jobs/1234')
          .send(data)
          .expect(404)
          .then(({ body }) => {
            assert.hasAllKeys(body, ['status', 'msg']);
            assert.ok(body.msg === 'Unable to update job with ID 1234');
          });
      });
      it('DELETE:404, returns an error if job is not found', () => {
        return request(app).delete(`/jobs/${addedJobId}`).expect(404);
      });
    });
    describe('/search/:searchTerm', () => {
      it('GET:200, returns an array of jobs matching the a single search keyword in the title or text', () => {
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
      it('GET:200, returns an array of jobs matching the any of the given search keywords', () => {
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
      it('GET:200, returns an empty array if search term not found', () => {
        return request(app)
          .get('/jobs/search/areallyunlikelysearchtermtobefound')
          .expect(200)
          .then(({ body: { jobs } }) => {
            assert.typeOf(jobs, 'array');
            assert.ok(jobs.length === 0);
          });
      });
    });
    describe('/comapny/:companyId', () => {
      it('GET:200, returns an array of jobs for a given companyId', () => {
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
        companyPassword: 'very-secure-password',
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
    it('POST:400, returns an error if company data is missing or malformed', () => {
      return request(app)
        .post('/companies')
        .send({})
        .expect(400)
        .then(({ body }) => {
          assert.hasAllKeys(body, ['status', 'msg']);
          assert.ok(body.msg === 'missing or malformed data');
        });
    });
    // TODO: refactor so jobseeker is not deleted before login
    describe('/auth', () => {
      describe('/login', () => {
        it('returns an jwt if the jobseeker successfully logs in', () => {
          const data = {
            password: 'very-secure-password',
            email: 'companyZ@email.com',
            userId: addedCompanyId,
            role: 'company',
          };
          return request(app)
            .post('/auth/login')
            .send(data)
            .expect(200)
            .then(({ body }) => {
              assert.typeOf(body, 'object');
              assert.hasAllKeys(body, ['status', 'token', 'msg', 'userId']);
              assert.typeOf(body.token, 'string');
              assert.ok(body.userId === addedCompanyId);
            });
        });
      });
    });
    describe('/:companyId', () => {
      it('GET:200, returns a company by ID', () => {
        return request(app)
          .get(`/companies/${addedCompanyId}`)
          .expect(200)
          .then(({ body }) => {
            assert.hasAllKeys(body, ['status', 'company']);
            assert.hasAllKeys(body.company, [
              'companyAddress',
              'companyEmail',
              'companyId',
              'companyName',
              'companyPhone',
            ]);
            assert.ok(body.company.companyId === addedCompanyId);
          });
      });
      it('PATCH:200, updates a single company by its ID', () => {
        const data = {
          companyAddress: '888 Fortune Building',
          companyEmail: 'fortune@email.com',
          companyName: 'Fortune 888',
          companyPhone: '0800 888 888',
        };
        return request(app)
          .patch(`/companies/${addedCompanyId}`)
          .send(data)
          .expect(200)
          .then(({ body }) => {
            assert.hasAllKeys(body, ['status', 'msg']);
            assert.ok(body.msg === `company ${addedCompanyId} updated successfully`);
          });
      });
      it('DELETE:204, removes a company from database and associated jobs', () => {
        return request(app).delete(`/companies/${addedCompanyId}`).expect(204);
      });
      it('GET:404, returns an error if company ID not valid', () => {
        return request(app)
          .get('/companies/1234')
          .expect(400)
          .then(({ body }) => {
            assert.hasAllKeys(body, ['status', 'msg']);
            assert.ok(body.msg === 'unable to get company with ID 1234');
          });
      });
      it('PATCH:400, returns an error if data is missing or malformed', () => {
        return request(app)
          .patch(`/companies/${addedCompanyId}`)
          .send({})
          .expect(400)
          .then(({ body }) => {
            assert.hasAllKeys(body, ['status', 'msg']);
            assert.ok(body.msg === 'missing or malformed data');
          });
      });
      it('PATCH:404, returns an error if company ID is not found', () => {
        const data = {
          companyAddress: '888 Fortune Building',
          companyEmail: 'fortune@email.com',
          companyName: 'Fortune 888',
          companyPhone: '0800 888 888',
        };
        return request(app)
          .patch('/companies/1234')
          .send(data)
          .expect(404)
          .then(({ body }) => {
            assert.hasAllKeys(body, ['status', 'msg']);
            assert.ok(body.msg === `unable to update company with ID 1234`);
          });
      });
      it('DELETE:404, returns an error if company ID is not found', () => {
        return request(app)
          .delete('/companies/1234')
          .expect(404)
          .then(({ body }) => {
            assert.hasAllKeys(body, ['status', 'msg']);
            assert.ok(body.msg === 'unable to delete company with ID 1234');
          });
      });
    });
  });
  describe('/jobseekers', () => {
    it('POST:201, inserts a new jobseeker', () => {
      const data = {
        jobseekerForename: 'Jack',
        jobseekerSurname: 'Jones',
        jobKeywords: 'developer,cleaner,office',
        jobseekerEmail: 'needajob@email.com',
        jobseekerPassword: 'super-safe-pw',
      };
      return request(app)
        .post('/jobseekers')
        .send(data)
        .expect(201)
        .then(({ body }) => {
          assert.hasAllKeys(body, ['status', 'msg', 'ref']);
          addedJobSeekerId = body.ref;
        });
    });
    // TODO: refactor so jobseeker is not deleted before login
    describe('/auth', () => {
      describe('/login', () => {
        it('returns an jwt if the jobseeker successfully logs in', () => {
          const data = {
            password: 'super-safe-pw',
            email: 'needajob@email.com',
            userId: addedJobSeekerId,
            role: 'jobseeker',
          };
          return request(app)
            .post('/auth/login')
            .send(data)
            .expect(200)
            .then(({ body }) => {
              assert.typeOf(body, 'object');
              assert.hasAllKeys(body, ['status', 'token', 'msg', 'userId']);
              assert.typeOf(body.token, 'string');
              assert.ok(body.userId === addedJobSeekerId);
            });
        });
      });
    });
    describe('/:jobSeekerId', () => {
      it('GET:200, selects jobseeker by their ID', () => {
        return request(app)
          .get(`/jobseekers/${addedJobSeekerId}`)
          .then(({ body }) => {
            assert.hasAllKeys(body, ['status', 'jobseeker']);
            assert.hasAllKeys(body.jobseeker, [
              'jobseekerForename',
              'jobseekerSurname',
              'jobKeywords',
              'jobseekerId',
              'accountCreated',
            ]);
            assert.ok(body.jobseeker.jobseekerId === addedJobSeekerId);
          });
      });
      it('PATCH:200, updates a jobseeker by their ID', () => {
        const data = {
          jobseekerForename: 'Peter',
          jobseekerSurname: 'Smith',
          jobKeywords: 'developer,cleaner,office,nodejs',
        };
        return request(app)
          .patch(`/jobseekers/${addedJobSeekerId}`)
          .send(data)
          .expect(200)
          .then(({ body }) => {
            assert.hasAllKeys(body, ['status', 'msg']);
            assert.ok(body.msg === `jobseeker ${addedJobSeekerId} successfully updated`);
          });
      });
      it('DELETE:204, deletes a jobseeker by their ID', () => {
        return request(app).delete(`/jobseekers/${addedJobSeekerId}`).expect(204);
      });
    });
  });
  describe('/applications', () => {
    it('POST:201, saves application', () => {
      const data = {
        jobId: '3dfb5aa8-43de-47ff-ab17-3db14a8c046a',
        companyId: '57f0715c-1084-46b8-b976-e4ac2aae4576',
        jobseekerId: 'a06d34ae-fe1c-43ed-b29d-0c4b7777b300',
      };
      return request(app)
        .post('/applications')
        .send(data)
        .expect(201)
        .then(({ body }) => {
          assert.hasAllKeys(body, ['status', 'msg', 'ref']);
        });
    });
    describe('job/:jobId', () => {
      it('GET:200, returns an array of applications for a given jobId', () => {
        const jobId = '3dfb5aa8-43de-47ff-ab17-3db14a8c046a';
        return request(app)
          .get(`/applications/job/${jobId}`)
          .expect(200)
          .then(({ body }) => {
            assert.hasAllKeys(body, ['status', 'applications']);
            assert.typeOf(body.applications, 'array');
            body.applications.forEach((application) => {
              assert.hasAllKeys(application, [
                'applicationID',
                'jobId',
                'companyId',
                'jobseekerId',
                'applicationDate',
                'closingDate',
                'jobText',
                'jobTitle',
                'jobseekerForename',
                'jobseekerSurname',
              ]);
            });
          });
      });
    });
    describe('company/:companyId', () => {
      it('GET:200, returns an array of applications for a given companyId', () => {
        const companyId = '57f0715c-1084-46b8-b976-e4ac2aae4576';
        return request(app)
          .get(`/applications/company/${companyId}`)
          .expect(200)
          .then(({ body }) => {
            assert.hasAllKeys(body, ['status', 'applications', 'companyId']);
            assert.typeOf(body.applications, 'array');
            body.applications.forEach((application) => {
              assert.hasAllKeys(application, [
                'applicationID',
                'jobId',
                'companyId',
                'jobseekerId',
                'applicationDate',
                'closingDate',
                'jobText',
                'jobTitle',
                'jobseekerForename',
                'jobseekerSurname',
              ]);
            });
          });
      });
    });
    describe('jobseeker/:jobseekerId', () => {
      it('GET:200, returns an array of applications for a given jobseekerId', () => {
        const jobseekerId = 'a06d34ae-fe1c-43ed-b29d-0c4b7777b300';
        return request(app)
          .get(`/applications/jobseeker/${jobseekerId}`)
          .expect(200)
          .then(({ body }) => {
            assert.hasAllKeys(body, ['status', 'applications']);
            assert.typeOf(body.applications, 'array');
            body.applications.forEach((application) => {
              assert.hasAllKeys(application, [
                'applicationID',
                'jobId',
                'companyId',
                'companyName',
                'companyEmail',
                'companyPhone',
                'jobseekerId',
                'applicationDate',
                'closingDate',
                'jobText',
                'jobTitle',
                'jobLocation',
              ]);
            });
          });
      });
    });
  });
});
