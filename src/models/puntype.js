import mongoose from "mongoose";

const punSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  numpun: {
    type: String,
    required: true
  }
});

const PunType = mongoose.model("PunType", punSchema);

export default PunType;
