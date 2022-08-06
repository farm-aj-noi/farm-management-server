import mongoose from "mongoose";
// ซาก2

const transportSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  name: {
    type: String,
  },
  place: {
    type: String,
  },
  note: {
    type: String,
  },
  chop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chop",
  },
  lump: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lump",
  },
  quarter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quarter",
  },
  halve: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Halve",
  },
  entrail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entrail",
  },
});

const Transport = mongoose.model("Transport", transportSchema);

export default Transport;
