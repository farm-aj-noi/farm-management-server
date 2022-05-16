import mongoose from "mongoose";

const imhalveSchema = new mongoose.Schema({
    
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
    
    chill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chill",
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
const Imhalve = mongoose.model("Imhalve", imhalveSchema);

export default Imhalve;