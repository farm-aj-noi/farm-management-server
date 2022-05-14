import mongoose from "mongoose";

const BeefroomSchema = new mongoose.Schema({
    roomnum: {
        type : String,
    },
    totalshelf: {
        type : String,
    },
    totalbucket: {
        type : String,
    }

})
const Beefroom = mongoose.model("Beefroom", BeefroomSchema);

export default Beefroom;