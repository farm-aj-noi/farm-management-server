import mongoose from "mongoose";
import { autoIncrement } from "mongoose-plugin-autoinc";
// รหัสเนื้อ

const beeftypeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  nameTH: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  BBE: {
    type: Number,
  },
  codecount: {
    type: Number,
    unique: false,
    sparse: false,
  },
  priceG2h: {
    type: Number,
  },
  priceG3: {
    type: Number,
  },
  priceG3h: {
    type: Number,
  },
  priceG4: {
    type: Number,
  },
  priceG4h: {
    type: Number,
  },
  priceG5: {
    type: Number,
  },
});

beeftypeSchema.plugin(autoIncrement, {
  model: "Beeftype",
  field: "codecount",
  startAt: 1,
});

const Beeftype = mongoose.model("Beeftype", beeftypeSchema);

export default Beeftype;
