import mongoose from "mongoose";

const imquarterSchema = new mongoose.Schema({
    
    importdate: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    quarter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quarter",
    },
    beeftype: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Beeftype",
    },
    
    barcode: {
        type: String,
    },     


})
const Imquarter = mongoose.model("Imquarter", imquarterSchema);

export default Imquarter;