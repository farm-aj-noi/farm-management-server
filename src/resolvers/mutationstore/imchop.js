import Chop from "../../models/chop";
import Imchop from "../../models/Beefstore/imchop";
import dayjs from "dayjs";
import BeefStore from "../../models/Beefstore/beefstore";
import Imslaughter from "../../models/imslaughter";
import User from "../../models/user";

const Mutation = {
    createImchop: async (parent, args, { userId }, info) => {
    
    if (!userId) throw new Error("Please log in.");

    if (!args.barcode || 
        !args.beefstore || 
        !args.beefroom || 
        !args.shelf || 
        !args.basket){
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
        beefroom: args.beefroom,
        shelf: args.shelf,
        basket: args.basket,
    });
    
    const store = await BeefStore.findById(args.beefstore);
    if (!store.imchops) {
        store.imchops = [imchop];
    } else  {
        store.imchops.push(imchop);
    }
    await store.save();

    const rooms = await Beefroom.findById(args.beefroom);
    if (!rooms.chop) {
        rooms.chop = [chop];
    } else  {
        rooms.chop.push(chop);
    }
    await rooms.save();

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
    .populate({
        path: "beefroom",
    })
    .populate({
        path: "shelf",
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

    const room = exchop.beefroom

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
        _id:"6284d7035415c34e54b2fc2c"}, 
        {$pull: {imchops : exchop.id}})

    let r = await Beefroom.findByIdAndUpdate({
        _id: room },
        {$pull: {chop : chop}})

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
    .populate({
        path: "beefroom",
    })
    .populate({
        path: "shelf",
    })

    return test   
    }

},    


}
export default Mutation