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
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Unit"
  },
  
});


const Producttype = mongoose.model("Producttype", producttypeSchema);

export default Producttype;
