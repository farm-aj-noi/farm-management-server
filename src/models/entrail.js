import mongoose from "mongoose";
import { autoIncrement } from "mongoose-plugin-autoinc";
// ซาก2

const entrailSchema = new mongoose.Schema({
  offal: {
    type: String,
    required: true,
  },
  toe: {
    type: String,
    required: true,
  },
  head: {
    type: String,
    required: true,
  },
  skin: {
    type: String,
    required: true,
  },
  liver: {
    type: String,
    required: true,
  },
  fat: {
    type: String,
    required: true,
  },
  onkale: {
    type: String,
    required: true,
  },
  tail: {
    type: String,
    required: true,
  },
  gallbladder: {
    type: String,
    required: true,
  },
  scrap: {
    type: String,
    required: true,
  },
  barcode: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  imslaughter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Imslaughter",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  transports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transport",
    },
  ],
});

entrailSchema.plugin(autoIncrement, {
  unique: false,
  model: "Entrail",
  field: "barcode",
  startAt: 0,
});

const Entrail = mongoose.model("Entrail", entrailSchema);

export default Entrail;
