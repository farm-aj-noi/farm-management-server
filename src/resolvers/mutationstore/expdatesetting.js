import ExpdateSetting from "../../models/Beefstore/expdatesetting";

const Mutation = {
  createExpdatesetting: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    return await ExpdateSetting.create({
      ...args
    });
  },

  updateExpdatesetting: async (parent, args, { userId }, info) => {
    const { dayH, dayQ, dayL, dayC, dayE,} = args;

    const totalexp = await ExpdateSetting.findById(args.id);

    const updateInfo = {
      dayH: !!dayH ? dayH : totalexp.dayH,
      dayQ: !!dayQ ? dayQ : totalexp.dayQ,
      dayL: !!dayL ? dayL : totalexp.dayL,
      dayC: !!dayC ? dayC : totalexp.dayC,
      dayE: !!dayE ? dayE : totalexp.dayE,
    };

    await ExpdateSetting.findByIdAndUpdate(args.id, updateInfo);

    const updatedFinish = await ExpdateSetting.findById(args.id);
    return updatedFinish;

  }
  
};
export default Mutation;
