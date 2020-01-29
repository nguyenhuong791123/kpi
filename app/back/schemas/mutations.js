const graphql = require("graphql");
const { GraphQLObjectType } = graphql;
const { GetMethodMutations } = require("./method");

const RootMutationPromise = new Promise(async (resolve, reject) => {
  const fields = await GetMethodMutations();
  resolve(new GraphQLObjectType({ name: "RootMutationType", type: "Mutation", fields: fields }));
});

exports.mutationPromise = RootMutationPromise;