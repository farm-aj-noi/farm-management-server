import Beefroom from "../../models/Beefstore/beefroom";
import Shelf from "../../models/Beefstore/shelf";
import Typekeep from "../../models/Beefstore/typekeep";

const Mutation = {
  createShelf: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.shelfname || !args.beefroom) {
      throw new Error("กรุณากรอกข้อมูลให้ครบ");
    }

    const room = await Beefroom.findById(args.beefroom);

    const shelf = await Shelf.create({
      shelfname: args.shelfname,
      beefroom: room,
    });

    const beefroom = await Beefroom.findById(args.beefroom);
    if (!beefroom.shelf) {
      beefroom.shelf = [shelf];
    } else {
      beefroom.shelf.push(shelf);
    }
    await beefroom.save();

    return await Shelf.findById(shelf.id).populate({
      path: "beefroom",
    });
  },

  deleteShelf: async (parent, args, { userId }, info) => {
    const shelf = await Shelf.findById(args.id)

    const room = await Beefroom.findOne({shelf: args.id})
    const rooms = room.id;

    const type = await Typekeep.findOne({shelf: args.id})

    let result = await Beefroom.findByIdAndUpdate(
      {
        _id: rooms,
      },
      { $pull: { shelf: shelf.id} }
    );

    if(type.shelf !== null){
      await Typekeep.findByIdAndDelete(type.id)
    }

    const deleteshelf = await Shelf.findByIdAndDelete(args.id);

    return deleteshelf;
  },

  updateShelf: async (parent, args, { userId }, info) => {
    const { id, shelfname } = args;

    const shelf = await Shelf.findById(id)

    const updateInfo = {
      shelfname: !!shelfname ? shelfname : shelf.shelfname,
    };

    await Shelf.findByIdAndUpdate(id, updateInfo);

    const updatedFinish = await Shelf.findById(id);
    return updatedFinish;
  }
};
export default Mutation;
