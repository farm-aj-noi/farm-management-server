import ReportSet from "../../models/Beefstore/reportset";

const Mutation = {
  createReportSet: async (parent, args, { userId }, info) => {
    const reportset = await ReportSet.create({
      logo: args.logo,
      address: args.address,
    });
    return reportset;
  },

  updateLogo: async (parent, args, { userId }, info) => {
    const { logo, address } = args;

    const logoupdate = await ReportSet.findById("632552264a989456302bd417");

    const updateInfo = {
      logo: !!logo ? logo : logoupdate.logo,
      address: !!address ? address : logoupdate.address,
    };

    await ReportSet.findByIdAndUpdate("632552264a989456302bd417", updateInfo)
    const updatedFinish = await ReportSet.findById("632552264a989456302bd417");
    return updatedFinish;
  },
};
export default Mutation;
