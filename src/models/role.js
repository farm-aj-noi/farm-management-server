import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  nameTH: {
    type: String,
    required: true
  },
  nameEN: {
    type: String,
    required: true
  }
});

const Role = mongoose.model("Role", roleSchema);

export default Role;
