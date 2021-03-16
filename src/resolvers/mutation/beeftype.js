
import Beeftype from "../../models/beeftype";

const Mutation = {
  //ประเภทเนื้อ
  createBeeftype: async (parent, args, { userId }, info) => {
    // Check if user logged in
    if (!userId) throw new Error("Please log in.");

    if (!args.code || !args.nameTH || !args.nameEN) {
      throw new Error("Please provide all required fields.");
    }
    const currentBeeftype = await Beeftype.find({});
    const isCodeExist =
    currentBeeftype.findIndex((prod) => prod.code === args.code) > -1;

    if (isCodeExist) {
      throw new Error("รหัสซ้ำ");
    }

    return Beeftype.create({ ...args });
  },
  updateBeeftype: async (parent, args, { userId }, info) => {
    const {
      id,
      code,
      nameTH,
      nameEN,
      BBE,
      priceG2h,
      priceG3,
      priceG3h,
      priceG4,
      priceG4h,
      priceG5,
    } = args;

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");
    const beeftype = await Beeftype.findById(id);

    const currentBeeftype = await Beeftype.find({});
    const isCodeExist =
    currentBeeftype.findIndex((prod) => prod.code === code) > -1;

    if (isCodeExist && beeftype.code !== code) {
      throw new Error("รหัสซ้ำ");
    }


    // Form updated information
    const updateInfo = {
      code: !!code ? code : beeftype.code,
      nameTH: !!nameTH ? nameTH : beeftype.nameTH,
      nameEN: !!nameEN ? nameEN : beeftype.nameEN,
      BBE: !!BBE ? BBE : beeftype.BBE,
      priceG2h: !!priceG2h ? priceG2h : beeftype.priceG2h,
      priceG3: !!priceG3 ? priceG3 : beeftype.priceG3,
      priceG3h: !!priceG3h ? priceG3h : beeftype.priceG3h,
      priceG4: !!priceG4 ? priceG4 : beeftype.priceG4,
      priceG4h: !!priceG4h ? priceG4h : beeftype.priceG4h,
      priceG5: !!priceG5 ? priceG5 : beeftype.priceG5,

    };

    // Update product in database
    await Beeftype.findByIdAndUpdate(id, updateInfo);

    // Find the updated Product
    const updatedFinish = await Beeftype.findById(id)

    return updatedFinish;
  },
  deleteBeeftype: async (parent, args, { userId }, info) => {
    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    // Delete Beeftype
    const deleteBeeftype = await Beeftype.findByIdAndDelete(args.id);

    return deleteBeeftype;
  },
};

export default Mutation;
