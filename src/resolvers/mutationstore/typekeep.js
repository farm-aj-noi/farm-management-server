import Beefroom from "../../models/Beefstore/beefroom";
import Typekeep from "../../models/Beefstore/typekeep";
import Beeftype from "../../models/beeftype";

const Mutation = {
    createtypekeep: async (parent, args, { userId }, info) => {
        //if (!userId) throw new Error("Please log in.");
        
        if (!args.totalbeef || !args.beeftype || !args.beefroom){
            throw new Error("กรุณากรอกข้อมูลให้ครบ");
        }

        const beeftype = await Beeftype.findById(args.beeftype)
        

        const room = await Beefroom.findById(args.beefroom)

        const keep = await Typekeep.create({
            totalbeef: args.totalbeef,
            beeftype: beeftype,
            beefroom: room
        });
        
        const beefroom = await Beefroom.findById(args.beefroom);
        if(!beefroom.typekeep){
            beefroom.typekeep = [keep];
        } else {
            beefroom.typekeep.push(keep);
        }
        await beefroom.save();
        
        let test = await Typekeep.findById(keep.id)
        .populate({
            path: "beeftype"
        })
        .populate({
            path: "beefroom"
        })
        return test
    },


}
export default Mutation