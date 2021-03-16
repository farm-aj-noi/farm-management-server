import Disease from '../../../models/Raise/disease'

const Mutation = {
  createDisease: async (parent, args, { userId }, info) => {

    if (!args.name || !args.detail) {
      throw new Error("Please provide all required fields.");
    }

    const disease = await Disease.create({
      ...args,
    });

    return Disease.findById(disease.id)
  },
};

export default Mutation;
