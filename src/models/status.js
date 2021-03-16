import mongoose from "mongoose";
// สถานะ

const statusSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  nameTH: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // imslaughterIm: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Imslaughter",
  //   },
  // ],
  // imslaughterCa: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Imslaughter",
  //   },
  // ],
  // imslaughterEn: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Imslaughter",
  //   },
  // ]
});

const Status = mongoose.model("Status", statusSchema);

export default Status;
