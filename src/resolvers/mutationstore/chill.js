import Chill from "../../models/Beefstore/chill";
import dayjs from "dayjs";
import Chillroom from "../../models/Beefstore/chillroom";
import Halve from "../../models/halve";
import Imhalve from "../../models/Beefstore/imhalve";

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
    
    const statusCh = "6284ad73fbfac22364a6e430"

    //await Imhalve.findOneAndUpdate({barcode: args.barcode},{storestatus : statusCh})

    const chill = await Chill.create({
        halve: halve,
        beeftype: halve.beeftype,
        chillroom: args.chillroom,
        chilldate: DateNow,
        chillday: args.chillday,
        //statuscure : statuscureId,
        user: userId,
        barcode: args.barcode,
        storestatus: statusCh
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
    .populate({
        path: "storestatus",
    })
    return test
    
    },



};
export default Mutation