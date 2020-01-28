'use strict';
require('dotenv').config()
const fs = require('fs');
const pgPromise = require('pg-promise');
const pgp = pgPromise({});

// async function DBConnection(conf) {
//     return await new Promise(async (resolve, reject) => {
//         let sys = JSON.parse(fs.readFileSync('msg/system.json'));
//         if(conf === undefined || conf === null) {
//             conf = {
//                 host: sys['host']
//                 ,port: sys['port']
//                 ,database: sys['database']
//                 ,user: sys['user']
//                 ,password: sys['password']
//             };    
//         }
//         resolve(pgp(conf));
//     });
// }

let sys = JSON.parse(fs.readFileSync('msg/system.json'));
const conf = {
    host: sys['host']
    ,port: sys['port']
    ,database: sys['database']
    ,user: sys['user']
    ,password: sys['password']
};

exports.DBConnection = pgp(conf);