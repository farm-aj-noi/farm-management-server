import TotalExpdate from "../../models/Beefstore/totalexpdate";

const Mutation = {
  createTotalExp: async (parent, args, { userId }, info) => {
    if (!args.totalday) {
      throw new Error("Please provide all required fields.");
    }

    return await TotalExpdate.create({
      totalday: args.totalday,
    });
  },
};
export default Mutation;
