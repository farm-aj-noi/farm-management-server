import Typekeep2 from "../../models/Productstore/typekeep2";
import Freezer from "../../models/Productstore/freezer";
import Producttype from "../../models/Productstore/producttype";

const Mutation = {
  createTypekeep2: async (parent, args, { userId }, info) => {
    if (!args.totalproduct || !args.producttype || !args.freezer) {
      throw new Error("กรุณากรอกข้อมูลให้ครบ");
    }

    const producttype = await Producttype.findById(args.producttype);

    const findfreezer = await Freezer.findById(args.freezer);

    const keep = await Typekeep2.create({
      totalproduct: args.totalproduct,
      producttype: producttype,
      freezer: findfreezer,
    });

    const freezer = await Freezer.findById(args.freezer);
      if (!freezer.typekeep2) {
        freezer.typekeep2 = [keep];
      } else {
        freezer.typekeep2.push(keep);
      }
      await freezer.save();

      let test = await Typekeep2.findById(keep.id)
      .populate({
        path: "producttype",
      })
      .populate({
        path: "freezer",
      });
    return test;
  },

  deletetypekeep2: async (parent, args, { userId }, info) => {
    const type = await Typekeep2.findById(args.id);

    
      const freezer = await Freezer.findOne({ typekeep2: args.id });
      const freezers = freezer.id;

      let r = await Freezer.findByIdAndUpdate(
        {
          _id: freezers,
        },
        { $pull: { typekeep2: type.id } }
      );
    

    const deletetype = await Typekeep2.findByIdAndDelete(type);
    return deletetype;
  },

  uppdatetypekeep2: async (parent, args, { userId }, info) => {
    const { id, totalproduct } = args;

    const typekeep2 = await Typekeep2.findById(id);

    const updateInfo = {
      totalproduct: !!totalproduct ? totalproduct : typekeep2.totalproduct,
    };

    await Typekeep2.findByIdAndUpdate(id, updateInfo);

    const updatedFinish = await Typekeep2.findById(id);
    return updatedFinish;
  },
};
export default Mutation;
