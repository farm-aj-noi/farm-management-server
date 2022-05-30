import mongoose from "mongoose";

const totalSchema = new mongoose.Schema({
    totalday: {
        type: String
    },
});

const TotalExpdate = mongoose.model("TotalExpdate", totalSchema);

export default TotalExpdate;
