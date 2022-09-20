import RequestExport from "../../models/Beefstore/requestexport";
import dayjs from "dayjs";
import Beeftype from "../../models/beeftype";
import Status from "../../models/status";

const Mutation = {
  createRequestExport: async (parent, args, { userId }, info) => {
    if (!args.name || !args.beeftype || !args.quantity || !args.status) {
      throw new Error("Please provide all required fields.");
    }

    const date = dayjs();

    const beeftype = await Beeftype.findById(args.beeftype);
    const status = await Status.findById(args.status);

    const req = await RequestExport.create({
      name: args.name,
      beeftype: beeftype,
      status: status,
      quantity: args.quantity,
      requestdate: date,
    });

    let data = RequestExport.findById(req.id).populate({
      path: "beeftype",
    });

    return data;
  },

  deleteRequest: async (parent, args, { userId }, info) => {
    const { id } = args;

    const request = await RequestExport.findByIdAndDelete(id);

    return request;
  },

  updateRequestB: async (parent, args, { userId }, info) => {
    const { id } = args;

    const statusChange = "63299201e09fd895642f3cab";

    await RequestExport.findByIdAndUpdate(id, { status: statusChange });

    const updateInfo = await RequestExport.findById(id).populate({
      path: "status",
    });
    return updateInfo;
  },
};
export default Mutation;
