// 'use strict';

// require("dotenv").config();

// const BodyParser = require("body-parser");
// const express = require("express");
// const fs = require("fs");
// const http = require("http")

// const animal = require("./animal")

// const PORT = process.env.SERVER_PORT || 5000;
// const HOST = process.env.SERVER_HOST;
// const PATH = [
//   {
//     path: "/animal",
//     router: animal.router,
//   },
// ];

// const app = express();

// app.use(BodyParser.urlencoded({
//   extended: true
// }));

// app.get("/", (req, res) => { res.send("WildLife 3D API")});
// /**
//  * @type {{ path: string, router: express.Router}}
//  */
// let path;
// for (path of PATH) {
//   app.use(path.path, path.router);
// }

// http.createServer(app).listen(PORT, () => console.log(`Server listen on ${PORT}`));

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const animal = require("./animal.js");
const http = require("http");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(cors());
app.use("/animal", animal.router);
app.get("/", (req, res) => {
  res.send("WildLife API");
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
