import Chillday from "../../models/Beefstore/chillday";

const Mutation = {
  createChillday: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.day) {
      throw new Error("Please provide all required fields.");
    }

    return await Chillday.create({
      day: args.day,
    });
  },
  deleteChillday: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    const deletechillday = await Chillday.findByIdAndDelete(args.id);

    return deletechillday;
  },
};
export default Mutation;
