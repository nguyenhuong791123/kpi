const db = require("../utils/adaptor").DBConnection;
const { GraphQLList, GraphQLString } = require("graphql");
const { upper1st, delStartsEndsWithExt } = require("../utils/utils");
const { GetTables, GetFieldQueries } = require("./field");
const { InitPromise } = require("./types");

async function GetMethodQueries() {
    var fields = {}
    fields = await GetFieldQueries(fields);
    const tables = await GetTables;
    for(var i=0; i<tables.length; i++) {
        const tbl = tables[i];
        const ts = tbl['table_schema'] + '.' + tbl['table_name'];
        const n = upper1st(tbl['table_name'].split('_')[0]);
        const m = 'get' + n;
        const t = await new Promise(async (resolve, reject) => { return await InitPromise.then(async function(obj){ resolve(await obj[n]) }) });
        const paras = tbl['paras'];
        paras['cols'] = { type: GraphQLString }
        console.log(paras);
        fields[m +'s'] = {
            type: new GraphQLList(t)
            ,args: paras
            ,resolve(parentValue, args) {
                const field = Object.keys(args).map((o, idx) => {
                    if(o !== 'cols') {
                        if(idx === 0) {
                            return o + '=$' + (idx + 1);
                        } else {
                            return ' AND ' +  o + '=$' + (idx + 1);
                        }    
                    } else {
                        return '_cols_';
                    }
                }).toString().replace(/_cols_/gi, '');
                var cols = (args.cols !== undefined && args.cols !== null)?args.cols:'*';
                var query = `SELECT ` + cols + ` FROM ` + ts;
                if(field !== null) {
                    query += ` WHERE ` + field;
                }
                const values = Object.keys(args).map((o) => args[o]);
                console.log(field);
                console.log(cols);
                console.log(values);
                console.log(query);
                return db.any(query, values).then(res => res).catch(err => err);
            }
        }
        // fields[m +'s'] = {
        //     type: new GraphQLList(t)
        //     ,resolve(parentValue) {
        //         const field = Object.keys(args).map((o) => o).toString();
        //         const query = `SELECT ` + field + ` FROM ` + ts;
        //         return db.any(query).then(res => res).catch(err => err);
        //     }
        // }
    }
    return fields;    
}

async function GetMethodMutations() {
    const fields = {}
    const tables = await GetTables;
    for(var i=0; i<tables.length; i++) {
        const tbl = tables[i];
        const key = tbl['key'];
        const ts = tbl['table_schema'] + '.' + tbl['table_name'];
        const n = upper1st(tbl['table_name'].split('_')[0]);
        const t = await new Promise(async (resolve, reject) => { return await InitPromise.then(async function(obj){ resolve(await obj[n]) }) });
        fields['add' + n] = {
            type: t
            ,args: tbl['paras']
            ,resolve(parentValue, args) {
                const field = Object.keys(args).map((o) => o).toString();
                const fIdx = Object.keys(args).map((o, idx) => '$' + (idx + 1)).toString();
                var query = `INSERT INTO ` + ts + `(` + field + `) VALUES (` + fIdx + `)`;
                if(key !== null) {
                    query += ` RETURNING ` + key
                }
                const values = Object.keys(args).map((o) => args[o]);
                return db.one(query, values).then(res => res).catch(err => err);
            }
        }
        fields['upd' + n] = {
            type: t
            ,args: tbl['paras']
            ,resolve(parentValue, args) {
                var field = delStartsEndsWithExt(Object.keys(args).map((o, idx) => { if(o !== key) return o + '=$' + (idx + 1) }).toString(), ',');
                var kIdx = Object.keys(args).map((o, idx) => { if(o === key) return '$' + (idx + 1) }).toString().replace(/,/gi, '');
                var query = `UPDATE ` + ts + ` SET ` + field + ` WHERE ` + key + `=` + kIdx;
                if(key !== null) {
                    query += ` RETURNING ` + key
                }
                const values = Object.keys(args).map((o) => args[o]);
                return db.one(query, values).then(res => res).catch(err => err);
            }
        }
        fields['del' + n] = {
            type: t
            ,args: tbl['paras']
            ,resolve(parentValue, args) {
                const field = Object.keys(args).map((o, idx) => {
                    if(idx === 0) {
                        return o + '=$' + (idx + 1);
                    } else {
                        return ' AND ' +  o + '=$' + (idx + 1);
                    }
                }).toString();
                var query = `DELETE FROM ` + ts + ` WHERE ` + field;
                if(key !== null) {
                    query += ` RETURNING ` + key
                }
                const values = Object.keys(args).map((o) => args[o]);
                return db.one(query, values).then(res => res).catch(err => err);
            }
        }
    }
    return fields;    
}

exports.GetMethodQueries = GetMethodQueries;
exports.GetMethodMutations = GetMethodMutations;
