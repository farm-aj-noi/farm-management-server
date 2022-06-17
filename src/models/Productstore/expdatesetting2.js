import mongoose from "mongoose";

const expdate2Schema = new mongoose.Schema({
  day: {
    type: Number,
  },
});
const ExpdateSetting2 = mongoose.model("ExpdateSetting2", expdate2Schema);
export default ExpdateSetting2;
