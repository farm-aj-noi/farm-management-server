import mongoose from "mongoose";

const RequestProductSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  typemeat: {
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

const RequestProduct = mongoose.model("RequestProduct", RequestProductSchema);
export default RequestProduct;
