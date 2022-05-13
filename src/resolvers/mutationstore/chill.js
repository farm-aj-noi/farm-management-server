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


    let test = Chill.findById(chill.id)
    .populate({
        path: "halve",
        populate: { path: "imslaughter" },
    })
    .populate({
        path: "halve",
        populate: { path: "beeftype" },
    })
    .populate({
        path: "halve",
        populate: { path: "status" },
    })
    .populate({
        path: "chillroom"
    })
    return test
    
},

};
export default Mutation