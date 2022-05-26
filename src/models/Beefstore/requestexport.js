import mongoose from "mongoose";

const RequestExportSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  quantity: {
    type: String,
  },
  requestdate: {
    type: Date,
  },
  beeftype: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beeftype",
  },
});

const RequestExport = mongoose.model("RequestExport", RequestExportSchema);
export default RequestExport;
