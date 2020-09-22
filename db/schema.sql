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

DROP TABLE IF EXISTS jobs;
CREATE TABLE jobs
  (
    jobId       CHAR(36)   NOT NULL,
    jobTitle    VARCHAR(100)  NOT NULL,
    jobText     TEXT         NOT NULL,
    salary      INT           NOT NULL,
    applyEmail  VARCHAR(100)  NOT NULL,
    closingDate DATETIME      NOT NULL,
    tags        VARCHAR(255)   NULL,
    companyId CHAR(36),
    FOREIGN KEY (companyId) REFERENCES companies(companyId),
    createdAt   DATETIME      DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (jobId)
  );

DROP TABLE IF EXISTS companiesLogin;
CREATE TABLE companiesLogin
  (
    rowId INT NOT NULL AUTO_INCREMENT,
    companyPassword CHAR(64)   NOT NULL,
    companyEmail VARCHAR(100) NOT NULL,
    companyId CHAR(36),
    FOREIGN KEY (companyId) REFERENCES companies(companyId),
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
    FOREIGN KEY (jobseekerId) REFERENCES jobseekers(jobseekerId),
    PRIMARY KEY (rowId)
  );

DROP TABLE IF EXISTS applications;
CREATE TABLE applications
  (
    applicationID CHAR(36) NOT NULL,
    jobId CHAR(36),
    companyId CHAR(36),
    jobseekerId CHAR(36),
    FOREIGN KEY (jobId) REFERENCES jobs(jobId),
    FOREIGN KEY (companyId) REFERENCES companies(companyId),
    FOREIGN KEY (jobseekerId) REFERENCES jobseekers(jobseekerId),
    applicationDate DATETIME  DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (applicationID)
  );