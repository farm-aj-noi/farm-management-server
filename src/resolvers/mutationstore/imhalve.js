import Halve from "../../models/halve";
import Imhalve from "../../models/Beefstore/imhalve";
import dayjs from "dayjs";
import BeefStore from "../../models/Beefstore/beefstore";

const Mutation = {
    createImHalve: async (parent, args, { userId }, info) => {
    
    if (!userId) throw new Error("Please log in.");

    if (!args.barcode || !args.beefstore){
        throw new Error("กรุณากรอกบาร์โค้ด");
    }

    /* const currentRoom = await Imhalve.find();
        const isRoomExist = 
            currentRoom.findIndex((prod) => prod.barcode == args.barcode) > -1;
            
        if (isRoomExist) {
            throw new Error("บาร์โค้ดของคุณซ้ำ");
        }
 */
    const date = dayjs()

    const halve = await Halve.findOne({
        barcode: args.barcode,
    });

    const statusIM = "5f448d5d4ef8ed48806f1b53";
    
    
    //await Halve.findByIdAndUpdate(halve.id, { status : statusIM})

    
    if (halve){
    const imhalve = await Imhalve.create({
        importdate: date,
        user: userId,
        halve: halve,
        beeftype: halve.beeftype,
        barcode: args.barcode,
        storestatus: statusIM,
        name: 'นำเข้า'
    });

    const store = await BeefStore.findById(args.beefstore);
    if (!store.imhalves) {
        store.imhalves = [imhalve];
    } else  {
        store.imhalves.push(imhalve);
    }
    await store.save();
    
    let test = await Imhalve.findById(imhalve.id)
    .populate({
        path: "user",
        populate: {path: "imhalves",}
    })
    .populate({
        path: "halve",
        populate: {path: "status"}
    })
    .populate({
        path: "halve",    
        populate: {path: "imslaughter",}
    })
    .populate({
        path: "halve",
        populate: {path: "beeftype"}
    })
    .populate({
        path: "beeftype",
    })
    .populate({
        path: "storestatus",
    })
    /* .populate({
        path: "halve",
        populate: {path: "curing", populate: {path: "cureroom"}}
    }) */
    console.log(test)
    return test
    }
},

    createExporth: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.barcode || !args.storestatus || !args.beeftypechange){
        throw new Error("กรุณากรอกบาร์โค้ด");
    }

    const date = dayjs()

    const halve = await Halve.findOne({
        barcode: args.barcode,
    });

    const exhalve = await Imhalve.findOne({
        barcode: args.barcode,
    });

    
    if(halve){
        const imhalve = await Imhalve.create({
            user: userId,
            halve: halve,
            beeftype: halve.beeftype,
            beeftypechange: args.beeftypechange,
            barcode: args.barcode,
            storestatus: args.storestatus,
            exportdate: date, 
            name: 'นำออก'
        });
    
    let result = await BeefStore.findByIdAndUpdate({
        _id:"627f7c1f5a28733be04a760f"}, 
        {$pull: {imhalves : exhalve.id}})

        
    let test = await Imhalve.findById(imhalve.id)
    .populate({
        path: "user",
        populate: {path: "imhalves",}
    })
    .populate({
        path: "halve",
        populate: {path: "status"}
    })
    .populate({
        path: "halve",    
        populate: {path: "imslaughter",}
    })
    .populate({
        path: "halve",
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


























/* exportHalve: async (parent, args, { userId }, info) => {
    const { barcode, storestatus, beeftypechange } = args;

    if (!barcode || !storestatus || !beeftypechange) {
        throw new Error("Please provide all required fields.");
      }
    
    const date = dayjs()
    
    const halve = await Imhalve.findOneAndUpdate(
        {barcode: args.barcode,},
        {storestatus: args.storestatus, beeftypechange: args.beeftypechange, exportdate: date}
    );
    

    let result = await BeefStore.findByIdAndUpdate({
        _id:"627f7c1f5a28733be04a760f"}, 
        {$pull: {imhalves : halve.id}})
    
        
        
    {$pull: {rooms: {_id: "611efbb06986120738b4092f"}}}
    
    
    
    const updatedFinish = await Imhalve.findById(halve.id)
    .populate({
        path: "user",
        populate: {path: "imhalves",}
    })
    .populate({
        path: "halve",
        populate: {path: "status"}
    })
    .populate({
        path: "halve",    
        populate: {path: "imslaughter",}
    })
    .populate({
        path: "halve",
        populate: {path: "beeftype"}
    })
    .populate({
        path: "exportdate"
    })
    .populate({
        path: "storestatus"
    })
    .populate({
        path: "beeftypechange"
    })
    
    

    return updatedFinish





} */





};
export default Mutation