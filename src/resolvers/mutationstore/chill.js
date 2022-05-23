import Chill from "../../models/Beefstore/chill";
import dayjs from "dayjs";
import Chillroom from "../../models/Beefstore/chillroom";
import Halve from "../../models/halve";
import Imhalve from "../../models/Beefstore/imhalve";
import Chillday from "../../models/Beefstore/chillday";

const Mutation = {
    createChill: async (parent, args, { userId }, info) => {
        //if (!userId) throw new Error("Please log in.");
        

    if (!args.barcode || !args.chillroom || !args.chillday) {
        throw new Error("Please provide all required fields.");
    }   

    const DateNow = dayjs().toISOString();

    const halve = await Halve.findOne({
        barcode: args.barcode,
    });

    const find = await Chillday.findById(args.chillday)
    const chillday = Number(find.day)
    
    const statusCh = "6284ad73fbfac22364a6e430"

    const dateEnd = dayjs().startOf("h").add(chillday, "day").toISOString();



    //await Imhalve.findOneAndUpdate({barcode: args.barcode},{storestatus : statusCh})

    const chill = await Chill.create({
        halve: halve,
        beeftype: halve.beeftype,
        chillroom: args.chillroom,
        chilldateStart: DateNow,
        chilldateEnd: dateEnd,
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

    updateChillday: async (parent, args, { userId }, info) => {
        const { id } = args;

        //if (!userId) throw new Error("Please log in.");

        const chill = await Chill.findById(id);

        const dateEnd = chill.chilldateEnd
        const chillenddate = (dayjs(dateEnd).format("YYYYMMDD").toString())

        const checkdate =  (dayjs().format("YYYYMMDD").toString());
        
        const checkchilldate =  checkdate >= chillenddate
      
        if(checkchilldate){
            const statusCh = "6284ad91fbfac22364a6e431";
            const updateInfo = {
                storestatus: !!statusCh? statusCh: chill.storestatus,
            };
            await Chill.findByIdAndUpdate(id, updateInfo);
        }else {
            throw new Error("ซากโคผ่าซีกกำลังบ่ม")
        }
    },



};
export default Mutation