import mongoose from "mongoose";

const GradingSchema = new mongoose.Schema({
  pic: {
    type: String,
  },
  pic1: {
    type: String,
  },
  userName: {
    type: String,
  },
  ExpertName1: {
    type: String,
  },
  ExpertName2: {
    type: String,
  },
  ExpertName3: {
    type: String,
  },
  ExpertName4: {
    type: String,
  },
  ExpertName5: {
    type: String,
  },
  ExpertGrade: {
    type: String,
  },
  SystemGrade: {
    type: String,
  },
  Halve: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Halve",
  },
});

const Grading = mongoose.model("Grading", GradingSchema);
export default Grading;
