import mongoose from "mongoose";

const identitycounterSchema = new mongoose.Schema({
  groupingField: {
    type: String,
  },
  count: {
    type: Number,
  },
  model: {
    type: String,
  },
  field: {
    type: String,
  }
});

const Identitycounter = mongoose.model("Identitycounter", identitycounterSchema);

export default Identitycounter;
