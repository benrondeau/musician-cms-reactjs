# Musician CMS

A simple web app for tracking live music events using React, Node.js and MySQL database.

### Local Development

**Requirements:**

- Node.js and NPM

**Steps:**

1. Clone repo to your machine.
2. `cd` into root of repo, run `npm install`
3. Create `.env` file in root folder and define value for `CLEARDB_DATABASE_URL`.
4. Run `npm start` to boot up server. View server console output for any errors.


### API Documentation
TBD

### Security Features
- SSL encryption on domain
- SSL encrypted connection to MySQL DB (working on this...)
- All DB queries escaped prior to execution (block SQL injection attacks).