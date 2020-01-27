var sleep = require('sleep');
const { db } = require("../../utils/adaptor");
const { GraphQLString, GraphQLID } = require("graphql");

const Fields = {
    schema: { type: GraphQLString }
    ,table: { type: GraphQLString }
    ,field_name: { type: GraphQLString }
    ,field_type: { type: GraphQLString }
    ,field_required: { type: GraphQLString }
    ,field_default: { type: GraphQLString }
    ,field_length: { type: GraphQLString }
    ,field_comment: { type: GraphQLString }
}

class ClassFields {
    constructor(shema, table) {
        this.shema = shema;
        this.table = table;
        this.fields = null;
    }

    initFields() {
        const query = 'SELECT $1 AS schema,$2 AS table'
            .concat(',column_name AS field_name'
            ).concat(',column_name AS field_name'
            ).concat(',data_type AS field_type'
            ).concat(',is_nullable AS field_required'
            ).concat(',column_default AS field_default'
            ).concat(',character_maximum_length AS field_length'
            ).concat(',(SELECT pg_catalog.col_description(oid,c.ordinal_position::int) from pg_catalog.pg_class cl where cl.relname=c.table_name) AS field_comment'
            ).concat(' FROM information_schema.columns as c '
            ).concat(' WHERE c.table_schema=$3 AND c.table_name=$4');
        this.fields = db.any(
            query
            ,[ this.shema, this.table, this.shema, this.table ]
            ).then((res) => {
                const fields = {};
                for(var i=0; i<res.length; i++) {
                    fields[res[i]['field_name']] = { type: GraphQLString };
                }
                return fields;
            }).catch(err => err);
    }
}

async function FieldsInit() {
    const cl = new ClassFields('public', 'users');
    cl.initFields();
    cl.fields.then(val => {
        UserFields = val;
        console.log(UserFields);
    });
    // sleep.sleep(5);
}

var UserFields = await FieldsInit();
// {
//     id: { type: GraphQLString }
//     ,username: { type: GraphQLString }
//     ,email: { type: GraphQLString }
// }

exports.Fields = Fields;
exports.FieldsInit = FieldsInit;
exports.UserFields = UserFields;
