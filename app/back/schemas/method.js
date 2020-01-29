const db = require("../utils/adaptor").DBConnection;
const { GraphQLList, GraphQLString, GraphQLNonNull } = require("graphql");
const { getTableNames, delStartsEndsWithExt } = require("../utils/utils");
const { GetTables, GetFieldQueries } = require("./field");
const { InitPromise } = require("./types");

async function GetMethodQueries() {
    var fields = {}
    fields = await GetFieldQueries(fields);
    const tables = await GetTables;
    for(var i=0; i<tables.length; i++) {
        const tbl = tables[i];
        const ts = tbl["table_schema"] + "." + tbl["table_name"];
        const n = getTableNames(tbl["table_name"]);
        const m = "get" + n;
        const t = await new Promise(async (resolve, reject) => { return await InitPromise.then(async function(obj){ resolve(await obj[n]) }) });
        const paras = {};
        paras["cols"] = { type: GraphQLString }
        paras["where"] = { type: GraphQLString }
        fields[m +"s"] = {
            type: new GraphQLList(t)
            ,args: paras
            ,resolve(parentValue, args) {
                var cols = (args.cols !== undefined && args.cols !== null)?args.cols:"*";
                var query = "SELECT " + cols + " FROM " + ts;
                const where = args.where;
                if(where !== undefined && where !== null) {
                    query += " WHERE " + where;
                }
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
        const key = tbl["key"];
        const ts = tbl["table_schema"] + "." + tbl["table_name"];
        const n = getTableNames(tbl["table_name"]);
        const t = await new Promise(async (resolve, reject) => { return await InitPromise.then(async function(obj){ resolve(await obj[n]) }) });
        fields["add" + n] = {
            type: t
            ,args: tbl["paras"]
            ,resolve(parentValue, args) {
                const field = Object.keys(args).map((o) => o).toString();
                const fIdx = Object.keys(args).map((o, idx) => "$" + (idx + 1)).toString();
                var query = "INSERT INTO " + ts + "(" + field + ") VALUES (" + fIdx + ")";
                if(key !== null) {
                    query += " RETURNING " + key
                }
                const values = Object.keys(args).map((o) => args[o]);
                return db.one(query, values).then(res => res).catch(err => err);
            }
        }
        const paras = Object.assign({}, tbl["paras"]);
        paras["where"] = { type: GraphQLNonNull(GraphQLString) }
        fields["upd" + n] = {
            type: t
            ,args: paras
            ,resolve(parentValue, args) {
                var field = delStartsEndsWithExt(Object.keys(args).map((o, idx) => { if(o !== key) return o + "=$" + (idx + 1) }).toString(), ",");
                // var kIdx = Object.keys(args).map((o, idx) => { if(o === key) return "$" + (idx + 1) }).toString().replace(/,/gi, "");
                var query = "UPDATE " + ts + " SET " + field;
                const where = args.where;
                if(where !== undefined && where !== null) query += " WHERE " + where;
                if(key !== null) query += " RETURNING " + key;
                const values = Object.keys(args).map((o) => args[o]);
                return db.one(query, values).then(res => res).catch(err => err);
            }
        }
        fields["del" + n] = {
            type: t
            ,args: { "where": { type: GraphQLNonNull(GraphQLString) } }
            ,resolve(parentValue, args) {
                const field = Object.keys(args).map((o, idx) => {
                    if(idx === 0) {
                        return o + "=$" + (idx + 1);
                    } else {
                        return " AND " +  o + "=$" + (idx + 1);
                    }
                }).toString();
                var query = "DELETE FROM " + ts;
                if(where !== undefined && where !== null) query += " WHERE " + where;
                if(key !== null) query += " RETURNING " + key;
                const values = Object.keys(args).map((o) => args[o]);
                return db.one(query, values).then(res => res).catch(err => err);
            }
        }
    }
    return fields;    
}

exports.GetMethodQueries = GetMethodQueries;
exports.GetMethodMutations = GetMethodMutations;
