import Drug from '../../../models/Raise/drug'

const Mutation = {
  createDrug: async (parent, args, { userId }, info) => {

    if (!args.name || args.nofity < 0) {
      throw new Error("Please provide all required fields.");
    }

    const drug = await Drug.create({
      ...args
    });

    return Drug.findById(drug.id)
  },
  
  deleteDrug: async (parent, args, { userId }, info) => {
    // TODO: Check if user logged in
    // if (!userId) throw new Error("Please log in.");

    // Delete Beeftype
    const drug = await Drug.findByIdAndDelete(args.id);

    return drug;
  },
};

export default Mutation;
