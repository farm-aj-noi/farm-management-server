import mongoose from "mongoose";
import { autoIncrement } from "mongoose-plugin-autoinc";

const producttypeSchema = new mongoose.Schema({
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
});

producttypeSchema.plugin(autoIncrement, {
  model: "Producttype",
  field: "codecount",
  startAt: 1,
});

const Producttype = mongoose.model("Producttype", producttypeSchema);

export default Producttype;
