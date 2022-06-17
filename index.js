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
