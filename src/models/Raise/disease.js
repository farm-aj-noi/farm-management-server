import mongoose from "mongoose";
// ซาก2

const diseaseSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  detail: {
    type: String,
  },
});

const Disease = mongoose.model("Disease", diseaseSchema);

export default Disease;
