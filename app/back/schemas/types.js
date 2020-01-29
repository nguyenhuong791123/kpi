const { GraphQLObjectType } = require("graphql");
const { getTableNames } = require("../utils/utils");
const { GetTables, GetFields } = require("./field");

const InitPromise = new Promise(async (resolve, reject) => {
    const types = {};
    const tables = await GetTables;
    for(var i=0; i<tables.length; i++) {
        tbl = tables[i];
        const name = getTableNames(tbl['table_name']);
        types[name] = new Promise(async (resolve, reject) => {
            // const fields = await GetFields(tbl['table_schema'], tbl['table_name']);
            const fields = await GetFields(tbl['table_fields']);
            resolve(new GraphQLObjectType({ name: name, type: "Query", fields: fields }));
        });
    }
    resolve(types);
});

exports.InitPromise = InitPromise;
