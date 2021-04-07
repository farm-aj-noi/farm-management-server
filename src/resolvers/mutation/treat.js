import dayjs from "dayjs";

import User from "../../models/user";
import Imslaughter from "../../models/imslaughter";
import Chop from "../../models/chop";
import Lump from "../../models/lump";
import Beeftype from "../../models/beeftype";
import Setting from "../../models/setting";
import Counter from "../../models/identitycounter";
import Treat from "../../models/treat";
import PunType from "../../models/puntype"
import Foodset from "../../models/foodset"

const Mutation = {
  createTreat: async (parent, args, { userId }, info) => {
    // Check if user logged in
    if (!userId) throw new Error("Please log in.");

    if (
      !args.datet ||
      !args.dise ||
      !args.symptom ||
      !args.medi ||
      !args.quantity ||
      !args.imslaughter
    ) {
      throw new Error("Please provide all required fields.");
    }

    // ทดสอบนำเข้า
    const date = dayjs(args.datet).toISOString();

    const treat = await Treat.create({
      datet: date,
      dise: args.dise,
      symptom: args.symptom,
      medi: args.medi,
      nofity: args.nofity,
      quantity: args.quantity,
      note: args.note,
      imslaughter: args.imslaughter,
    });
    // console.log(chop);

    const imslaughter = await Imslaughter.findById(args.imslaughter);
    if (!imslaughter.treats) {
      imslaughter.treats = [treat];
      imslaughter.statuscow = 'กำลังรักษา'
      imslaughter.statusIm = "5ff2e44a74a6e82d00686276"

    } else {
      imslaughter.statuscow = 'กำลังรักษา'
      imslaughter.statusIm = "5ff2e44a74a6e82d00686276"
      imslaughter.treats.push(treat);
    }
    await imslaughter.save();

    return Treat.findById(treat.id).populate({
      path: "imslaughter",
    });
  },
  createPun: async (parent, args, { userId }, info) => {
    // Check if user logged in
    // if (!userId) throw new Error("Please log in.");
    const puntype = await PunType.create({
      name: args.name,
      numpun: args.numpun
    
    });
    return PunType.findById(puntype.id)
    PunType
  },
  createFoodset: async (parent, args, { userId }, info) => {
    // Check if user logged in
    // if (!userId) throw new Error("Please log in.");
    const foodset = await Foodset.create({
      name: args.name,
      CP: args.CP,
      TDN:args.TDN,
      type:args.type
    });
    return Foodset.findById(foodset.id)
    
  },
  updateFoodset: async (parent, args, { userId }, info) => {
    const { id, name , CP , TDN ,type } = args;

    // const imslaughter = await Dayslaugh.findById(id);

    // Update product in database
    await Foodset.findByIdAndUpdate(id, {name:name , CP:CP , TDN:TDN ,type:type});

    const updatedFinish = await Foodset.findById(id)

    return updatedFinish;
  },
  deletePun: async (parent, args, { userId }, info) => {
    // TODO: Check if user logged in
    // if (!userId) throw new Error("Please log in.");

    // Delete Beeftype
    const puntype = await PunType.findByIdAndDelete(args.id);

    return puntype;
  },

  updateTstatus: async (parent, args, { userId }, info) => {
      const { id, statuscow } = args;
  
      // TODO: Check if user logged in
      // if (!userId) throw new Error("Please log in.");
  
      const imslaughter = await Imslaughter.findById(id);

      const statusImId = "5f0fdb6502b40c2ab8506565";
      const updateInfo = {
        statusIm: statusImId,
        statuscow:"กำลังขุน"
      };
      await Imslaughter.findByIdAndUpdate(id, updateInfo);
      // await Halve.findByIdAndUpdate(id, {sendAt:null});
  
      // Find the updated Product
      const updatedFinish = await Imslaughter.findById(id)
        .populate({
          path: "user",
          populate: { path: "imslaughters" },
        })
        .populate({
          path: "statusIm",
        });
  
      return updatedFinish;
      }
      ,
      updateDead: async (parent, args, { userId }, info) => {
        const { id ,importDateDead,notedead} = args;
        const importDatenew = dayjs(importDateDead);

        // TODO: Check if user logged in
        // if (!userId) throw new Error("Please log in.");
    
        const imslaughter = await Imslaughter.findById(id);
  
        const statusImId = "601f968a8443a40c74357c2f";
        const updateInfo = {
          importDateDead: !!importDatenew ? importDatenew : imslaughter.importDateDead,
          statusIm: statusImId,
          statuscow:"ตาย",
          notedead:notedead
        };
        await Imslaughter.findByIdAndUpdate(id, updateInfo);
        // await Halve.findByIdAndUpdate(id, {sendAt:null});
    
        // Find the updated Product
        const updatedFinish = await Imslaughter.findById(id)
          .populate({
            path: "user",
            populate: { path: "imslaughters" },
          })
          .populate({
            path: "statusIm",
          });
    
        return updatedFinish;
        },

};

export default Mutation;
