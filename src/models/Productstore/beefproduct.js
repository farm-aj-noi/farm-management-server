import mongoose from "mongoose";
import { autoIncrement } from "mongoose-plugin-autoinc";

const beefproductSchema = new mongoose.Schema({
  weight: {
    type: String,
  },
  barcode: {
    type: String,
  },
  MFG: {
    type: Date,
  },
  BBE: {
    type: Date,
  },
  producttype: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producttype",
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },
  chop: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chop",
  }],
  lump: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lump",
  }],
  producttransport: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductTransport",
  }],
});

beefproductSchema.plugin(autoIncrement, {
  unique: false,
  model: "Beefproduct",
  field: "barcode",
  startAt: 0,
});

const Beefproduct = mongoose.model("Beefproduct", beefproductSchema);

export default Beefproduct;
