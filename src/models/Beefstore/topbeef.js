import mongoose from "mongoose";

const topbeef = new mongoose.Schema({
    halve: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Imhalve",
        },
      ],
      quarter: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Imquarter",
        },
      ],
      lump: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Imlump",
        },
      ],
      chop: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Imchop",
        },
      ],
})

const Topbeef = mongoose.model("topBeefdata", topbeef)
export default Topbeef