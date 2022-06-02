import Unit from "../../models/Productstore/unit";

const Mutation = {
    createUnit: async (parent, args, { userId }, info) => {
        if (!args.name) {
            throw new Error("Please provide all required fields.");
        }

        return await Unit.create({
            ...args
        });
    },

}
export default Mutation;