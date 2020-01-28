const { GraphQLObjectType } = require("graphql");
const { getFields } = require("./fields/field");

const UserTypePromise = new Promise(async (resolve, reject) => {
    const fields = await getFields('public', 'user_info');
    resolve(new GraphQLObjectType({ name: "User" ,type: "Query" ,fields: fields }));
});
const GroupTypePromise = new Promise(async (resolve, reject) => {
    const fields = await getFields('public', 'group_info');
    resolve(new GraphQLObjectType({ name: "Group" ,type: "Query" ,fields: fields }));
});

exports.UserTypePromise = UserTypePromise;
exports.GroupTypePromise = GroupTypePromise;
