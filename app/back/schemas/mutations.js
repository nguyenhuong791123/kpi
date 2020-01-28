const graphql = require("graphql");
const { GraphQLObjectType } = graphql;
const { addUserMutations } = require("./methods/user");

const RootMutationPromise = new Promise(async (resolve, reject) => {
  var fields = {};
  fields = await addUserMutations(fields);

  resolve(new GraphQLObjectType({ name: "RootMutationType", type: "Mutation", fields: fields }));
});

exports.mutationPromise = RootMutationPromise;