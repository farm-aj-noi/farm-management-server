import Producttype from "../../models/Productstore/producttype";
import Unit from "../../models/Productstore/unit";

const Mutation = {
  createProducttype: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.code || !args.nameTH || !args.nameEN || !args.unit) {
      throw new Error("Please provide all required fields.");
    }

    const currentProducttype = await Producttype.find({});
    const isCodeExist =
      currentProducttype.findIndex((prod) => prod.code === args.code) > -1;

    if (isCodeExist) {
      throw new Error("รหัสซ้ำ");
    }

    const unit = await Unit.findById(args.unit);

    const producttype = await Producttype.create({
      code: args.code,
      nameTH: args.nameTH,
      nameEN: args.nameEN,
      BBE: args.BBE,
      unit: unit,
    });

    let product = await Producttype.findById(producttype.id).populate({
      path: "unit",
    });
    return product
  },

  updateProducttype: async (parent, args, { userId }, info) => {
    const { id, code, nameTH, nameEN, BBE } = args;

    if (!userId) throw new Error("Please log in.");
    const producttype = await Producttype.findById(id);

    const currentProducttype = await Producttype.find({});
    const isCodeExist =
      currentProducttype.findIndex((prod) => prod.code === code) > -1;

    if (isCodeExist && producttype.code !== code) {
      throw new Error("รหัสซ้ำ");
    }

    const updateInfo = {
      code: !!code ? code : producttype.code,
      nameTH: !!nameTH ? nameTH : producttype.nameTH,
      nameEN: !!nameEN ? nameEN : producttype.nameEN,
      BBE: !!BBE ? BBE : producttype.BBE,
    };

    await Producttype.findByIdAndUpdate(id, updateInfo);

    const updatedFinish = await Producttype.findById(id);

    return updatedFinish;
  },
  deleteProducttype: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    const deleteProducttype = await Producttype.findByIdAndDelete(args.id);

    return deleteProducttype;
  },
};
export default Mutation;
