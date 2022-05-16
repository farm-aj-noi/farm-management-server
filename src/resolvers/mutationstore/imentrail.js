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

    /* const currentRoom = await Imentrail.find();
        const isRoomExist = 
            currentRoom.findIndex((prod) => prod.barcode == args.barcode) > -1;
            
        if (isRoomExist) {
            throw new Error("บาร์โค้ดของคุณซ้ำ");
        } */

    const date = dayjs()

    const entrail = await Entrail.findOne({
        barcode: args.barcode,
    });

    const statusIM = "5f448d5d4ef8ed48806f1b53";

    if (entrail){
    const imentrail = await Imentrail.create({
        importdate: date,
        user: userId,
        entrail: entrail,
        barcode: args.barcode,
        storestatus: statusIM,
        name: 'นำเข้า'
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
    .populate({
        path: "storestatus",
    })
    console.log(test)
    return test
    
    }
},

    createExporte: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.barcode || !args.storestatus){
        throw new Error("กรุณากรอกบาร์โค้ด");
    }
    

    const date = dayjs()

    const entrail = await Entrail.findOne({
        barcode: args.barcode,
    });    

    const exentrail = await Imentrail.findOne({
        barcode: args.barcode,
    });

    if(entrail){
        const imentrail = await Imentrail.create({
            user: userId,
            entrail: entrail,
            barcode: args.barcode,
            storestatus: args.storestatus,
            exportdate: date, 
            name: 'นำออก'
        });
    
    let result = await BeefStore.findByIdAndUpdate({
        _id:"627f7c1f5a28733be04a760f"}, 
        {$pull: {entrails : exentrail.id}})

    let test = await Imentrail.findById(imentrail.id)
    .populate({
        path: "user",
        populate: {path: "imentrails"}
    })
    .populate({
        path: "entrail",    
        populate: {path: "imslaughter",}
    })
    .populate({
        path: "storestatus",
    })

    return test
    }
    
},


}
export default Mutation