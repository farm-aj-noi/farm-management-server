import EntrailStore from "../../models/Beefstore/entrailstore";

const Mutation = {
    createEntrailStore: async (parent, args, { userId }, info) => {
        
        const store = await EntrailStore.create({
            ...args,
        })

        
    }
};
export default Mutation