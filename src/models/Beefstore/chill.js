import mongoose from "mongoose";

const chillSchema = new mongoose.Schema({
    chilldate : {
        type : Date,
    },
    chillday: {
        type : String,
    },
    barcode: {
        type : String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    chillroom: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Chillroom",
    },
    halve: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Halve",
    },
    
})

const Chill = mongoose.model("Chill", chillSchema)
export default Chill;