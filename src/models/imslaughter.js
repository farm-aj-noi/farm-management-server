import mongoose from "mongoose";
// รับโคเข้าเชือด

const imslaughterSchema = new mongoose.Schema({
  numcow: {
    type: String,
    required: true,
  },
  numkun: {
    type: String,
    required: true,
  },
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
  rfid: {
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
  // งานจริงๆ
  weight: {
    type: Number,
  },
  imagecow: {
    type: String,
  },
  price: {
    type: Number,
  },
  grade: {
    type: String,
  },
  statuscow:{
    type: String,
  },
  fees: {
    type: Number,
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
  importDate: {
    type: Date,
  },
  importDateDead: {
    type: Date,
  },
  notedead: {
    type: String,
  },
  importslaughterDate: {
    type: Date,
  },
  statusIm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },
  statusCa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },
  statusEn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  halves: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Halve",
    },
  ],
  quarters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quarter",
    },
  ],
  lumps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lump",
    },
  ],
  chops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chop",
    },
  ],
  entrails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entrail",
  },
  feeds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feed",
    },
  ],
  treats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Treat",
    },
  ],
});

const Imslaughter = mongoose.model("Imslaughter", imslaughterSchema);

export default Imslaughter;
