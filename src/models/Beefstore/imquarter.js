import mongoose from "mongoose";

const imquarterSchema = new mongoose.Schema({
  importdate: {
    type: Date,
  },
  exportdate: {
    type: Date,
  },
  name: {
    type: String,
  },
  barcode: {
    type: String,
  },
  namefarmer: {
    type: String,
  },
  userName: {
    type: String,
  },
  Expdate: {
    type: Date,
  },
  exporter: {
    type: String,
  },
  beefroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beefroom",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  quarter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quarter",
  },
  beeftype: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beeftype",
  },
  storestatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },
});
const Imquarter = mongoose.model("Imquarter", imquarterSchema);

export default Imquarter;
