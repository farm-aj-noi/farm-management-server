import Basket from "../../models/Beefstore/basket";
import Beefroom from "../../models/Beefstore/beefroom";
import Shelf from "../../models/Beefstore/shelf";
import Typekeep from "../../models/Beefstore/typekeep";

const Mutation = {
  createBeefroom: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.roomname) {
      throw new Error("Please provide all required fields.");
    }

    const room = await Beefroom.create({
      ...args,
    });

    return await Beefroom.findById(room.id);
  },

  deleteBeefroom: async (parent, args, { userId }, info) => {
    //if (!userId) throw new Error("Please log in.");

    const room = await Beefroom.findById(args.id);
    const shelfs = room.shelf;
    const basket = room.basket;
    const roomtypekeep = room.typekeep;

    const shelftypekeep = await Typekeep.find({shelf: shelfs})
    
    for (let i = 0; i < shelfs.length; i++) {
      await Shelf.findByIdAndDelete(shelfs[i]);
    }

    for (let i = 0; i < basket.length; i++) {
      await Basket.findByIdAndDelete(basket[i]);
    }

    for (let i = 0; i < roomtypekeep.length; i++) {
      await Typekeep.findByIdAndDelete(roomtypekeep[i]);
    }

    for (let i = 0; i < shelftypekeep.length; i++) {
      await Typekeep.findByIdAndDelete(shelftypekeep[i]);
    }

    const deleteroom = await Beefroom.findByIdAndDelete(room);

    return deleteroom;
  },
};
export default Mutation;
