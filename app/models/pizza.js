const mongoose = require("mongoose");

const pizzaSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  order: {
    type: Number,
    default: 1
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

pizzaSchema.pre("find", function(next) {
  this.populate("user");
  next();
});

pizzaSchema.pre("findOne", function(next) {
  this.populate("user");
  next();
});

module.exports = mongoose.model("Pizza", pizzaSchema);
