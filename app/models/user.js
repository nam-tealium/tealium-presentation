// load the things we need
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

// define the schema for our user model
const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
// const User =
module.exports = mongoose.model("User", userSchema);
