import mongoose from "mongoose";

const GradingSchema = new mongoose.Schema({
  pic: {
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
});

const Grading = mongoose.model("Grading", GradingSchema);
export default Grading;
