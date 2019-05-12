"use strict";

exports.DATABASE_URL =
  process.env.DATABASE_URL ||
  "mongodb+srv://zero-admin:WutangClan@cluster0-pfvwv.mongodb.net/tealium-presentation?retryWrites=true";
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL ||
  "mongodb+srv://zero-admin:WutangClan@cluster0-pfvwv.mongodb.net/test-tealium-presentation?retryWrites=true";

exports.PORT = process.env.PORT || 8080;
