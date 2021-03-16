import mongoose from "mongoose";
// รับโคเข้าขุน

const dataCow = new mongoose.Schema({
  numcow: {
    type: String,
    required: true,
  },
  numkun: {
    type: String,
    required: true,
  },
  // pun: {
  //   type: String,
  //   required: true,
  // },
  // numfarmer: {
  //   type: String,
  //   required: true,
  // },
  // passport: {
  //   type: String,
  // },
  // teeth: {
  //   type: String,
  // },
  // rfid: {
  //   type: String,
  // },
  // bodyscore: {
  //   type: String,
  // },
  // namefarmer: {
  //   type: String,
  //   required: true,
  // },
  // date: {
  //   type: Date,
  //   // required: true,
  // },
  // datebirhtday: {
  //   type: Date,
  //   // required: true,
  // },
  // namecow: {
  //   type: String,
  //   // required: true,
  // },
  // sex: {
  //   type: String,
  //   // required: true,
  // },
  // weightstart: {
  //   type: Number,
  //   // required: true,
  // },
  // weightbirht: {
  //   type: Number,
  //   // required: true,
  // },
  // // งานจริงๆ
  // weight: {
  //   type: Number,
  // },
  // price: {
  //   type: Number,
  // },
  // grade: {
  //   type: String,
  // },
  // fees: {
  //   type: Number,
  // },
  // importDate: {
  //   type: Date,
  // },
  // importslaughterDate: {
  //   type: Date,
  // },


  // feeds: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Feed",
  //   },
  // ],
  datatreats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Treatcow",
    },
  ],
});

const Cow = mongoose.model("Cow", dataCow);

export default Cow;
