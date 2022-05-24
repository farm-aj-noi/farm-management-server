import RequestExport from "../../models/Beefstore/requestexport";
import dayjs from "dayjs";
import Beeftype from "../../models/beeftype";

const Mutation = {
    createRequestExport: async (parent, args, { userId }, info) => {

        if (!args.name || !args.beeftype || !args.quantity) {
            throw new Error("Please provide all required fields.");
        }  

        const date = dayjs()


        const beeftype = await Beeftype.findById(args.beeftype)

        const req = await RequestExport.create({
            name: args.name,
            beeftype : beeftype,
            quantity: args.quantity,
            requestdate: date,
        });

        let data = RequestExport.findById(req.id)
        .populate({
            path: "beeftype"
        })

        return data;
    },

    deleteRequest: async (parent, args, { userId }, info) => {
        const { id } = args;

        const request = await RequestExport.findByIdAndDelete(id);

        return request;
    },

}
export default Mutation