import Beefroom from "../../models/Beefstore/beefroom";
import Shelf from "../../models/Beefstore/shelf";

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
    if (!userId) throw new Error("Please log in.");

    // Delete Beeftype
    const deleteshelf = await Shelf.findByIdAndDelete(args.id);

    return deleteshelf;
  },
};
export default Mutation;
