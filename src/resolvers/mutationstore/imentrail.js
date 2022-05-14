import Entrail from "../../models/entrail";
import Imentrail from "../../models/Beefstore/imentrail";
import dayjs from "dayjs";
import BeefStore from "../../models/Beefstore/beefstore";

const Mutation = {
    createImentrail: async (parent, args, { userId }, info) => {

    if (!userId) throw new Error("Please log in.");

    if (!args.barcode || !args.beefstore){
        throw new Error("กรุณากรอกบาร์โค้ด");
    }

    const currentRoom = await Imentrail.find();
        const isRoomExist = 
            currentRoom.findIndex((prod) => prod.barcode == args.barcode) > -1;
            
        if (isRoomExist) {
            throw new Error("บาร์โค้ดของคุณซ้ำ");
        }

    const date = dayjs()

    const entrail = await Entrail.findOne({
        barcode: args.barcode,
    });

    if (entrail){
    const imentrail = await Imentrail.create({
        importdate: date,
        user: userId,
        entrail: entrail,
        barcode: args.barcode,
    });
    
    const store = await BeefStore.findById(args.beefstore);
    if (!store.imentrails) {
        store.imentrails = [imentrail];
    } else  {
        store.imentrails.push(imentrail);
    }
    await store.save();

    let test = await Imentrail.findById(imentrail.id)
    .populate({
        path: "user",
        populate: {path: "imentrails",}
    })
    .populate({
        path: "entrail",    
        populate: {path: "imslaughter",}
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