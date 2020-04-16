const express = require("express");
const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost/employ-schema";
const routes = require("./routers/router");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 7800;

const connectOptions = {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
};
//Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, connectOptions, (err, db) => {
  if (err) console.log(`Error`, err);
  console.log(`Connected to MongoDB`);
});

require("./models/employSchema");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});
