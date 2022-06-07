import mongoose from "mongoose";
import { autoIncrement } from "mongoose-plugin-autoinc";
// ซาก2

const chopSchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
  },
  barcode: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  MFG: {
    type: Date,
  },
  BBE: {
    type: Date,
  },
  Productstatus: {
    type: String,
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },
  imslaughter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Imslaughter",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  beeftype: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beeftype",
  },
  lump: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lump",
  },
  transports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transport",
    },
  ],
});

chopSchema.plugin(autoIncrement, {
  unique: false,
  model: "Chop",
  field: "barcode",
  startAt: 0,
});

const Chop = mongoose.model("Chop", chopSchema);

export default Chop;
