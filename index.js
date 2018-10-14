import express from "express";
import mongoose from "mongoose";
import "babel-polyfill";
import cors from "cors";
import bodyParser from "body-parser";
import schema from "./schema/schema";
import { ApolloServer } from "apollo-server-express";
import config from "./config/config";
import multer from "multer";
import path from "path";
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

app.use("/public", express.static("public"));

// Starting the server on Port , usee the ENV.PORT varialble Later

app.use(express.static(`${__dirname}/build`));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

//uploading profile pics etc ...
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "js")));
var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./public");
  },
  filename: function(req, file, callback) {
    console.log(file);
    callback(null, req.body.id + "_" + file.originalname);
  }
});

var upload = multer({
  storage: Storage
  // fileFilter: function(req, file, cb) {
  //   CheckFileTypes(file, cb);
  // }
}).single("image");
function CheckFileTypes(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif|bmp/;
  const extName = fileTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimeType = filetypes.test(file.mimeType);
  if (mimeType && extname) {
    return cb(null, true);
  } else {
    return cb("Error: Select Images Only!");
  }
}
app.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err) return res.end("Something went wrong!");
    // console.log("testing post body...", req.body);
    // console.log("testing post file...", req.files);

    res.end("File uploaded successfully!");
  });
});

// listen on specified port
app.listen(PORT, () => {
  console.log("Listening on ", PORT);
});
