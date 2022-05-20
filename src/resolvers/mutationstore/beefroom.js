import Beefroom from "../../models/Beefstore/beefroom";

const Mutation = {
    createBeefroom: async (parent, args, { userId }, info) => {
        //if (!userId) throw new Error("Please log in.");

        if (!args.roomname) {
            throw new Error("Please provide all required fields.");
        } 

        const room = await Beefroom.create({
            ...args,
        });

        return await Beefroom.findById(room.id)

        
    },

    




}
export default Mutation