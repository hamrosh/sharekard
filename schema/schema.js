import { makeExecutableSchema } from "graphql-tools";

import { typeDefs, resolvers } from "./schemafiles/VisitorSchema";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
module.exports = schema;
