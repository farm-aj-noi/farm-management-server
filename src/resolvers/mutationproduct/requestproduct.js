import RequestProduct from "../../models/Productstore/requestproduct";
import Beeftype from "../../models/beeftype";
import Status from "../../models/status";
import dayjs from "dayjs";

const Mutation = {
  createRequestProduct: async (parent, args, context, info) => {
    if (!args.name || !args.beeftype || !args.typemeat) {
      throw new Error("Please provide all required fields.");
    }

    const date = dayjs();

    const beeftype = await Beeftype.findById(args.beeftype);
    const status = await Status.findById("62821d931768cd521052118b");

    const req = await RequestProduct.create({
      name: args.name,
      typemeat: args.typemeat,
      beeftype: beeftype,
      status: status,
      requestdate: date,
    });

    let data = RequestProduct.findById(req.id)
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "status",
      });

    return data;
  },

  updateRequestProduct: async (parent, args, context, info) => {
    const { id } = args;

    const statusChange = "62b95adc1b771c3d8ae74a05";

    await RequestProduct.findByIdAndUpdate(id, { status: statusChange });

    const updateInfo = await RequestProduct.findById(id).populate({
      path: "status",
    });
    return updateInfo;
  },

  deleteRequestProduct: async (parent, args, context, info) => {
    const { id } = args;

    const request = await RequestProduct.findByIdAndDelete(id);

    return request;
  }
};
export default Mutation;
