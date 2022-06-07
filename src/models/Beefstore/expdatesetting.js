import mongoose from "mongoose";

const expdateSchema = new mongoose.Schema({
  dayH: {
    type: Number,
  },
  dayQ: {
    type: Number,
  },
  dayL: {
    type: Number,
  },
  dayC: {
    type: Number,
  },
  dayE: {
    type: Number,
  },
});
const ExpdateSetting = mongoose.model("ExpdateSetting", expdateSchema);
export default ExpdateSetting;
