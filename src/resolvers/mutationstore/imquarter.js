import Quarter from "../../models/quarter";
import Imquarter from "../../models/Beefstore/imquarter";
import dayjs from "dayjs";
import BeefStore from "../../models/Beefstore/beefstore";
import Imslaughter from "../../models/imslaughter";
import User from "../../models/user";

const Mutation = {
    createImQuarter: async (parent, args, { userId }, info) => {
    
    if (!userId) throw new Error("Please log in.");

    if (!args.barcode || !args.beefstore){
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

    if (quarter){
    const imquarter = await Imquarter.create({
        importdate: date,
        user: userId,
        quarter: quarter.id,
        beeftype: quarter.beeftype,
        barcode: args.barcode,
        storestatus: statusIM,
        exportdate: date,
        name: 'นำเข้า'
    });

    const store = await BeefStore.findById(args.beefstore);
    if (!store.imquarters) {
        store.imquarters = [imquarter];
    } else  {
        store.imquarters.push(imquarter);
    }
    await store.save();


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
    //เหลือตำเเหน่งห้อง
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

    if(quarter){
        const imquarter = await Imquarter.create({
            user: userId,
            quarter: quarter,
            beeftype: quarter.beeftype,
            beeftypechange: args.beeftypechange,
            barcode: args.barcode,
            storestatus: args.storestatus,
            exportdate: date, 
            name: 'นำออก'
        });
    
    let result = await BeefStore.findByIdAndUpdate({
        _id:"627f7c1f5a28733be04a760f"}, 
        {$pull: {imquarters : exquart.id}})


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

    return test
    }

},

};
export default Mutation