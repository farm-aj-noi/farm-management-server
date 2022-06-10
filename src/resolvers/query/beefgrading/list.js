import Halve from "../../../models/halve";
import Imslaughter from "../../../models/imslaughter";
const Query = {
    listhalvegrade: async (parent, args, context, info) => {
        const cursor = Halve.find({
           /*  name: "นำออก", */
        })
        .populate({
            path: "beeftype"
        })
        .populate({
            path: "chill",
            populate: { path: "chillroom" }
        })
        .populate({
            path: "imslaughter"
        })
        return cursor
    },



}

export default Query;