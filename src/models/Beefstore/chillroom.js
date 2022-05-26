import mongoose from "mongoose";

const chillroomSchema = new mongoose.Schema({
  roomnum: {
    type: String,
  },
});

const Chillroom = mongoose.model("Chillroom", chillroomSchema);
export default Chillroom;
