import Unit from "../../../models/Productstore/unit";
import Producttype from "../../../models/Productstore/producttype";

const Query = {
  listunit: async (parent, args, context, info) => {
    const cursor = await Unit.find({});
    return cursor;
  },

  allproducttype: async (parent, args, context, info) => {
    const cursor = await Producttype.find({})
    .populate({
        path: "unit",
    })
    return cursor;
  },
  
};
export default Query;
