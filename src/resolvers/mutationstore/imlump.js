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

    if (lump){
    const imlump = await Imlump.create({
        importdate: date,
        user: userId,
        lump: lump,
        beeftype: lump.beeftype,
        barcode: args.barcode,
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
    
    console.log(test)
    return test
    }
},



}
export default Mutation