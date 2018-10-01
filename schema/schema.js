import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mergeSchemas
} from "graphql-tools";
import { merge } from "lodash";

import {
  typeDefs as visitorDefs,
  resolvers as visitorResolvers
} from "./schemafiles/VisitorSchema";
import {
  typeDefs as vendorDefs,
  resolvers as vendorResolvers
} from "./schemafiles/VendorSchema";
import {
  typeDefs as organiserDefs,
  resolvers as organiserResolvers
} from "./schemafiles/OrganiserSchema";

import {
  typeDefs as eventDefs,
  resolvers as eventResolvers
} from "./schemafiles/EventSchema";

const typeDefs = [vendorDefs, visitorDefs, organiserDefs, eventDefs];
const resolvers = merge(
  visitorResolvers,
  vendorResolvers,
  organiserResolvers,
  eventResolvers
);
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
export default schema;
