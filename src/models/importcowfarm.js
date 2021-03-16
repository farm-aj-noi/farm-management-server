import mongoose from "mongoose";
// รับโคเข้าเชือด

const imslaughterSchema = new mongoose.Schema({
  pun: {
    type: String,
    required: true,
  },
  numfarmer: {
    type: String,
    required: true,
  },
  passport: {
    type: String,
  },
  teeth: {
    type: String,
  },

  bodyscore: {
    type: String,
  },
  namefarmer: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    // required: true,
  },
  datebirhtday: {
    type: Date,
    // required: true,
  },
  namecow: {
    type: String,
    // required: true,
  },
  sex: {
    type: String,
    // required: true,
  },
  weightstart: {
    type: Number,
    // required: true,
  },
  weightbirht: {
    type: Number,
    // required: true,
  },
  group: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },


  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Imslaughter = mongoose.model("Imslaughter", imslaughterSchema);

export default Imslaughter;
