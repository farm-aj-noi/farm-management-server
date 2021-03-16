import dayjs from "dayjs";

import DataCow from "../../modelsregister/datacow";

const Mutation = {
  createDatacow: async (parent, args, { userId }, info) => {
    // Check if user logged in
    // if (!userId) throw new Error("Please log in.");

    if (
      !args.numkun ||
      !args.numcow 
    ) {
      throw new Error("Please provide all required fields.");
    }

    // ทดสอบนำเข้า

    const datacow = await DataCow.create({
      numcow: args.numcow,
      numkun: args.numkun,
    
    });
    // console.log(chop);

    // const imslaughter = await Imslaughter.findById(args.imslaughter);
    // if (!imslaughter.treats) {
    //   imslaughter.treats = [treat];
    // } else {
    //   imslaughter.treats.push(treat);
    // }
    // await imslaughter.save();

    return DataCow.findById(datacow.id)
  },
};

export default Mutation;
