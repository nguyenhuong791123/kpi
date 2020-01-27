'use strict';
require('dotenv').config()
const fs = require('fs');
const pgPromise = require('pg-promise');

const pgp = pgPromise({});
let confJson = JSON.parse(fs.readFileSync('msg/system.json'));
const conf = {
    host: confJson['host']
    ,port: confJson['port']
    ,database: confJson['database']
    ,user: confJson['user']
    ,password: confJson['password']
};
const db = pgp(conf);

exports.db = db;