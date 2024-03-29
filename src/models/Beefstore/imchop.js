import mongoose from "mongoose";

const imchopSchema = new mongoose.Schema({
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
  basket: {
    type: String,
  },
  Expdate: {
    type: Date,
  },
  exporter: {
    type: String,
  },
  info: {
    type: String,
  },
  beefroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beefroom",
  },
  shelf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shelf",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  chop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chop",
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
const Imchop = mongoose.model("Imchop", imchopSchema);

export default Imchop;
