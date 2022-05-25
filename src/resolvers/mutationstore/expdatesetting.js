import ExpdateSetting from "../../models/Beefstore/expdatesetting";

const Mutation = {
    createExpdatesetting: async (parent, args, { userId }, info) => {
        if (!userId) throw new Error("Please log in.");

        if (!args.totalday) {
            throw new Error("Please provide all required fields.");
          }

        return await ExpdateSetting.create({
            totalday: args.totalday
        });
    },


}
export default Mutation;