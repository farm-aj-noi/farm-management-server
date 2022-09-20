import RequestExportP from "../../models/Productstore/requestexportp";
import Status from "../../models/status";
import dayjs from "dayjs";
import Producttype from "../../models/Productstore/producttype";

const Mutation = {
  createRequestExportP: async (parent, args, { userId }, info) => {
    // if (!args.name || !args.producttype || !args.quantity || !args.status) {
    //   throw new Error("Please provide all required fields.");
    // }

    const date = dayjs();

    const producttype = await Producttype.findById(args.producttype);
    const status = await Status.findById(args.status);

    const req = await RequestExportP.create({
      name: args.name,
      producttype: producttype,
      status: status,
      quantity: args.quantity,
      requestdate: date,
    });

    let data = RequestExportP.findById(req.id)
      .populate({
        path: "producttype",
      })
      .populate({
        path: "status",
      });

    return data;
  },

  deleteRequestP: async (parent, args, { userId }, info) => {
    const { id } = args;

    const request = await RequestExportP.findByIdAndDelete(id);

    return request;
  },

  updateRequestP: async (parent, args, { userId }, info) => {
    const { id } = args;

    const statusChange = "63299201e09fd895642f3cab";

    await RequestExportP.findByIdAndUpdate(id, { status: statusChange });

    const updateInfo = await RequestExportP.findById(id).populate({
      path: "status",
    });
    return updateInfo;
  },
};
export default Mutation;
