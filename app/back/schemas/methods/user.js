const db = require("../../utils/adaptor").DBConnection;
const { GraphQLList, GraphQLID, GraphQLString } = require("graphql");
const { UserTypePromise } = require("../types");

async function addUserQueries(fields) {
    const UserType = await UserTypePromise;
    fields['getUser'] = {
        type: UserType,
        args: { id: { type: GraphQLID } },
        resolve(parentValue, args) {
            const query = `SELECT * FROM user_info WHERE id=$1`;
            const values = [args.id];
            console.log(query);
            console.log(values);
            return db.one(query, values).then(res => res).catch(err => err);
        }
    }
    fields['getUsers'] = {
        type: new GraphQLList(UserType),
        resolve(parentValue) {
            const query = `SELECT * FROM user_info`;
            console.log(query);
            return db.any(query).then(res => res).catch(err => err);
        }
    }
    return fields;
}

async function addUserMutations(fields) {
    const UserType = await UserTypePromise;
    fields['addUser'] = {
        type: UserType
        ,args: { username: { type: GraphQLString }, email: { type: GraphQLString } }
        ,resolve(parentValue, args) {
            const query = `INSERT INTO user_info(username, email) VALUES ($1, $2) RETURNING id`;
            const values = [ args.username, args.email ];
            return db.one(query, values).then(res => res).catch(err => err);
        }
    }
    fields['updUser'] = {
        type: UserType
        ,args: { userid: { type: GraphQLID },username: { type: GraphQLString }, email: { type: GraphQLString } }
        ,resolve(parentValue, args) {
            const query = `UPDATE user_info SET username=$1, email=$2 WHERE id=$3 RETURNING id`;
            const values = [ args.username, args.email, args.userid ];
            return db.one(query, values).then(res => res).catch(err => err);
        }
    }
    fields['delUser'] = {
        type: UserType
        ,args: { userid: { type: GraphQLID } }
        ,resolve(parentValue, args) {
            const query = `DELETE FROM user_info WHERE id=$1 RETURNING id`;
            const values = [ args.userid ];
            return db.one(query, values).then(res => res).catch(err => err);
        }
    }
    return fields;
}

exports.addUserQueries = addUserQueries;
exports.addUserMutations = addUserMutations;
