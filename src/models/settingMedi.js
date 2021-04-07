import mongoose from "mongoose";

const settingMediSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  } ,
  dateStop: {
    type: Number,
    required: true,
  } ,
});

const SettingMedi = mongoose.model("SettingMedi", settingMediSchema);

export default SettingMedi;
