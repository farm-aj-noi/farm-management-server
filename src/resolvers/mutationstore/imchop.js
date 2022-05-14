import Chop from "../../models/chop";
import Imchop from "../../models/Beefstore/imchop";
import dayjs from "dayjs";
import BeefStore from "../../models/Beefstore/beefstore";

const Mutation = {
    createImchop: async (parent, args, { userId }, info) => {
    
    if (!userId) throw new Error("Please log in.");

    if (!args.barcode || !args.beefstore){
        throw new Error("กรุณากรอกบาร์โค้ด");
    }

    const currentRoom = await Imchop.find();
        const isRoomExist = 
            currentRoom.findIndex((prod) => prod.barcode == args.barcode) > -1;
            
        if (isRoomExist) {
            throw new Error("บาร์โค้ดของคุณซ้ำ");
        }

    const date = dayjs()

    const chop = await Chop.findOne({
        barcode: args.barcode,
    });

    if (chop){
    const imchop = await Imchop.create({
        importdate: date,
        user: userId,
        chop: chop,
        beeftype: chop.beeftype,
        barcode: args.barcode,
    });
    
    const store = await BeefStore.findById(args.beefstore);
    if (!store.imchops) {
        store.imchops = [imchop];
    } else  {
        store.imchops.push(imchop);
    }
    await store.save();

    let test = await Imchop.findById(imchop.id)
    .populate({
        path: "user",
        populate: {path: "imchops",}
    })
    .populate({
        path: "chop",
        populate: {path: "status"}
    })
    .populate({
        path: "chop",    
        populate: {path: "imslaughter",}
    })
    .populate({
        path: "chop",
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