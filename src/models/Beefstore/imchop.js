import mongoose from "mongoose";

const imchopSchema = new mongoose.Schema({
    
    importdate: {
        type: Date,
    },
    exportdate: {
        type: Date,
    },
    name: {
        type: String,
    },
    barcode: {
        type: String,
    },
    namefarmer: {
        type: String,
    },
    userName: {
        type: String,
    },
    beefroom: {
        type: String
    },
    shelf: {
        type: String
    },
    basket: {
        type: String
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
    storestatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
    },
    beeftypechange: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Beeftype",
    },
    
    
     

})
const Imchop = mongoose.model("Imchop", imchopSchema);

export default Imchop;