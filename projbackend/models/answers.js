const Mongoose = require("mongoose"),
  Types = Mongoose.Schema.Types;

const answersSchema = new Mongoose.Schema({}, { strict: false });

module.exports = Mongoose.model("answercollections", answersSchema);
