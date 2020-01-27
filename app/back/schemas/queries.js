const { db } = require("../utils/adaptor");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");
const { FieldType, UserType } = require("./types");
var sys = require('sys');

// query { 
//   users {
//       username
//       email
//   }
// }
console.log(UserType);
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {
    columns: {
      type: new GraphQLList(FieldType),
      args: {
        schema: { type: GraphQLString }
        ,table: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        // const query = `SELECT json_object_keys(to_json(json_populate_record(NULL::` + args.name + `, '{}'::JSON))) AS field`;
        const query = 'SELECT $1 AS schema,$2 AS table'
        .concat(',column_name AS field_name'
        ).concat(',data_type AS field_type'
        ).concat(',is_nullable AS field_required'
        ).concat(',column_default AS field_default'
        ).concat(',character_maximum_length AS field_length'
        ).concat(',(SELECT pg_catalog.col_description(oid,c.ordinal_position::int) from pg_catalog.pg_class cl where cl.relname=c.table_name) AS field_comment'
        ).concat(' FROM information_schema.columns as c '
        ).concat(' WHERE c.table_schema=$3 AND c.table_name=$4');
        // console.log(query);
        return db.any(query, [ args.schema, args.table, args.schema, args.table ]).then(res => res).catch(err => console.log(err));
      }
    }
    ,
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM users WHERE id=$1`;
        const values = [ args.id ];
        sys.log(query);
        sys.log(values);
        return db.one(query, values).then(res => res).catch(err => sys.log(err));
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue) {
        const query = `SELECT * FROM users`;
        sys.log(query);
        return db.any(query).then(res => res).catch(err => sys.log(err));
      }
    }
  }
});

exports.query = RootQuery;