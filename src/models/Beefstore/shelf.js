import mongoose from "mongoose";

const ShelfSchema = new mongoose.Schema({
    shelfname: {
        type: String,
    },
    typekeep: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Typekeep",
    }],
    beefroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Beefroom",
    },
    lump: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lump",
        }
      ],
    chop: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chop",
        }
    ],
    basket: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Basket",
        }
    ],


})
const Shelf = mongoose.model("Shelf", ShelfSchema);
export default Shelf;