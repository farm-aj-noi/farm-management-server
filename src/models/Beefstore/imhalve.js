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
  almostExpdate: {
    type: Date,
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
  chill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chill",
  },
  storestatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },

  //idห้อง
});
const Imhalve = mongoose.model("Imhalve", imhalveSchema);

export default Imhalve;
