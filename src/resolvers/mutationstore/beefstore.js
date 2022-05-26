import BeefStore from "../../models/Beefstore/beefstore";

const Mutation = {
  createBeefStore: async (parent, args, { userId }, info) => {
    const store = await BeefStore.create({
      ...args,
    });
  },
};
export default Mutation;
