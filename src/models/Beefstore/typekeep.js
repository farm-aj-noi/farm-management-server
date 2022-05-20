import mongoose from "mongoose";

const  TypekeepSchema = new mongoose.Schema({
    totalbeef: {
        type: String,
    },
    beefroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Beefroom",
    },
    beeftype: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Beeftype",
    },
    shelf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shelf",
    },
    
    
    

})
const Typekeep = mongoose.model("Typekeep", TypekeepSchema)

export default Typekeep