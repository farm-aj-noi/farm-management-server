import mongoose from "mongoose";

const ShelfSchema = new mongoose.Schema({
    shelfname: {
        type: String,
    },
    typekeep: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Typekeep",
    }],


})
const Shelf = mongoose.model("Shelf", ShelfSchema);
export default Shelf;