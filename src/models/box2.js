import mongoose from "mongoose";
import { autoIncrement } from "mongoose-plugin-autoinc";

const box2Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

box2Schema.plugin(autoIncrement, {
  unique: false,
  model: "Box2",
  field: "count",
  startAt: 1,
});

const Box = mongoose.model("Box2", box2Schema);

export default Box;
