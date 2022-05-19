import mongoose from "mongoose";

const RequestExportSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    beef : {
        type: String,
    },
    quantity : {
        type: String,
    },
    requestdate : {
        type: Date,
    }
})

const RequestExport = mongoose.model("RequestExport", RequestExportSchema);
export default RequestExport