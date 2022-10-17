"use strict";

const express = require("express");
const path = require("path");
const routes = require("./routes/v1");

const app = express();

// parse json req body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// View enginge
app.set("view engine", "ejs");

// views path
app.set("views", path.join(__dirname, "/views"));

// v1 Api
app.use("/v1", routes);
// app.use("/node/express/v1", routes);

module.exports = app;
