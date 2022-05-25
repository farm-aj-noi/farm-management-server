import mongoose from "mongoose";

const basketSchema = new mongoose.Schema({
    basketname: {
        type : String
    },
})

const Basket = mongoose.model("Basket", basketSchema)
export default Basket;