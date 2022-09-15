import mongoose from "mongoose";

const reportSetSchema = new mongoose.Schema({
    logo: {
      type: String,
    },
    address: {
      type: String,
    },

  });
  
  const ReportSet = mongoose.model("Reportset", reportSetSchema);
  export default ReportSet;