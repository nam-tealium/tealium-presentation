"use strict";
const normalizePort = require("normalize-port");

exports.DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://localhost:27017/tealium-presentation";
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL ||
  "mongodb://localhost/test-tealium-presentation";

exports.PORT = process.env.PORT || 8080;
