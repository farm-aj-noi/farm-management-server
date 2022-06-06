import ExpdateSetting2 from "../../models/Productstore/expdatesetting2";

const Mutation = {
  createExpdatesetting2: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.totalday) {
      throw new Error("Please provide all required fields.");
    }

    return await ExpdateSetting2.create({
      totalday: args.totalday,
    });
  },
};
export default Mutation;
