import Halve from "../../../models/halve";
import Imslaughter from "../../../models/imslaughter";

const Query = {
    listhalvegrade: async (parent, args, context, info) => {
        const cursor =  Halve.find({
            chillstatus: "6284ad91fbfac22364a6e431"
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
    Cowgrade: async (parent, args, context, info) => {
        const cursor = Halve.find({
            _id: args.id,
            
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

//sawaddekab
}

export default Query;