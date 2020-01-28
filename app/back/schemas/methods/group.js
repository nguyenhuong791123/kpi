const db = require("../../utils/adaptor").DBConnection;
const { GraphQLList, GraphQLID } = require("graphql");
const { GroupTypePromise } = require("../types");

async function addGroupQueries(fields) {
    const GroupType = await GroupTypePromise;
    fields['getGroup'] = {
      type: GroupType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM group_info WHERE id=$1`;
        const values = [args.id];
        console.log(query);
        console.log(values);
        return db.one(query, values).then(res => res).catch(err => err);
      }
    }
    fields['getGroups'] = {
      type: new GraphQLList(GroupType),
      resolve(parentValue) {
        const query = `SELECT * FROM group_info`;
        console.log(query);
        return db.any(query).then(res => res).catch(err => err);
      }
    }
    return fields;
}

exports.addGroupQueries = addGroupQueries;
