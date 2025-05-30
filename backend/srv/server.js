const cds = require("@sap/cds");
const cors = require("cors");
const express = require("express");
const path = require("path");

cds.on("bootstrap", (app) => {
  app.use(cors()); // Enable CORS for all requests
  app.use("/labels", express.static(path.join(__dirname, "labels")));
});

module.exports = cds.server;
