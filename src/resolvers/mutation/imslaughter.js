import dayjs from "dayjs";

import User from "../../models/user";
import Imslaughter from "../../models/imslaughter";
import Halve from "../../models/halve";
import Beeftype from "../../models/beeftype";
import Setting from "../../models/setting";
import Importcowfarm from  "../../models/importcowfarm"
const Mutation = {

  

  // รับเข้า
  createCow: async (parent, args, { userId }, info) => {
    // Check if user logged in
    if (!userId) throw new Error("Please log in.");
    console.log(args);

    if (
      !args.numcow ||
      !args.numkun ||
      !args.pun ||
      !args.numfarmer ||
      !args.passport ||
      !args.teeth ||
      !args.rfid ||
      !args.bodyscore ||
      !args.namefarmer ||
      !args.date ||
      !args.datebirhtday ||
      !args.namecow ||
      !args.sex ||
      !args.weightstart ||
      !args.group ||
      !args.district ||
      !args.province ||

      !args.weightbirht 
    ) {
      throw new Error("Please provide all required fields.");
    }

    const currentNumkun = await Imslaughter.find({});
    const isCodeExist =
      currentNumkun.findIndex((prod) => prod.numkun === args.numkun) > -1;

    if (isCodeExist) {
      throw new Error("รหัสซ้ำ");
    }

    // ทดสอบนำเข้า
    // console.log(args.date + "....." + args.datebirhtday)
    const date = dayjs()
    // console.log(date)
    const datebirhtday = dayjs(args.datebirhtday);

    // console.log(date + "....." + datebirhtday)

    const imslaughter = await Imslaughter.create({
      numcow: args.numcow,
      numkun: args.numkun,
      pun: args.pun,
      numfarmer: args.numfarmer,
      passport: args.passport,
      teeth: args.teeth,
      rfid: args.rfid,
      bodyscore: args.bodyscore,
      namefarmer: args.namefarmer,
      namecow: args.namecow,
      sex: args.sex,
      weightstart: args.weightstart,
      weightbirht: args.weightbirht,
      statuscow: args.statuscow,
      imagecow: args.imagecow,
      date: date,
      datebirhtday: datebirhtday,
      user: userId,
      group: args.group,
      district: args.district,
      province: args.province,

      statusIm: "5f0fdb6502b40c2ab8506565"

    });

    const user = await User.findById(userId);
    if (!user.imslaughters) {
      user.imslaughters = [imslaughter];
    } else {
      user.imslaughters.push(imslaughter);
    }
    await user.save();

    return Imslaughter.findById(imslaughter.id)
      .populate({
        path: "user",
        populate: { path: "imslaughters" },
      })
      .populate({
        path: "statusIm",
      })
      .populate({
        path: "statusCa",
      })
      .populate({
        path: "statusEn",
      });
  },

  deletecow: async (parent, args, { userId }, info) => {
    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    // Delete Beeftype
    const deletecow = await Imslaughter.findByIdAndDelete(args.id);

    return deletecow;
  },
  
  createImslaughter: async (parent, args, { userId }, info) => {
    // Check if user logged in
    if (!userId) throw new Error("Please log in.");

    if (
      !args.numcow ||
      !args.numkun ||
      !args.pun ||
      !args.numfarmer ||
      !args.namefarmer
    ) {
      throw new Error("Please provide all required fields.");
    }

    const statusImId = "5f0fdb4b02b40c2ab8506563";
    const statusCaId = "5f0fdb7b02b40c2ab8506566";
    const statusEnId = "5f0fdba202b40c2ab8506568";

    // ทดสอบนำเข้า
    const importDateNow = dayjs().toISOString();

    const imslaughter = await Imslaughter.create({

      ...args,
      importDate: importDateNow,
      statusIm: statusImId,
      statusCa: statusCaId,
      statusEn: statusEnId,
      user: userId,
    });
    // if (!imslaughter) {
    //   imslaughter.statuscow = 'โคเตรียมเชือด'
    // } else {
    //   imslaughter.statuscow = 'โคเตรียมเชือด'
    // }
    // await imslaughter.save();

    const user = await User.findById(userId);
    if (!user.imslaughters) {
      user.imslaughters = [imslaughter];
    } else {
      user.imslaughters.push(imslaughter);
    }
    await user.save();

    // const statusIm = await Status.findById(statusImId);
    // if (!statusIm.imslaughterIm) {
    //   statusIm.imslaughterIm = [imslaughter];
    // } else {
    //   statusIm.imslaughterIm.push(imslaughter);
    // }
    // await statusIm.save();

    // const statusCa = await Status.findById(statusCaId);
    // if (!statusCa.imslaughterCa) {
    //   statusCa.imslaughterCa = [imslaughter];
    // } else {
    //   statusCa.imslaughterCa.push(imslaughter);
    // }
    // await statusCa.save();

    // const statusEn = await Status.findById(statusEnId);
    // if (!statusEn.imslaughterEn) {
    //   statusEn.imslaughterEn = [imslaughter];
    // } else {
    //   statusEn.imslaughterEn.push(imslaughter);
    // }
    // await statusEn.save();

    return Imslaughter.findById(imslaughter.id)
      .populate({
        path: "user",
        populate: { path: "imslaughters" },
      })
      .populate({
        path: "statusIm",
      })
      .populate({
        path: "statusCa",
      })
      .populate({
        path: "statusEn",
      });
  },
  updateImslaughter: async (parent, args, { userId }, info) => {
    const { id, weight, price } = args;

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    const prestatusImId = "5f0fdb4b02b40c2ab8506563";
    const prestatusCaId = "5f0fdb7b02b40c2ab8506566";
    const prestatusEnId = "5f0fdba202b40c2ab8506568";

    const imslaughter = await Imslaughter.findById(id);
    if (weight && imslaughter.statusIm.toString() === prestatusImId) {
      const statusImId = "5f0fdb6502b40c2ab8506565";
      const importDate = dayjs().toISOString();
      const importslaughterDate = dayjs()
        .startOf("h")
        .add(1, "day")
        .toISOString();
      // Form updated information
      const updateInfo = {
        weight: !!weight ? weight : imslaughter.weight,
        price: !!price ? price : imslaughter.price,
        statusIm: !!statusImId ? statusImId : imslaughter.statusIm,
        importDate: !!importDate ? importDate : imslaughter.importDate,
        importslaughterDate: !!importslaughterDate
          ? importslaughterDate
          : imslaughter.importslaughterDate,
      };

      await Imslaughter.findByIdAndUpdate(id, updateInfo);
    }
    if (weight && imslaughter.statusIm.toString() !== prestatusImId) {
      // Form updated information
      const updateInfo = {
        weight: !!weight ? weight : imslaughter.weight,
        price: !!price ? price : imslaughter.price,
      };

      // Update product in database
      await Imslaughter.findByIdAndUpdate(id, updateInfo);
    }

    // Find the updated Product
    const updatedFinish = await Imslaughter.findById(id)
      .populate({
        path: "user",
        populate: { path: "imslaughters" },
      })
      .populate({
        path: "statusIm",
      })
      .populate({
        path: "statusCa",
      })
      .populate({
        path: "statusEn",
      });

    return updatedFinish;
  },





  updateImslaughterStatusCa: async (parent, args, { userId }, info) => {
    const { id } = args;

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    const statusCaId = "5f0fdb8b02b40c2ab8506567";

    // Update product in database
    await Imslaughter.findByIdAndUpdate(id, { statusCa: statusCaId });

    // Find the updated Product
    const updatedFinish = await Imslaughter.findById(id)
      .populate({
        path: "user",
        populate: { path: "imslaughters" },
      })
      .populate({
        path: "statusIm",
      })
      .populate({
        path: "statusCa",
      })
      .populate({
        path: "statusEn",
      });

    return updatedFinish;
  },
  updateImslaughterStatusEn: async (parent, args, { userId }, info) => {
    const { id } = args;

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    const statusEnId = "5f0fdbb402b40c2ab8506569";

    // Update product in database
    await Imslaughter.findByIdAndUpdate(id, { statusEn: statusEnId });

    // Find the updated Product
    const updatedFinish = await Imslaughter.findById(id)
      .populate({
        path: "user",
        populate: { path: "imslaughters" },
      })
      .populate({
        path: "statusIm",
      })
      .populate({
        path: "statusCa",
      })
      .populate({
        path: "statusEn",
      });

    return updatedFinish;
  },
  updateGrade: async (parent, args, { userId }, info) => {
    const { id, grade } = args;

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    if (!id || !grade) {
      throw new Error("Please provide all required fields.");
    }

    // Update  in database
    await Imslaughter.findByIdAndUpdate(id, { grade: grade });

    // Find the updated Product
    const updatedFinish = await Imslaughter.findById(id)
      .populate({
        path: "user",
        populate: { path: "imslaughters" },
      })
      .populate({
        path: "statusIm",
      })
      .populate({
        path: "statusCa",
      })
      .populate({
        path: "statusEn",
      });

    return updatedFinish;
  },



  
  deleteGrade: async (parent, args, { userId }, info) => {
    const { id } = args;

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    if (!id) {
      throw new Error("Please provide all required fields.");
    }

    // Update  in database
    await Imslaughter.findByIdAndUpdate(id, { grade: null });

    // Find the updated Product
    const updatedFinish = await Imslaughter.findById(id)
      .populate({
        path: "user",
        populate: { path: "imslaughters" },
      })
      .populate({
        path: "statusIm",
      })
      .populate({
        path: "statusCa",
      })
      .populate({
        path: "statusEn",
      });

    return updatedFinish;
  },
  updateFees: async (parent, args, { userId }, info) => {
    const { id, fees } = args;

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    // Update  in database
    if (fees === 0) {
      await Imslaughter.findByIdAndUpdate(id, { fees: 0 });
    } else {
      await Imslaughter.findByIdAndUpdate(id, { fees: fees });
    }

    // Find the updated Product
    const updatedFinish = await Imslaughter.findById(id)
      .populate({
        path: "user",
        populate: { path: "imslaughters" },
      })
      .populate({
        path: "statusIm",
      })
      .populate({
        path: "statusCa",
      })
      .populate({
        path: "statusEn",
      });

    return updatedFinish;
  },
  toSlaughter: async (parent, args, { userId }, info) => {
    const { id, importDate } = args;

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    const imslaughter = await Imslaughter.findById(id);

    // if (sendAt){
    //   sentAtnew = dayjs(sendAt)
    // }
    const importDatenew = dayjs(importDate);

    const statusImId = "5f0fdb4b02b40c2ab8506563";
    const statusCaId = "5f0fdb7b02b40c2ab8506566";
    const statusEnId = "5f0fdba202b40c2ab8506568";

    const updateInfo = {
      importDate: !!importDatenew ? importDatenew : imslaughter.importDate,
      statusIm: statusImId,
      statusCa: statusCaId,
      statusEn: statusEnId,
    };

    // Update product in database
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
      })
      .populate({
        path: "statusCa",
      })
      .populate({
        path: "statusEn",
      });

    return updatedFinish;
  },

  updateStatustreat: async (parent, args, { userId }, info) => {
    const { id , statuscow} = args;

    // TODO: Check if user logged in
    // if (!userId) throw new Error("Please log in.");
 


    // Update product in database
    await Imslaughter.findByIdAndUpdate(id, statuscow);

    // Find the updated Product
    const updatedFinish = await Imslaughter.findById(id)
      .populate({
        path: "user",
        populate: { path: "imslaughters" },
      })
      .populate({
        path: "statusIm",
      })
      .populate({
        path: "statusCa",
      })
      .populate({
        path: "statusEn",
      });

    return updatedFinish;
  },

  updateCow: async (parent, args, { userId }, info) => {
    const { id, numkun,
      numcow,
      namecow,
      pun,
      weightstart,
      numfarmer

    } = args;


    const updateInfo = {
      numkun: numkun ,
      numcow: numcow,
      namecow: namecow,
      pun: pun,
      weightstart: weightstart,
      numfarmer: numfarmer
    };

    await Imslaughter.findByIdAndUpdate (id ,     { 
         numkun: numkun ,
         numcow: numcow,
         namecow: namecow,
         pun: pun,
         weightstart: weightstart,
         numfarmer: numfarmer
       });
    const updatedFinish = await Imslaughter.findById(id)
      .populate({
        path: "user",
        populate: { path: "imslaughters" },
      })
      .populate({
        path: "statusIm",
      })
      .populate({
        path: "statusCa",
      })
      .populate({
        path: "statusEn",
      });

    return updatedFinish;
  },


  importcowfarm: async (parent, args, { userId }, info) => {

     console.log(args)
    if (!userId) throw new Error("Please log in.");
    console.log(args);

    // const currentNumkun = await Imslaughter.find({});
    // const isCodeExist =
    //   currentNumkun.findIndex((prod) => prod.numkun === args.numkun) > -1;

    // if (isCodeExist) {
    //   throw new Error("รหัสซ้ำ");
    // }

    // ทดสอบนำเข้า
    // console.log(args.date + "....." + args.datebirhtday)
    const date = dayjs()
    // console.log(date)
    const datebirhtday = dayjs(args.datebirhtday);

    // console.log(date + "....." + datebirhtday)

    const importcowfarm = await Importcowfarm.create({
      // numcow: args.numcow,
      // numkun: args.numkun,
      pun: args.pun,
      numfarmer: args.numfarmer,
      passport: args.passport,
      teeth: args.teeth,
      // rfid: args.rfid,
      bodyscore: args.bodyscore,
      namefarmer: args.namefarmer,
      namecow: args.namecow,
      sex: args.sex,
      weightstart: args.weightstart,
      weightbirht: args.weightbirht,
      // statuscow: args.statuscow,
      imagecow: args.imagecow,
      date: date,
      datebirhtday: datebirhtday,
      user: userId,
      district: args.district,
      province: args.province,
      amphur:args.amphur,
      zipcode: args.zipcode,

      statusIm: "605af3da9c7419287cdb3138"

    });
    const user = await User.findById(userId);
    if (!user.importcowfarms) {
      user.importcowfarms = [importcowfarm];
    } else {
      user.importcowfarms.push(importcowfarm);
    }
    await user.save();

    return Importcowfarm.findById(importcowfarm.id)
      .populate({
        path: "user",
        populate: { path: "importcowfarms" },
      })
      .populate({
        path: "statusIm",
      })
     
  },

  updatecowfarm: async (parent, args, { userId }, info) => {
    const { id } = args;

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    const statusImId = "6061d400a8f9ea2bc848608a";

    // Update product in database
    await Importcowfarm.findByIdAndUpdate(id, { statusIm: statusImId });

    // Find the updated Product
    const updatedFinish = await Importcowfarm.findById(id)
      .populate({
        path: "user",
        populate: { path: "importcowfarm" },
      })
      .populate({
        path: "statusIm",
      })
      
    return updatedFinish;
  },
};

export default Mutation;
