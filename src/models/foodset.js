import mongoose from "mongoose";

const footsetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  } ,
  CP: {
    type: Number,
    required: true,
  } ,
  TDN:{
      type: Number,
      required: true,
  },
  type: {
    type: String,
    required: true,
  } ,
});

const Foodset = mongoose.model("Foodset", footsetSchema);

export default Foodset;
