import Pbasket from "../../models/Productstore/pbasket";
import Freezer from "../../models/Productstore/freezer";
import Productroom from "../../models/Productstore/productroom";

const Mutation = {
  createPbasket: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.basketname || !args.freezer || !args.productroom) {
      throw new Error("Please provide all required fields.");
    }

    const findfreezer = await Freezer.findById(args.freezer);
    const findroom = await Productroom.findById(args.productroom);

    const pbasket = await Pbasket.create({
      basketname: args.basketname,
      freezer: findfreezer,
      productroom: findroom,
    });

    const freezer = await Freezer.findById(args.freezer);
    if (!freezer.pbasket) {
      freezer.pbasket = [pbasket];
    } else {
      freezer.pbasket.push(pbasket);
    }
    await freezer.save();

    const room = await Productroom.findById(args.productroom);
    if (!room.pbasket) {
      room.pbasket = [pbasket];
    } else {
      room.pbasket.push(pbasket);
    }
    await room.save();

    return await Pbasket.findById(pbasket.id)
      .populate({
        path: "freezer",
      })
      .populate({
        path: "productroom",
      });
  },

  deletePbasket: async (parent, args, { userId }, info) => {
    const bask = await Pbasket.findById(args.id);

    const freezer = await Freezer.findOne({ pbasket: args.id });
    const freezers = freezer.id;

    let result = await Freezer.findByIdAndUpdate(
      {
        _id: freezers,
      },
      { $pull: { pbasket: bask.id } }
    );

    const deletepbasket = await Pbasket.findByIdAndDelete(args.id);

    return deletepbasket;
  },

  updatePbasket: async (parent, args, { userId }, info) => {
    const { id, basketname } = args;

    const basket = await Pbasket.findById(id);

    const updateInfo = {
      basketname: !!basketname ? basketname : basket.basketname,
    };

    await Pbasket.findByIdAndUpdate(id, updateInfo);

    const updatedFinish = await Pbasket.findById(id);
    return updatedFinish;
  },
};
export default Mutation;
