import Entrail from "../../models/entrail";
import Imentrail from "../../models/Beefstore/imentrail";
import dayjs from "dayjs";
import EntrailStore from "../../models/Beefstore/entrailstore";
import Imslaughter from "../../models/imslaughter";
import User from "../../models/user";

const Mutation = {
    createImentrail: async (parent, args, { userId }, info) => {

    if (!userId) throw new Error("Please log in.");

    if (!args.barcode || !args.entrailstore){
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

    const findfarmer = entrail.imslaughter
    const farmerName = await Imslaughter.findById(findfarmer)

    const finduser = userId
    const username = await User.findById(finduser)

    if (entrail){
    const imentrail = await Imentrail.create({
        name: 'นำเข้า',
        importdate: date,
        user: userId,
        entrail: entrail,
        barcode: args.barcode,
        namefarmer: farmerName.namefarmer,
        userName: username.name,
        storestatus: statusIM,
        
    });
    
    const store = await EntrailStore.findById(args.entrailstore);
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

    const findfarmer = entrail.imslaughter
    const farmerName = await Imslaughter.findById(findfarmer)

    const finduser = userId
    const username = await User.findById(finduser)

    if(entrail){
        const imentrail = await Imentrail.create({
            name: 'นำออก',
            exportdate: date,
            user: userId,
            entrail: entrail,
            barcode: args.barcode,
            namefarmer: farmerName.namefarmer,
            userName: username.name,
            storestatus: args.storestatus,
        });
    
    let result = await EntrailStore.findByIdAndUpdate({
        _id:"62837e7631ace600dc6caa23"}, 
        {$pull: {imentrails : exentrail.id}})

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