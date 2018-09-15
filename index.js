import express from "express";
import mongoose from "mongoose";
import "babel-polyfill";
import cors from "cors";
import bodyParser from "body-parser";
import schema from "./schema/schema";
import { ApolloServer } from "apollo-server-express";
import config from "./config/config";
// get config settings
const PORT = config.app.port;
const {
  db: { host, port, name }
} = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

// create express app
const app = express();

// set bodyparser and cors as middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set the graphql server to express app
const server = new ApolloServer({ schema });
server.applyMiddleware({ app });

//connect to database
mongoose.connect(
  connectionString,
  { useNewUrlParser: true },
  () => {
    console.log("Connected to Database <sharekard>");
  }
);

// listen on specified port
app.listen(PORT, () => {
  console.log("Listening on ", PORT);
});
