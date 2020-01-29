const { GraphQLObjectType } = require("graphql");
const { GetMethodQueries } = require("./method");

const RootQueryPromise = new Promise(async (resolve, reject) => {
  const fields = await GetMethodQueries();
  resolve(new GraphQLObjectType({ name: "RootQueryType", type: "Query", fields: fields }));
});
exports.queryPromise = RootQueryPromise;
