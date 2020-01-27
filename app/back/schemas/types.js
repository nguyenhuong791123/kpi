// const graphql = require("graphql");
const { GraphQLObjectType } = require("graphql");
const { Fields, UserFields } = require("./fields/field");

const FieldType = new GraphQLObjectType({ name: "Field", type: "Query", fields: Fields });
const UserType = new GraphQLObjectType({ name: "User", type: "Query", fields: UserFields });

exports.FieldType = FieldType;
exports.UserType = UserType;
