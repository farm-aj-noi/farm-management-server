import Chillroom from "../../models/Beefstore/chillroom";

const Mutation = {
    creatChillroom: async (parent, args, { userId }, info) => {

        if (!userId) throw new Error("Please log in.");
        console.log(args);

        if(!args.roomnum){throw new Error ("Please provide required field.")};


        const currentRoom = await Chillroom.find();
        const isRoomExist = 
            currentRoom.findIndex((prod) => prod.roomnum == args.roomnum) > -1;
            
        if (isRoomExist) {
            throw new Error("ห้องคุณซ้ำ");
            }

        const chillrooms = await Chillroom.create({
            ...args,
        });

        return Chillroom.findById(chillrooms.id)
        .populate({
            path: "roomnum"
        })
    },

};
export default Mutation