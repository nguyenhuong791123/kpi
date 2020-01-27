const graphql = require("graphql");
const db = require("../utils/adaptor").db;
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = graphql;
// const { UserType } = require("./types");
const { UserType } = require("./types");
var sys = require('sys');

// mutation {
//   addUser(username: "Test", email: "test@mail.com") {
//     id
//   }
// }
const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  type: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLID },
        email: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO users(username, email) VALUES ($1, $2) RETURNING id`;
        const values = [ args.username, args.email ];
        sys.log(query);
        return db.one(query, values).then(res => res).catch(err => err);
      }
    }
  }
});

exports.mutation = RootMutation;