import mongoose from "mongoose";
// รับโคเข้าเชือด

const importcfarmSchema = new mongoose.Schema({
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
  imagecow:{type: String,},

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
  // group: {
  //   type: String,
  //   required: true,
  // },
  // district: {
  //   type: String,
  //   required: true,
  // },
  // province: {
  //   type: String,
  //   required: true,
  // },
  statusIm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Importcowfarm = mongoose.model("Importcowfarm", importcfarmSchema);

export default Importcowfarm;
