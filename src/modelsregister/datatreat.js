import mongoose from "mongoose";
// รับโคเข้าขุน

const dataTreat = new mongoose.Schema({
//     date: {
//     type: Date,
//     required: true,
//   },
  weight: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
//   medi: {
//     type: String,
//     required: true,
//   },
//   nofity: {
//     type: String,
//     required: true,
//   },
//   dise: {
//     type: String,
//     required: true,
//   },
//   detail_dise: {
//     type: String,
//     required: true,
//   },
datacow: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Cow'
  },
//   staffer: [{
//       type:Schema.Types.ObjectId,
//       ref: 'staff'
//   }]
});

const Treatcow = mongoose.model("Treatcow", dataTreat);

export default Treatcow;
