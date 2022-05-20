import mongoose from "mongoose";

const BeefroomSchema = new mongoose.Schema({
    roomname: {
        type: String,
    },
    typekeep: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Typekeep",
    }],
    roomstatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
    }
})
const Beefroom = mongoose.model("Beefroom", BeefroomSchema);

export default Beefroom;