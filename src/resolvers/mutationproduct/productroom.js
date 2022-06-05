import Freezer from "../../models/Productstore/freezer";
import Pbasket from "../../models/Productstore/pbasket";
import Productroom from "../../models/Productstore/productroom";
import Typekeep2 from "../../models/Productstore/typekeep2";

const Mutation = {
  createProductroom: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.roomname) {
      throw new Error("Please provide all required fields.");
    }

    const room = await Productroom.create({
      ...args,
    });

    return await Productroom.findById(room.id);
  },

  deleteProductroom: async (parent, args, { userId }, info) => {
    const room = await Productroom.findById(args.id);
    const freezers = room.freezer;
    const pbasket = room.pbasket;

    const freezertypekeep = await Typekeep2.find({freezer: freezers})

    for (let i = 0; i < freezers.length; i++) {
      await Freezer.findByIdAndDelete(freezers[i]);
    }

    for (let i = 0; i < pbasket.length; i++) {
      await Pbasket.findByIdAndDelete(pbasket[i]);
    }

    for (let i = 0; i < freezertypekeep.length; i++) {
      await Typekeep2.findByIdAndDelete(freezertypekeep[i]);
    }

    const deleteroom = await Productroom.findByIdAndDelete(room);

    return deleteroom;
  },

  updateProductroom: async (parent, args, { userId }, info) => {
    const { id, roomname } = args;

    const productroom = await Productroom.findById(id)

    const updateInfo = {
      roomname: !!roomname ? roomname : productroom.roomname,
    };

    await Productroom.findByIdAndUpdate(id, updateInfo);

    const updatedFinish = await Productroom.findById(id);
    return updatedFinish;
  }
};
export default Mutation;
