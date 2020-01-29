const db = require("../utils/adaptor").DBConnection;
const { GraphQLList, GraphQLID, GraphQLString } = require("graphql");
const { upper1st } = require("../utils/utils");
const { GetTables, GetFieldQueries } = require("./field");
const { InitPromise } = require("./types");

async function GetMethodQueries() {
    var fields = {}
    fields = await GetFieldQueries(fields);
    const tables = await GetTables;
    // fields['getFields'] = {
    //     type: new GraphQLList(FieldType),
    //     args: { schema: { type: GraphQLString }, table: { type: GraphQLString } },
    //     resolve(parentValue, args) {
    //         for(var i=0; i<tables.length; i++) {
    //             if(obj['table_schema'] !== args.schema || obj['table_name'] !== args.table) continue;
    //             return obj['table_fields'];
    //         }
    //         return null;
    //     }
    // }


    for(var i=0; i<tables.length; i++) {
        const tbl = tables[i];
        const ts = tbl.table_shema + '.' + tbl.table_name;
        const n = upper1st(tbl.table_name.split('_')[0]);
        const m = 'get' + n;
        const t = await new Promise(async (resolve, reject) => { return await InitPromise.then(async function(obj){ resolve(await obj[n]) }) });
        fields[m] = {
            type: t,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                const query = `SELECT * FROM ` + ts + ` WHERE id=$1`;
                const values = [ args.id ];
                return db.one(query, values).then(res => res).catch(err => err);
            }
        }
        fields[m +'s'] = {
            type: new GraphQLList(t),
            resolve(parentValue) {
                const query = `SELECT * FROM ` + ts;
                return db.any(query).then(res => res).catch(err => err);
            }
        }
    }
    return fields;    
}

async function GetMethodMutations() {
    const fields = {}
    const tables = await GetTables;
    for(var i=0; i<tables.length; i++) {
        const tbl = tables[i];
        const ts = tbl.table_shema + '.' + tbl.table_name;
        const n = upper1st(tbl.table_name.split('_')[0]);
        const t = await new Promise(async (resolve, reject) => { return await InitPromise.then(async function(obj){ resolve(await obj[n]) }) });

        const fs = tbl['table_fields'];
        const fd = { ins_fd: [], ins_val:[], upd: [] };
        for(var x=0; x<fs.length; x++) {
            if(fs[x]['field_date_type'] === 'PRIMARY KEY') continue;
            fd['ins_fd'].push(fs[x]['field_name']);
            fd['ins_val'].push('$' + (x + 1));
            fd['upd'].push(fs[x]['field_name'] + '=$' + (x + 1));
        }
        console.log(fd);
        fields['add' + n] = {
            type: t
            ,args: { username: { type: GraphQLString }, email: { type: GraphQLString } }
            ,resolve(parentValue, args) {
                const query = `INSERT INTO ` + ts + `(` + fd['ins_fd'].toString() + `) VALUES (` + fd['ins_val'].toString() + `) RETURNING id`;
                const values = [ args.username, args.email ];
                return db.one(query, values).then(res => res).catch(err => err);
            }
        }
        fields['upd' + n] = {
            type: t
            ,args: { userid: { type: GraphQLID },username: { type: GraphQLString }, email: { type: GraphQLString } }
            ,resolve(parentValue, args) {
                const query = `UPDATE ` + ts + ` SET ` + fd['upd'].toString() + ` WHERE id=$3 RETURNING id`;
                const values = [ args.username, args.email, args.userid ];
                return db.one(query, values).then(res => res).catch(err => err);
            }
        }
        fields['del' + n] = {
            type: t
            ,args: { userid: { type: GraphQLID } }
            ,resolve(parentValue, args) {
                const query = `DELETE FROM ` + ts + ` WHERE id=$1 RETURNING id`;
                const values = [ args.userid ];
                return db.one(query, values).then(res => res).catch(err => err);
            }
        }
    }
    return fields;    
}

exports.GetMethodQueries = GetMethodQueries;
exports.GetMethodMutations = GetMethodMutations;
