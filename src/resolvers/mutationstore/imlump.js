import Lump from "../../models/lump";
import Imlump from "../../models/Beefstore/imlump";
import dayjs from "dayjs";
import BeefStore from "../../models/Beefstore/beefstore";

const Mutation = {
    createImlump: async (parent, args, { userId }, info) => {
    
    if (!userId) throw new Error("Please log in.");

    if (!args.barcode || !args.beefstore){
        throw new Error("กรุณากรอกบาร์โค้ด");
    }

    const currentRoom = await Imlump.find();
        const isRoomExist = 
            currentRoom.findIndex((prod) => prod.barcode == args.barcode) > -1;
            
        if (isRoomExist) {
            throw new Error("บาร์โค้ดของคุณซ้ำ");
        }

    const date = dayjs()

    const lump = await Lump.findOne({
        barcode: args.barcode,
    });

    const statusIM = "5f448d5d4ef8ed48806f1b53";

    if (lump){
    const imlump = await Imlump.create({
        importdate: date,
        user: userId,
        lump: lump,
        beeftype: lump.beeftype,
        barcode: args.barcode,
        storestatus: statusIM,
        name: 'นำเข้า',
    });

    const store = await BeefStore.findById(args.beefstore);
    if (!store.imlumps) {
        store.imlumps = [imlump];
    } else  {
        store.imlumps.push(imlump);
    }
    await store.save();

    let test = await Imlump.findById(imlump.id)
    .populate({
        path: "user",
        populate: {path: "imlumps",}
    })
    .populate({
        path: "lump",
        populate: {path: "status"}
    })
    .populate({
        path: "lump",    
        populate: {path: "imslaughter",}
    })
    .populate({
        path: "lump",
        populate: {path: "beeftype"}
    })
    .populate({
        path: "beeftype",
    })
    .populate({
        path: "storestatus",
    })
    
    console.log(test)
    return test
    }
},

    createExportl: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.barcode || !args.storestatus || !args.beeftypechange){
        throw new Error("กรุณากรอกบาร์โค้ด");
    }
    

    const date = dayjs()

    const lump = await Lump.findOne({
        barcode: args.barcode,
    });

    const exlump = await Imlump.findOne({
        barcode: args.barcode,
    });

    if(lump){
        const imlump = await Imlump.create({
            user: userId,
            lump: lump,
            beeftype: lump.beeftype,
            beeftypechange: args.beeftypechange,
            barcode: args.barcode,
            storestatus: args.storestatus,
            exportdate: date, 
            name: 'นำออก'
        });

    let result = await BeefStore.findByIdAndUpdate({
        _id:"627f7c1f5a28733be04a760f"}, 
        {$pull: {imlumps : exlump.id}})

    let test = await Imlump.findById(imlump.id)
    .populate({
        path: "user",
        populate: {path: "imlumps"}
    })
    .populate({
        path: "lump",
        populate: {path: "status"}
    })
    .populate({
        path: "lump",    
        populate: {path: "imslaughter",}
    })
    .populate({
        path: "lump",
        populate: {path: "beeftype"}
    })
    .populate({
        path: "beeftype",
    })
    .populate({
        path: "storestatus",
    })
    .populate({
        path: "beeftypechange"
    })

    return test   
    }

},

}
export default Mutation