const { Schema, model } = require("mongoose");

const gbandb = new Schema({
  user: { type: String },
  moderator: { type: String },
  reason: { type: String },
});

module.exports = model("gbandb", gbandb);