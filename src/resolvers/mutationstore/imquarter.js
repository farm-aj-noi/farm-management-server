import Quarter from "../../models/quarter";
import Imquarter from "../../models/Beefstore/imquarter";
import dayjs from "dayjs";
import BeefStore from "../../models/Beefstore/beefstore";
import Imslaughter from "../../models/imslaughter";
import User from "../../models/user";
import Beefroom from "../../models/Beefstore/beefroom";
import Typekeep from "../../models/Beefstore/typekeep";

const Mutation = {
    createImQuarter: async (parent, args, { userId }, info) => {
    
    if (!userId) throw new Error("Please log in.");

    if (!args.barcode || !args.beefstore || !args.beefroom){
        throw new Error("กรุณากรอกบาร์โค้ด");
    }

    const currentRoom = await Imquarter.find();
        const isRoomExist = 
            currentRoom.findIndex((prod) => prod.barcode == args.barcode) > -1;
            
        if (isRoomExist) {
            throw new Error("บาร์โค้ดของคุณซ้ำ");
        } 

    const date = dayjs()

   
    const quarter = await Quarter.findOne({
        barcode: args.barcode,
    });

    const statusIM = "5f448d5d4ef8ed48806f1b53";

    const findfarmer = quarter.imslaughter
    const farmerName = await Imslaughter.findById(findfarmer)

    const finduser = userId
    const username = await User.findById(finduser)

    const room = await Beefroom.findById(args.beefroom)
    const y = room.typekeep
    const totalquarter = room.quarter

    const typekeeps = await Typekeep.findById(y)
    const findtype = typekeeps.beeftype.toString()

    const type = quarter.beeftype.toString()

    const totalbeef = typekeeps.totalbeef.toString()

    const isRoomEmpty = totalquarter.length == totalbeef

    if(isRoomEmpty){
        throw new Error ("ชั้นของคุณเต็มกรุณาเพิ่มชั้น");
    }

    if (type !== findtype){
        throw new Error ("กรุณานำเข้าประเภทชิ้นเนื้อให้ถูกต้อง");
    }

    if (quarter){
    const imquarter = await Imquarter.create({
        name: 'นำเข้า',
        importdate: date,
        user: userId,
        quarter: quarter.id,
        barcode: args.barcode,
        beeftype: quarter.beeftype,
        namefarmer: farmerName.namefarmer,
        userName: username.name,
        storestatus: statusIM,
        beefroom: args.beefroom
    });

    const store = await BeefStore.findById(args.beefstore);
    if (!store.imquarters) {
        store.imquarters = [imquarter];
    } else  {
        store.imquarters.push(imquarter);
    }
    await store.save();

    const rooms = await Beefroom.findById(args.beefroom);
    if (!rooms.quarter) {
        rooms.quarter = [quarter];
    } else  {
        rooms.quarter.push(quarter);
    }
    await rooms.save();


    return Imquarter.findById(imquarter.id)
    .populate({
        path: "user",
        populate: {path: "imquarters"}
    })
    .populate({
        path: "quarter",
        populate: {path: "status"}
    })
    .populate({
        path: "quarter",    
        populate: {path: "imslaughter",}
    })
    .populate({
        path: "quarter",
        populate: {path: "beeftype"}
    })
    .populate({
        path: "storestatus",
    })
    .populate({
        path: "beefroom",
    })
    }
},

    createExportq: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.barcode || !args.storestatus || !args.beeftypechange){
        throw new Error("กรุณากรอกบาร์โค้ด");
    }
    
    const date = dayjs()

    const quarter = await Quarter.findOne({
        barcode: args.barcode,
    });

    const exquart = await Imquarter.findOne({
        barcode: args.barcode,
    });

    const findfarmer = quarter.imslaughter
    const farmerName = await Imslaughter.findById(findfarmer)

    const finduser = userId
    const username = await User.findById(finduser)

    const room = exquart.beefroom

    const find = await Imquarter.findOne({barcode: args.barcode, name: "นำออก"}).countDocuments() > 0
    
    if (find){
        throw new Error("ซากโคสี่เสี้ยวนี้ถูกนำออกไปเเล้ว");
    }

    if(quarter){
        const imquarter = await Imquarter.create({
            name: 'นำออก',
            exportdate: date, 
            user: userId,
            quarter: quarter,
            barcode: args.barcode,
            beeftype: quarter.beeftype,
            beeftypechange: args.beeftypechange,
            namefarmer: farmerName.namefarmer,
            userName: username.name,
            storestatus: args.storestatus,
        });
    
    let result = await BeefStore.findByIdAndUpdate({
        _id:"6284d7035415c34e54b2fc2c"}, 
        {$pull: {imquarters : exquart.id}})

    let r = await Beefroom.findByIdAndUpdate({
        _id: room },
        {$pull: {quarter : quarter}})


    let test = await Imquarter.findById(imquarter.id)
    .populate({
        path: "user",
        populate: {path: "imquarters"}
    })
    .populate({
        path: "quarter",
        populate: {path: "status"}
    })
    .populate({
        path: "quarter",    
        populate: {path: "imslaughter",}
    })
    .populate({
        path: "quarter",
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
    .populate({
        path: "beefroom",
    })
    .populate({
        path: "shelf",
    })

    return test
    }

},

};
export default Mutation