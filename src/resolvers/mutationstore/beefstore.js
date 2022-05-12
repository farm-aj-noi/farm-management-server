import BeefStore from "../../models/Beefstore/beefstore";
import Halve from "../../models/halve";
import Quarter from "../../models/quarter";
import Lump from "../../models/lump";
import Chop from "../../models/chop";
import Entrail from "../../models/entrail";

const Mutation = {
    createBeefStore: async (parent, args, { userId }, info) => {
        
        const store = await BeefStore.create({
            ...args,
        })

        
    }
};
export default Mutation