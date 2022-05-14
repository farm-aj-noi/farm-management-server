import mongoose from "mongoose";

const imchopSchema = new mongoose.Schema({
    
    importdate: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    chop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chop",
    },
    beeftype: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Beeftype",
    },
    barcode: {
        type: String,
    }, 
    
    
     

})
const Imchop = mongoose.model("Imchop", imchopSchema);

export default Imchop;