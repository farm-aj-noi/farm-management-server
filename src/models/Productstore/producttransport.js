import mongoose from "mongoose";

const transportSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  name: {
    type: String,
  },
  place: {
    type: String,
  },
  note: {
    type: String,
  },
  beefproduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beefproduct",
  },
});

const ProductTransport = mongoose.model("ProductTransport", transportSchema);
export default ProductTransport;
