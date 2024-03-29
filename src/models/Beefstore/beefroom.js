import mongoose from "mongoose";

const BeefroomSchema = new mongoose.Schema({
  roomname: {
    type: String,
  },
  roomstatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },
  typekeep: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Typekeep",
    },
  ],
  shelf: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shelf",
    },
  ],
  basket: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Basket",
    },
  ],
  halve: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Halve",
    },
  ],
  quarter: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quarter",
    },
  ],
  lump: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lump",
    },
  ],
  chop: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chop",
    },
  ],
  entrail: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entrail",
    },
  ],
});
const Beefroom = mongoose.model("Beefroom", BeefroomSchema);

export default Beefroom;
