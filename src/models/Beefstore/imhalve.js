import mongoose from "mongoose";

const imhalveSchema = new mongoose.Schema({
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
  exporter: {
    type: String,
  },
  Expdate: {
    type: Date,
  },
  chillroom: {
    type: String,
  },
  info: {
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
  halve: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Halve",
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
const Imhalve = mongoose.model("Imhalve", imhalveSchema);

export default Imhalve;
