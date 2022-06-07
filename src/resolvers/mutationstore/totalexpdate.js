import TotalExpdate from "../../models/Beefstore/totalexpdate";

const Mutation = {
  createTotalExp: async (parent, args, { userId }, info) => {
    
    return await TotalExpdate.create({
      ...args
    });
  },
};
export default Mutation;
