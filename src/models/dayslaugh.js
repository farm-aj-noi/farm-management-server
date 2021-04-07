import mongoose from "mongoose";

const dayslaughSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  } ,
  month: {
    type: Number,
    required: true,
  } ,
  weight:{
      type: Number,
      required: true,
  }
});

const Dayslaugh = mongoose.model("Dayslaugh", dayslaughSchema);

export default Dayslaugh;
