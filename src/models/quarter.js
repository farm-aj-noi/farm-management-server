import mongoose from "mongoose";
import { autoIncrement } from "mongoose-plugin-autoinc";
// ซาก2

const quarterSchema = new mongoose.Schema({
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
  halve: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Halve",
  },
  lumps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lump",
    },
  ],
  transports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transport",
    },
  ],
});

quarterSchema.plugin(autoIncrement, {
  unique: false,
  model: "Quarter",
  field: "barcode",
  startAt: 0,
});

const Quarter = mongoose.model("Quarter", quarterSchema);

export default Quarter;
