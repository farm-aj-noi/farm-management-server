import Chop from "../../models/chop";
import Imchop from "../../models/Beefstore/imchop";
import dayjs from "dayjs";
import BeefStore from "../../models/Beefstore/beefstore";
import Imslaughter from "../../models/imslaughter";
import User from "../../models/user";

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

    const statusIM = "5f448d5d4ef8ed48806f1b53";

    const findfarmer = chop.imslaughter
    const farmerName = await Imslaughter.findById(findfarmer)

    const finduser = userId
    const username = await User.findById(finduser)

    if (chop){
    const imchop = await Imchop.create({
        name: 'นำเข้า',
        importdate: date,
        user: userId,
        chop: chop,
        barcode: args.barcode,
        beeftype: chop.beeftype,
        namefarmer: farmerName.namefarmer,
        userName: username.name,
        storestatus: statusIM,
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
    .populate({
        path: "storestatus",
    })
    
    console.log(test)
    return test

    }
},

    createExportc: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.barcode || !args.storestatus){
        throw new Error("กรุณากรอกบาร์โค้ด");
    }
    

    const date = dayjs()

    const chop = await Chop.findOne({
        barcode: args.barcode,
    });

    const exchop = await Imchop.findOne({
        barcode: args.barcode,
    });

    const findfarmer = chop.imslaughter
    const farmerName = await Imslaughter.findById(findfarmer)

    const finduser = userId
    const username = await User.findById(finduser)

    if(chop){
        const imchop = await Imchop.create({
            name: 'นำออก',
            exportdate: date,
            user: userId,
            chop: chop,
            barcode: args.barcode,
            beeftype: chop.beeftype,
            namefarmer: farmerName.namefarmer,
            userName: username.name,
            storestatus: args.storestatus,
        });

    let result = await BeefStore.findByIdAndUpdate({
        _id:"627f7c1f5a28733be04a760f"}, 
        {$pull: {imchops : exchop.id}})

    let test = await Imchop.findById(imchop.id)
    .populate({
        path: "user",
        populate: {path: "imchops"}
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
    .populate({
        path: "storestatus",
    })

    return test   
    }

},    


}
export default Mutation