import mongoose from "mongoose";

const imentrailSchema = new mongoose.Schema({
    
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
    entrail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Entrail",
    },
    storestatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
    },
    
    
     

})
const Imentrail = mongoose.model("Imentrail", imentrailSchema);

export default Imentrail;