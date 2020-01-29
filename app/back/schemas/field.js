// var sleep = require('sleep');
const db = require("../utils/adaptor").DBConnection;
const { GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString } = require("graphql");

const Fields = {
    field_name: { type: GraphQLString }
    ,field_data_type: { type: GraphQLString }
    ,field_constraint_type: { type: GraphQLString }
    ,field_required: { type: GraphQLString }
    ,field_default: { type: GraphQLString }
    ,field_maximum_length: { type: GraphQLString }
    ,field_comment: { type: GraphQLString }
}

const QueryTables = "SELECT tbl.table_schema, tbl.table_name"
                    .concat(",(SELECT json_agg(json) FROM (SELECT "
                    ).concat("c.column_name AS field_name"
                    ).concat(",c.data_type AS field_data_type"
                    ).concat(",c.is_nullable AS field_required"
                    ).concat(",c.column_default AS field_default"
                    ).concat(",c.character_maximum_length AS field_maximum_length"
                    ).concat(",(SELECT pg_catalog.col_description(oid,c.ordinal_position::int) from pg_catalog.pg_class cl where cl.relname=c.table_name) AS field_comment"
                    ).concat(",(SELECT tc.constraint_type"
                    ).concat(" FROM information_schema.table_constraints tc "
                    ).concat(" JOIN information_schema.key_column_usage ku ON ku.constraint_name=tc.constraint_name "
                    ).concat(" WHERE ku.table_schema=c.table_schema AND ku.table_name=c.table_name AND ku.column_name=c.column_name) AS field_constraint_type "
                    ).concat(" FROM information_schema.columns AS c WHERE c.table_schema=tbl.table_schema AND c.table_name=tbl.table_name) AS json) AS table_fields "
                    ).concat(" FROM information_schema.tables tbl "
                    ).concat(" WHERE tbl.table_schema NOT IN('pg_catalog', 'information_schema') ");

const QueryFields = 'SELECT '//c.table_schema AS field_schema,c.table_name AS field_table,
                    .concat('c.column_name AS field_name'
                    ).concat(',c.data_type AS field_data_type'
                    ).concat(',c.is_nullable AS field_required'
                    ).concat(',c.column_default AS field_default'
                    ).concat(',c.character_maximum_length AS field_maximum_length'
                    ).concat(',(SELECT pg_catalog.col_description(oid,c.ordinal_position::int) from pg_catalog.pg_class cl where cl.relname=c.table_name) AS field_comment'
                    ).concat(',(SELECT tc.constraint_type'
                    ).concat(' FROM information_schema.table_constraints tc '
                    ).concat(' JOIN information_schema.key_column_usage ku ON ku.constraint_name=tc.constraint_name '
                    ).concat(' WHERE ku.table_schema=c.table_schema AND ku.table_name=c.table_name AND ku.column_name=c.column_name '
                    ).concat(') AS field_constraint_type'
                    ).concat(' FROM information_schema.columns AS c '
                    ).concat(' WHERE c.table_schema=$1 AND c.table_name=$2');


const GetTables = new Promise(async (resolve, reject) => {
    resolve(await db.any(QueryTables).then(tbls => {
        return tbls.map((obj) => {
            const fs = obj['table_fields'];
            const paras = {};
            fs.map((f) => {
                const fdn = f['field_name'];
                if(f['field_constraint_type'] === 'PRIMARY KEY') {
                    obj['key'] = fdn;
                    paras[fdn] = { type: GraphQLInt }
                } else {
                    paras[fdn] = (f['field_data_type'] === 'integer')?{ type: GraphQLInt }:{ type: GraphQLString }
                }
            });
            obj['paras'] = paras;
            return obj;
        });
    }).catch(err => err));
});

async function GetFields(shema, table) {
    return await db.any(QueryFields, [ shema, table ]
        ).then((res) => {
            const fields = {};
            for(var i=0; i<res.length; i++) {
                fields[res[i]['field_name']] = { type: GraphQLString };
            }
            return fields;
        }).catch(err => err);
}

async function GetFieldQueries(fields) {
    const FieldType = new GraphQLObjectType({ name: "Field", type: "Query", fields: Fields });
    fields['getFields'] = {
        type: new GraphQLList(FieldType),
        args: { schema: { type: GraphQLString }, table: { type: GraphQLString } },
        resolve(parentValue, args) {
            return db.any(QueryFields, [args.schema, args.table ]).then(res => res).catch(err => err);
        }
    }
    return fields;
}

exports.Fields = Fields;
exports.GetTables = GetTables;
exports.GetFields = GetFields;
exports.GetFieldQueries = GetFieldQueries;
