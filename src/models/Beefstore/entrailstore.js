import mongoose from "mongoose";

const EntrailStoreSchema = new mongoose.Schema({
  imentrails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Imentrail",
    },
  ],
});

const EntrailStore = mongoose.model("EntrailStore", EntrailStoreSchema);

export default EntrailStore;
