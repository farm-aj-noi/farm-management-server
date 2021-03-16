import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
  dateResetCount: {
    type: Number,
    required: true,
  },
  dateResetCountH: {
    type: Number,
    required: true,
  },
  dateResetCountQ: {
    type: Number,
    required: true,
  },
  dateResetCountL: {
    type: Number,
    required: true,
  },
  dateResetCountC: {
    type: Number,
    required: true,
  },
  dateResetCountE: {
    type: Number,
    required: true,
  },
});

const Setting = mongoose.model("Setting", settingSchema);

export default Setting;
