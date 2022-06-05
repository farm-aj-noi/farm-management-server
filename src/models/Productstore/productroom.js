import mongoose from "mongoose";

const productroomSchema = new mongoose.Schema({
  roomname: {
    type: String,
  },
  freezer: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Freezer",
    },
  ],
  pbasket: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pbasket",
    },
  ],
  beefproduct: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beefproduct",
    },
  ],
});
const Productroom = mongoose.model("Productroom", productroomSchema);
export default Productroom;
