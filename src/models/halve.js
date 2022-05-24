import mongoose from "mongoose";
import { autoIncrement } from "mongoose-plugin-autoinc";
// ซาก2

const halveSchema = new mongoose.Schema({
  weightwarm: {
    type: Number,
    required: true,
  },
  weightcool: {
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
  quarters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quarter",
    },
  ],
  transports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transport",
    },
  ],
  chill: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chill",
  }],
});

halveSchema.plugin(autoIncrement, {
  unique: false,
  model: "Halve",
  field: "barcode",
  startAt: 0,
});

const Halve = mongoose.model("Halve", halveSchema);

export default Halve;
