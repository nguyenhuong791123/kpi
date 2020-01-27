"use strict";
const express = require("express");
const cors = require('cors')
const graphql = require("graphql");
const expressGraphQl = require("express-graphql");
const { GraphQLSchema } = graphql;

require("./schemas/fields/field").FieldsInit();
const { query } = require("./schemas/queries");
const { mutation } = require("./schemas/mutations");
const schema = new GraphQLSchema({ query, mutation });

var app = express();
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Access-Control-Allow-Headers, Content-Type, Authorization, Origin, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true)
    next();
});

app.use('/', expressGraphQl({ schema: schema, graphiql: true }));

app.listen(8085, () => console.log('GraphQL Server Running On 120.0.0.1:8085'));