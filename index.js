import express from "express";
import mongoose from "mongoose";
import "babel-polyfill";

import bodyParser from "body-parser";
import schema from "./schema/schema";
import { ApolloServer } from "apollo-server-express";
// import {
//   ApolloServer
//   //   graphqlExpress,
//   //   graphiqlExpress
// } from "apollo-server-express";

//Models
import Visitors from "./models/VisitorModel";

const PORT = 8800;
const mongoURI = "mongodb://localhost:27017/sharekard";

const app = express();
//app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use(
//   "/graphiql",
//   graphiqlExpress({
//     endpointURL: "/graphql"
//   })
// );
// app.use("/graphql", bodyParser.json(), graphiqlExpress({}));
import {
  typeDefs,
  resolvers
} from "../server/schema/schemafiles/VisitorSchema";
//const server = new ApolloServer({ typeDefs, resolvers });
const server = new ApolloServer({ schema });
server.applyMiddleware({ app });
app.listen(PORT, () => {
  console.log("Listening on ", PORT);
});

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true },
  () => {
    console.log("Connected to Database <sharekard>");

    //insertRec();
  }
);

function insertRec() {
  var vis2 = new Visitors({
    fullName: "Hamrosh",
    mobileNumber: "9545845454"
  });

  vis2.save(function(err) {
    console.log("Visitor has been saved!");
    if (err) {
      console.error(err);
    }
  });
}
