import mongoose from "mongoose";

const chillSchema = new mongoose.Schema({
    chilldateStart : {
        type : Date,
    },
    chilldateEnd : {
        type : Date,
    },
    barcode: {
        type : String,
    },
    chillday: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chillday",
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
    chillstatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
    },
    beeftype: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Beeftype",
    }
    
})

const Chill = mongoose.model("Chill", chillSchema)
export default Chill;