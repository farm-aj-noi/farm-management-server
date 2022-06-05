import mongoose from "mongoose";

const pbasketSchema = new mongoose.Schema({
  basketname: {
    type: String,
  },
  freezer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Freezer",
  },
  productroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Productroom",
  },
});
const Pbasket = mongoose.model("Pbasket", pbasketSchema);
export default Pbasket;
