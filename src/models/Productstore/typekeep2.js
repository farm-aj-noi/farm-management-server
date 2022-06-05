import mongoose from "mongoose";

const Typekeep2Schema = new mongoose.Schema({
  totalproduct: {
    type: String,
  },
  producttype: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producttype",
  },
  freezer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Freezer",
  },
});
const Typekeep2 = mongoose.model("Typekeep2", Typekeep2Schema);

export default Typekeep2;
