import Freezer from "../../models/Productstore/freezer";
import Productroom from "../../models/Productstore/productroom";
import Typekeep2 from "../../models/Productstore/typekeep2";

const Mutation = {
  createFreezer: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.freezername || !args.productroom) {
      throw new Error("กรุณากรอกข้อมูลให้ครบ");
    }

    const room = await Productroom.findById(args.productroom);

    const freezer = await Freezer.create({
      freezername: args.freezername,
      productroom: room,
    });

    const productroom = await Productroom.findById(args.productroom);
    if (!productroom.freezer) {
      productroom.freezer = [freezer];
    } else {
      productroom.freezer.push(freezer);
    }
    await productroom.save();

    return await Freezer.findById(freezer.id).populate({
      path: "productroom",
    });
  },
  deleteFreezer: async (parent, args, { userId }, info) => {
    const freezer = await Freezer.findById(args.id);

    const room = await Productroom.findOne({ freezer: args.id });
    const rooms = room.id;

    const type = await Typekeep2.findOne({ freezer: args.id });

    let result = await Productroom.findByIdAndUpdate(
      {
        _id: rooms,
      },
      { $pull: { freezer: freezer.id } }
    );

    if (type.freezer !== null) {
      await Typekeep2.findByIdAndDelete(type.id);
    }

    const deletefreezer = await Freezer.findByIdAndDelete(args.id);

    return deletefreezer;
  },
  updateFreezer: async (parent, args, { userId }, info) => {
    const { id, freezername } = args;

    const freezer = await Freezer.findById(id);

    const updateInfo = {
      freezername: !!freezername ? freezername : freezer.freezername,
    };

    await Freezer.findByIdAndUpdate(id, updateInfo);

    const updatedFinish = await Freezer.findById(id);
    return updatedFinish;
  },
};
export default Mutation;
