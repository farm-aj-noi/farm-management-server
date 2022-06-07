import mongoose from "mongoose";

const totalSchema = new mongoose.Schema({
    dayH: {
        type: Number,
    },
    dayQ: {
        type: Number,
    },
    dayL: {
        type: Number,
    },
    dayC: {
        type: Number,
    },
    dayE: {
        type: Number,
    },
});

const TotalExpdate = mongoose.model("TotalExpdate", totalSchema);

export default TotalExpdate;
