import mongoose from "mongoose";

const imlumpSchema = new mongoose.Schema({
    
    importdate: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    lump: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lump",
    },
    beeftype: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Beeftype",
    },
    barcode: {
        type: String,
    },
    storestatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
    },
    beeftypechange: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Beeftype",
    },
    
    
     

})
const Imlump = mongoose.model("Imlump", imlumpSchema);

export default Imlump;