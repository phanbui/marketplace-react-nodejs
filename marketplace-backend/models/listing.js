const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new mongoose.Schema({
  filename: String,
  url: String,
});

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  seller: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  images: [imageSchema],

  description: String,
  condition: {
    type: String,
    enum: ["Open Box", "Used-Like New", "Used-Good", "Used-Fair"],
    default: "Used-Fair",
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
