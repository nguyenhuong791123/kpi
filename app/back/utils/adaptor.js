'use strict';
require('dotenv').config()
// var path = require('path');
const fs = require('fs');
const pgPromise = require('pg-promise');
const pgp = pgPromise({});

// console.log(path);
// let sys = JSON.parse(fs.readFileSync(path.join('msg/system.json')))['db'];
let sys = JSON.parse(fs.readFileSync('msg/system.json'))['db'];
const conf = {
    host: sys['host']
    ,port: sys['port']
    ,database: sys['database']
    ,user: sys['user']
    ,password: sys['password']
};

exports.DBConnection = pgp(conf);