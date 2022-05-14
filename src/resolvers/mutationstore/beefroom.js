import Beefroom from "../../models/Beefstore/beefroom";

const Mutation = {
    createBeefroom: async (parent, args, { userId }, info) => {
        //if (!userId) throw new Error("Please log in.");

        if(!args.roomnum){
            throw new Error("กรุณากรอกหมายเลขห้อง")
        }

        const currentRoom = await Beefroom.find();
        const isRoomExist = 
            currentRoom.findIndex((prod) => prod.roomnum == args.roomnum) > -1;
            
        if (isRoomExist) {
            throw new Error("ห้องของคุณซ้ำ");
        }

        const room = await Beefroom.create({
            roomnum: args.roomnum
        });

    },

    




}
export default Mutation