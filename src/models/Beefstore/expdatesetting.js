import mongoose from "mongoose";

const expdateSchema = new mongoose.Schema({
    totalday: {
        type: String,
    },

})
const ExpdateSetting = mongoose.model("ExpdateSetting", expdateSchema);
export default ExpdateSetting