const express = require("express");
const path = require("path");
const routes = require("./routes/v1");

const app = express();

// Settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Top Middlewares

// v1 Api
app.use("/v1", routes);

module.exports = app;
sss;
