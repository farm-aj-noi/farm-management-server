import RequestExport from "../../models/Beefstore/requestexport";
import dayjs from "dayjs";

const Mutation = {
    createRequestExport: async (parent, args, { userId }, info) => {

        if (!args.name || !args.beef || args.quantity) {
            throw new Error("Please provide all required fields.");
        }  

        const date = dayjs()

        return RequestExport.create({
            name: args.name,
            beef : args.beef,
            quantity: args.quantity,
            requestdate: date,
        });
    },

    deleteRequest: async (parent, args, { userId }, info) => {
        const { id } = args;

        const request = await RequestExport.findByIdAndDelete(id);

        return request;
    },

}
export default Mutation