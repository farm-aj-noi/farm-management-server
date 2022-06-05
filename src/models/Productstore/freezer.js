import mongoose from "mongoose";

const freezerSchema = new mongoose.Schema({
  freezername: {
    type: String,
  },
  productroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Productroom",
  },
  typekeep2: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Typekeep2",
    },
  ],
  beefproduct: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beefproduct",
    },
  ],
  pbasket: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pbasket",
    },
  ],
});
const Freezer = mongoose.model("Freezer", freezerSchema);
export default Freezer;
