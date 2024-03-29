import mongoose from "mongoose";
import { autoIncrement } from "mongoose-plugin-autoinc";
// ซาก2

const drugSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  nofity: {
    type: Number,
  },
  dateStop: {
    type: Number,
    required: true,
  } ,
});

const Drug = mongoose.model("Drug", drugSchema);

export default Drug;
