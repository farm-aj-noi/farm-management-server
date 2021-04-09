import mongoose from "mongoose";
// ซาก2

const feedSchema = new mongoose.Schema({
  datestart: {
    type: Date,
  },
  dateend: {
    type: Date,
  },
  typefood: {
    type: String,
  },
  namefood: {
    type: String,
  },
  namecop: {
    type: String,
  },
  cp: {
    type: Number,
  },
  tdn: {
    type: Number,
  },
  quantity: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
  },
  imslaughter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Imslaughter",
  },
});

const Feed = mongoose.model("Feed", feedSchema);

export default Feed;
