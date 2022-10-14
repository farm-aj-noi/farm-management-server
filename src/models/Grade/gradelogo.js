import mongoose from "mongoose";

const GradeLogoSchema = new mongoose.Schema({
  logo: {
    type: String,
  },
  address: {
    type: String,
  }
});

const GradeLogo = mongoose.model("GradeLogo", GradeLogoSchema);
export default GradeLogo;