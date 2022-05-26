import mongoose from "mongoose";

const chilldaySchema = new mongoose.Schema({
  day: {
    type: String,
  },
});

const Chillday = mongoose.model("Chillday", chilldaySchema);
export default Chillday;
