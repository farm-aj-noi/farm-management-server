import mongoose from "mongoose";

const imentrailSchema = new mongoose.Schema({
    
    importdate: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    entrail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Entrail",
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
const Imentrail = mongoose.model("Imentrail", imentrailSchema);

export default Imentrail;