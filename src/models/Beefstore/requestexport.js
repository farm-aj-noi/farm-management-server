import mongoose from "mongoose";

const RequestExportSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  grade: {
    type: String,
  },
  requestdate: {
    type: Date,
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },
  beeftype: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beeftype",
  },
});

const RequestExport = mongoose.model("RequestExport", RequestExportSchema);
export default RequestExport;
