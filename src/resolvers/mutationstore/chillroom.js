import Chillroom from "../../models/Beefstore/chillroom";

const Mutation = {
  creatChillroom: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.roomnum) {
      throw new Error("Please provide required field.");
    }

    const currentRoom = await Chillroom.find();
    const isRoomExist =
      currentRoom.findIndex((prod) => prod.roomnum == args.roomnum) > -1;

    if (isRoomExist) {
      throw new Error("ห้องคุณซ้ำ");
    }

    const chillrooms = await Chillroom.create({
      ...args,
    });

    return Chillroom.findById(chillrooms.id);
  },

  deleteChillroom: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    const deletechillroom = await Chillroom.findByIdAndDelete(args.id);

    return deletechillroom;
  },
};
export default Mutation;
