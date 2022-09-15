import ReportSet from "../../models/Beefstore/reportset";

const Mutation = {
  createReportSet: async (parent, args, { userId }, info) => {
    const reportset = await ReportSet.create({
      logo: args.logo,
      address: args.address,
    });
    return reportset;
  },
};
export default Mutation;
