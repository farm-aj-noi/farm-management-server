import Quarter from "../../models/quarter";
import Imquarter from "../../models/Beefstore/imquarter";
import dayjs from "dayjs";
import BeefStore from "../../models/Beefstore/beefstore";

const Mutation = {
    createImQuarter: async (parent, args, { userId }, info) => {
    
    if (!userId) throw new Error("Please log in.");

    if (!args.barcode || !args.beefstore){
        throw new Error("กรุณากรอกบาร์โค้ด");
    }

    /* const currentRoom = await Imquarter.find();
        const isRoomExist = 
            currentRoom.findIndex((prod) => prod.barcode == args.barcode) > -1;
            
        if (isRoomExist) {
            throw new Error("บาร์โค้ดของคุณซ้ำ");
        }  */

    const date = dayjs()

   
    const quarter = await Quarter.findOne({
        barcode: args.barcode,
    });

    
    if (quarter){
    const imquarter = await Imquarter.create({
        importdate: date,
        user: userId,
        quarter: quarter.id,
        beeftype: quarter.beeftype,
        barcode: args.barcode,
        quarterq: quarter.id,
    });

    const link = await Quarter.findById(quarter.id);
    if (!link.quarter) {
        link.quarter = [imquarter];
    } else  {
        link.quarter.push(imquarter);
    }
    await link.save();

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
    //เหลือตำเเหน่งห้อง
    }
}





};
export default Mutation