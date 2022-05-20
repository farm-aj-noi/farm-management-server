import Beefroom from "../../models/Beefstore/beefroom";
import Shelf from "../../models/Beefstore/shelf";
import Typekeep from "../../models/Beefstore/typekeep";
import Beeftype from "../../models/beeftype";

const Mutation = {
    createtypekeep: async (parent, args, { userId }, info) => {
        //if (!userId) throw new Error("Please log in.");
        
        if (!args.totalbeef || !args.beeftype){
            throw new Error("กรุณากรอกข้อมูลให้ครบ");
        }

        const beeftype = await Beeftype.findById(args.beeftype)
        

        const room = await Beefroom.findById(args.beefroom)
        const findshelf = await Shelf.findById(args.shelf)

        const keep = await Typekeep.create({
            totalbeef: args.totalbeef,
            beeftype: beeftype,
            beefroom: room,
            shelf: findshelf,
        });
        
            if(args.beefroom ){
               const beefroom = await Beefroom.findById(args.beefroom);
                if(!beefroom.typekeep){
                beefroom.typekeep = [keep];
                } else {
                beefroom.typekeep.push(keep);
                }
                await beefroom.save(); 
            } else {
                const shelfs = await Shelf.findById(args.shelf);
                if(!shelfs.typekeep){
                shelfs.typekeep = [keep];
                } else {
                shelfs.typekeep.push(keep);
                }
                await shelfs.save();  
            }
            
        let test = await Typekeep.findById(keep.id)
        .populate({
            path: "beeftype"
        })
        .populate({
            path: "beefroom"
        })
        .populate({
            path: "shelf"
        })
        return test
    },


}
export default Mutation