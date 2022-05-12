import mongoose from "mongoose";

const BeefStoreSchema = new mongoose.Schema({
      imhalves:[ 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Imhalve",
        }
    ],
      imquarters: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Imquarter",
        }
    ],
      
      
})

const BeefStore = mongoose.model("BeefStore", BeefStoreSchema);

export default BeefStore;