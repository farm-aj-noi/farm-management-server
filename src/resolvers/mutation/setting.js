import Setting from "../../models/setting";

const Mutation = {
  // setting
  createsetting: async (parent, args, { userId }, info) => {
    // Check if user logged in
    if (!userId) throw new Error("Please log in.");

    if (!args.dateResetCount) {
      throw new Error("Please provide all required fields.");
    }
    return Setting.create({
      ...args,
      dateResetCountH: args.dateResetCount,
      dateResetCountQ: args.dateResetCount,
      dateResetCountL: args.dateResetCount,
      dateResetCountC: args.dateResetCount,
      dateResetCountE: args.dateResetCount,
    });
  },
};

export default Mutation;
