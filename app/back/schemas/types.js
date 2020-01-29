const { GraphQLObjectType } = require("graphql");
const { upper1st } = require("../utils/utils");
const { GetTables, GetFields } = require("./field");

const InitPromise = new Promise(async (resolve, reject) => {
    const types = {};
    const tables = await GetTables;
    for(var i=0; i<tables.length; i++) {
        tbl = tables[i];
        const name = upper1st(tbl.table_name.split('_')[0]);
        types[name] = new Promise(async (resolve, reject) => {
            const fields = await GetFields(tbl.table_schema, tbl.table_name);
            resolve(new GraphQLObjectType({ name: name, type: "Query", fields: fields }));
        });
    }
    resolve(types);
});

exports.InitPromise = InitPromise;
