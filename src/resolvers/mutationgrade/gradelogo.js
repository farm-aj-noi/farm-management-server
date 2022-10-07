import GradeLogo from "../../models/Grade/gradelogo";

const Mutation = {
    CreateGradeLogo: async (parent, args, { userId }, info) => {
    const reportset = await GradeLogo.create({
      logo: args.logo,
      address: args.address,
    });
    return reportset;
  },

  updateGradeLogo: async (parent, args, { userId }, info) => {
    const { logo, address } = args;

    const logoupdate = await GradeLogo.findById("633ff0b0fcadce56d02bd068");

    const updateInfo = {
      logo: !!logo ? logo : logoupdate.logo,
      address: !!address ? address : logoupdate.address,
    };

    await GradeLogo.findByIdAndUpdate("633ff0b0fcadce56d02bd068", updateInfo)
    const updatedFinish = await GradeLogo.findById("633ff0b0fcadce56d02bd068");
    return updatedFinish;
  },
};
export default Mutation;
