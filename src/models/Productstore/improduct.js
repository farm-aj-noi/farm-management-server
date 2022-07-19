import mongoose from "mongoose";

const improductSchema = new mongoose.Schema({
  barcode: {
    type: String,
  },
  name: {
    type: String,
  },
  importdate: {
    type: Date,
  },
  exportdate: {
    type: Date,
  },
  Expdate: {
    type: Date,
  },
  pbasket: {
    type: String,
  },
  exporter: {
    type: String,
  },
  info: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  storestatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },
  beefproduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beefproduct",
  },
  producttype: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producttype",
  },
  productroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Productroom",
  },
  freezer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Freezer",
  },
  
});
const Improduct = mongoose.model("Improduct", improductSchema);
export default Improduct;
