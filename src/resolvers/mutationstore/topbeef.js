import Topbeef from "../../models/Beefstore/topbeef";

const Mutation = {
    createTopbeef: async (parent, args, { userId }, info) => {
      const topbeef = await Topbeef.create({
        ...args,
      });
    },
  };
  export default Mutation;