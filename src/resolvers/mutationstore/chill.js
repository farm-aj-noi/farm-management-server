import Chill from "../../models/Beefstore/chill";
import dayjs from "dayjs";
import Chillroom from "../../models/Beefstore/chillroom";
import Halve from "../../models/halve";

const Mutation = {
    createChill: async (parent, args, { userId }, info) => {
        if (!userId) throw new Error("Please log in.");
        console.log(args); 

    if (!args.barcode || !args.chillroom || !args.chillday) {
        throw new Error("Please provide all required fields.");
    }   

    const DateNow = dayjs().toISOString();

    const halve = await Halve.findOne({
        barcode: args.barcode,
    });
        
    const chill = await Chill.create({
        halve: halve,
        chillroom: args.chillroom,
        chilldate: DateNow,
        chillday: args.chillday,
        //statuscure : statuscureId,
        user: userId,
        barcode: args.barcode
    });

    if (!halve.chill) {
        halve.chill = [chill];
    } else  {
        halve.chill.push(chill);
    }
    await halve.save();

    return Chill.findById(chill.id)
    .populate({
        path: "halve",
        populate: { path: "imslaughter" },
    })
    .populate({
        path: "chillroom"
    })
    .populate({
        path: "chilldate"
    })
    .populate({
        path: "barcode"
    })

    },

};
export default Mutation