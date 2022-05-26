const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
require("mongoose-type-email");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  listings: [{ type: Schema.Types.ObjectId, ref: "Listing" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
