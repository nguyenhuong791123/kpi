"use strict";
const express = require("express");
const cors = require('cors')
const graphql = require("graphql");
const expressGraphQl = require("express-graphql");
const { GraphQLSchema } = graphql;
const APP_PORT = 8085;

(async () => {
    const { queryPromise } = require("./schemas/queries");
    const query = await queryPromise;
    const { mutationPromise } = require("./schemas/mutations");
    const mutation = await mutationPromise;
    const schema = new GraphQLSchema({ query, mutation });

    var app = express();
    app.use(cors());
    app.use(function (req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE");
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Access-Control-Allow-Headers, Content-Type, Authorization, Origin, Accept");
        res.setHeader('Access-Control-Allow-Credentials', true)
        next();
    });

    app.use('/graphql', expressGraphQl({ schema: schema, graphiql: true }));
    app.listen(APP_PORT, console.log('GraphQL Server Running On 120.0.0.1:' + APP_PORT));
})();
