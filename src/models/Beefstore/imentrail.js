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
    namefarmer: {
        type: String,
    },
    userName: {
        type: String,
    },
    beefroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Beefroom",
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
    exporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RequestExport",
    },
    
    
     

})
const Imentrail = mongoose.model("Imentrail", imentrailSchema);

export default Imentrail;