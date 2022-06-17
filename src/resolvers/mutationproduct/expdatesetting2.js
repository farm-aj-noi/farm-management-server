import ExpdateSetting2 from "../../models/Productstore/expdatesetting2";

const Mutation = {
  createExpdatesetting2: async (parent, args, { userId }, info) => {

    return await ExpdateSetting2.create({
      ...args,
    });
  },

  updateExpdatesetting2: async (parent, args, { userId }, info) => {
    const { day } = args;

    const totalday = await ExpdateSetting2.findById(args.id);

    const updateInfo = {
      day: !!day ? day : totalday.day,
    };

    await ExpdateSetting2.findByIdAndUpdate(args.id, updateInfo);

    const updatedFinish = await ExpdateSetting2.findById(args.id);
    return updatedFinish;
  },
};
export default Mutation;
