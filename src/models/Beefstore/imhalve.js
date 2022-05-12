import mongoose from "mongoose";

const imhalveSchema = new mongoose.Schema({
    
    importdate: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    halve: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Halve",
    },
    beeftype: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Beeftype",
    },
    barcode: {
        type: String,
    }, 
      


})
const Imhalve = mongoose.model("Imhalve", imhalveSchema);

export default Imhalve;