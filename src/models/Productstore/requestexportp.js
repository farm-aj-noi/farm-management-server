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
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },
  producttype: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producttype",
  },
});

const RequestExportP = mongoose.model("RequestExportP", RequestExportSchema);
export default RequestExportP;
