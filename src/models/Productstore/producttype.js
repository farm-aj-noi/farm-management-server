import mongoose from "mongoose";

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

const Producttype = mongoose.model("Producttype", producttypeSchema);

export default Producttype;
