'use strict';

require("dotenv").config();

const BodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const http = require("http")

const animal = require("./animal")

const PORT = process.env.SERVER_PORT;
const HOST = process.env.SERVER_HOST;
const PATH = [
  {
    path: "/animal",
    router: animal.router,
  },
];

const app = express();

app.use(BodyParser.urlencoded({
  extended: true
}));

/**
 * @type {{ path: string, router: express.Router}}
 */
let path;
for (path of PATH) {
  app.use(path.path, path.router);
}

http.createServer(app).listen(PORT, HOST);
console.log(`Server listen on "${HOST}:${PORT}"`)


// todo heroku
// todo binary