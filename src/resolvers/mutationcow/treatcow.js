import dayjs from "dayjs";

import Datacow from "../../modelsregister/datacow";

import Datatreat from "../../modelsregister/datatreat";

const Mutation = {
    createDatatreat: async(parent, args, context, info) => {
      const cowId = "5fde46acfc18b7156cca497c"
   if (
       !args.weight ||
       !args.detail 
    ) {
     throw new Error("Please provide all required fields.");
      }
     const datatreat = await Datatreat.create({ ...args,datacow: cowId })
     const datacow = await Datacow.findById(cowId)

      if (!datacow.datatreats){
        datacow.datatreats = [datatreat]
      } else {
        datacow.datatreats.push(datatreat)
      }
      await datacow.save()

      return  Datatreat.findById(datatreat.id).populate({
        path: "datacow",
        populate: {path: "datatreats" }
      })

    }
  // createDatatreat: async (parent, args, { userId }, info) => {
  //   if (
  //     !args.weight ||
  //     !args.detail 
  //   ) {
  //     throw new Error("Please provide all required fields.");
  //   }
  //   const date = dayjs(args.date).toISOString();
  //   const datatreat = await Datatreat.create({
      
  //     weight: args.weight,
  //     detail: args.detail,
  //     datacow:"5fd791ad9636f0325cb147b0"
  //   });
  //   // console.log(chop);
  //   const datacow = await Datacow.findById("5fd791ad9636f0325cb147b0");
  //   if (!datacow.treats) {
  //     datacow.treats = [datatreat];
  //   } else {
  //     datacow.treats.push(datatreat);
  //   }
  //   await datacow.save();

  //   return Datatreat.findById(datatreat.id).populate({
  //     path: "datacow",
  //   });
  // },
};

export default Mutation;
