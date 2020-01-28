const { GraphQLObjectType } = require("graphql");
const { addFieldQueries } = require("./fields/field");
const { addUserQueries } = require("./methods/user");
const { addGroupQueries } = require("./methods/group");

const RootQueryPromise = new Promise(async (resolve, reject) => {
  var fields = {};
  fields = await addFieldQueries(fields);
  fields = await addUserQueries(fields);
  fields = await addGroupQueries(fields);

  resolve(new GraphQLObjectType({ name: "RootQueryType", type: "Query", fields: fields }));
});

exports.queryPromise = RootQueryPromise;
