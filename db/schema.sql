DROP DATABASE IF EXISTS jobBoard;
DROP DATABASE IF EXISTS jobBoardTest;

CREATE DATABASE jobBoard;
CREATE DATABASE jobBoardTest;

USE jobBoardTest;

DROP TABLE IF EXISTS companies;
CREATE TABLE companies
  (
    companyId       CHAR(36)   NOT NULL,
    companyName     VARCHAR(100)  NOT NULL,
    companyAddress  TEXT       NOT NULL,
    companyEmail    VARCHAR(100)  NOT NULL,
    companyPhone    VARCHAR(20)   NOT NULL,
    PRIMARY KEY (companyId)
  );

INSERT INTO companies (companyId, companyName, companyAddress, companyEmail, companyPhone)
VALUES ("8888-8888-8888-8888-8888-8888-888888", "This company", "Address of my company", "email@company.com", "0800000000");

DROP TABLE IF EXISTS jobs;
CREATE TABLE jobs
  (
    jobId       CHAR(36)   NOT NULL,
    jobTitle    VARCHAR(100)  NOT NULL,
    jobText     TEXT         NOT NULL,
    jobLocation VARCHAR(50)  NOT NULL,
    salary      INT           NOT NULL,
    applyEmail  VARCHAR(100)  NOT NULL,
    closingDate DATETIME      NOT NULL,
    tags        VARCHAR(255)   NULL,
    companyId CHAR(36),
    FOREIGN KEY (companyId) REFERENCES companies(companyId) ON DELETE CASCADE,
    createdAt   DATETIME      DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (jobId)
  );

INSERT INTO jobs (jobId, jobTitle, jobText, jobLocation, salary, applyEmail, closingDate, tags, companyId)
VALUES ("1234-1234-1234-1234-1234-1234-123456", "sample job", "sample text","Manchester" ,15000, "myemail@email.com", "2020-09-30", "MySQL,NodeJS", "8888-8888-8888-8888-8888-8888-888888");

DROP TABLE IF EXISTS companiesLogin;
CREATE TABLE companiesLogin
  (
    rowId INT NOT NULL AUTO_INCREMENT,
    companyPassword CHAR(64)   NOT NULL,
    companyEmail VARCHAR(100) NOT NULL,
    companyId CHAR(36),
    FOREIGN KEY (companyId) REFERENCES companies(companyId) ON DELETE CASCADE,
    PRIMARY KEY (rowId)
  );

DROP TABLE IF EXISTS jobseekers;
CREATE TABLE jobseekers
  (
    jobseekerId       CHAR(36)   NOT NULL,
    jobseekerForename VARCHAR(50)   NOT NULL,
    jobseekerSurname  VARCHAR(50)   NOT NULL,
    jobKeywords       VARCHAR(255)         NULL,
    accountCreated    DATETIME  DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (jobseekerId)
  );

DROP TABLE IF EXISTS jobseekersLogin;
CREATE TABLE jobseekersLogin
  (
    rowId INT NOT NULL AUTO_INCREMENT,
    jobseekerEmail    VARCHAR(100) NOT NULL,
    jobseekerPassword CHAR(64)     NOT NULL,
    jobseekerId CHAR(36),
    FOREIGN KEY (jobseekerId) REFERENCES jobseekers(jobseekerId) ON DELETE CASCADE,
    PRIMARY KEY (rowId)
  );

-- WILL NEED MORE INFORMATION
-- EITHER resume and cover letter blobs/hash or text
-- routes will need to control sending application
DROP TABLE IF EXISTS applications;
CREATE TABLE applications
  (
    applicationID CHAR(36) NOT NULL,
    jobId CHAR(36),
    companyId CHAR(36),
    jobseekerId CHAR(36),
    applicationDate DATETIME  DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (applicationID)
  );
