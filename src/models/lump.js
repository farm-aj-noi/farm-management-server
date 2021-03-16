import mongoose from "mongoose";
import { autoIncrement } from "mongoose-plugin-autoinc";
// ซาก2

const lumpSchema = new mongoose.Schema({
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
  sendAt: {
    type: Date,
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
  quarter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quarter",
  },
  chops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chop",
    },
  ],
  transports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transport",
    },
  ],
});

lumpSchema.plugin(autoIncrement, {
  unique: false,
  model: "Lump",
  field: "barcode",
  startAt: 0,
});

const Lump = mongoose.model("Lump", lumpSchema);

export default Lump;
