import mongoose from "mongoose";

const basketSchema = new mongoose.Schema({
    basketname: {
        type : String
    },
    shelf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shelf",
    },
    beefroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Beefroom",
    },
})

const Basket = mongoose.model("Basket", basketSchema)
export default Basket;