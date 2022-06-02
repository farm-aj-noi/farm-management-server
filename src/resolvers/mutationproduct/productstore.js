import ProductStore from "../../models/Productstore/productstore";

const Mutation = {
  createProductstore: async (parent, args, { userId }, info) => {
    const store = await ProductStore.create({
      ...args,
    });
  },
};
export default Mutation;
