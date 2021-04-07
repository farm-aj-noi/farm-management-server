import mongoose from "mongoose";
// ซาก2

const treatSchema = new mongoose.Schema({
  datet: {
    type: Date,
  },
  dise: {
    type: String,
  },
  symptom: {
    type: String,
  },
  medi: {
    type: String,
  },
  nofity: {
    type: Number,
  },
  quantity: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
  },
  importDate: {
    type: Date,
  },
  notedead: {
    type: String,
  },
  imslaughter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Imslaughter",
  },
});

const Treat = mongoose.model("Treat", treatSchema);

export default Treat;
