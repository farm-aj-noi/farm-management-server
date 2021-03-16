import dayjs from "dayjs";

import User from "../../models/user";
import Imslaughter from "../../models/imslaughter";
import Chop from "../../models/chop";
import Lump from "../../models/lump";
import Beeftype from "../../models/beeftype";
import Setting from "../../models/setting";
import Counter from '../../models/identitycounter'

const Mutation = {
  createChop: async (parent, args, { userId }, info) => {
    // Check if user logged in
    if (!userId) throw new Error("Please log in.");

    if (!args.weight || !args.imslaughter || !args.beeftype || !args.lump) {
      throw new Error("Please provide all required fields.");
    }

    //check count reset
    const SettingResetdate = await Setting.findOne({});
    const chaeckDate = await parseInt(dayjs().format("YYYYMMDD").toString());
    if (SettingResetdate.dateResetCountC < chaeckDate) {
      await Chop.resetCount();
      await Setting.findByIdAndUpdate(SettingResetdate.id, {
        dateResetCountC: chaeckDate,
      });
    }

    const statusId = "5f448d5d4ef8ed48806f1b53";
    const beeftype = await Beeftype.findById(args.beeftype);

    // ทดสอบนำเข้า
    const DateNow = dayjs().toISOString();
    const DateMFG = dayjs().add(beeftype.BBE, "d").toISOString();
    // console.log(DateMFG)

    const chop = await Chop.create({
      ...args,
      BBE: DateMFG,
      MFG: DateNow,
      createdAt: DateNow,
      status: statusId,
      user: userId,
    });
    // console.log(chop);

    //ราคา
    const calprice = await Chop.findById(chop.id)
      .populate({
        path: "imslaughter",
        populate: { path: "chops" },
      })
      .populate({
        path: "lump",
        populate: { path: "chops" },
      });
    // console.log(calprice);
    // console.log(calprice.imslaughter.grade);

    //change main status
    const statusMain = "5f4468e0f226042dc88ef335";
    if (calprice.lump.status !== statusMain) {
      // Update in database
      await Lump.findByIdAndUpdate(calprice.lump.id, { status: statusMain });
    }

    if (calprice.imslaughter.grade === "2") {
      const price = beeftype.priceG2h * calprice.weight;
      await Chop.findByIdAndUpdate(chop.id, { price: price });
    }
    if (calprice.imslaughter.grade === "2.5") {
      const price = beeftype.priceG2h * calprice.weight;
      await Chop.findByIdAndUpdate(chop.id, { price: price });
    }
    if (calprice.imslaughter.grade === "3") {
      const price = beeftype.priceG3 * calprice.weight;
      await Chop.findByIdAndUpdate(chop.id, { price: price });
    }
    if (calprice.imslaughter.grade === "3.5") {
      const price = beeftype.priceG3h * calprice.weight;
      await Chop.findByIdAndUpdate(chop.id, { price: price });
    }
    if (calprice.imslaughter.grade === "4") {
      const price = beeftype.priceG4 * calprice.weight;
      await Chop.findByIdAndUpdate(chop.id, { price: price });
    }
    if (calprice.imslaughter.grade === "4.5") {
      const price = beeftype.priceG4h * calprice.weight;
      await Chop.findByIdAndUpdate(chop.id, { price: price });
    }
    if (calprice.imslaughter.grade === "5") {
      const price = beeftype.priceG5 * calprice.weight;
      await Chop.findByIdAndUpdate(chop.id, { price: price });
    }

    //barcode
    const DateCode = await dayjs().format("YYYYMMDD").toString();

    const checkcount = await Counter.findOne({
      model: "Chop"
    })

    const count = checkcount.count.toString().padStart(4, "0");
    // console.log(beeftype);
    const BeefCode = beeftype.code.toUpperCase().padStart(3, "0");
    const barcodeinput = DateCode + BeefCode + count;
    // console.log(barcodeinput);
    await Chop.findByIdAndUpdate(chop.id, {
      barcode: barcodeinput,
    });

    const user = await User.findById(userId);
    if (!user.chops) {
      user.chops = [chop];
    } else {
      user.chops.push(chop);
    }
    await user.save();

    const imslaughter = await Imslaughter.findById(args.imslaughter);
    if (!imslaughter.chops) {
      imslaughter.chops = [chop];
    } else {
      imslaughter.chops.push(chop);
    }
    await imslaughter.save();

    const lump = await Lump.findById(args.lump);
    if (!lump.chops) {
      lump.chops = [chop];
    } else {
      lump.chops.push(chop);
    }
    await lump.save();

    return Chop.findById(chop.id)
      .populate({
        path: "user",
        populate: { path: "chops" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "imslaughter",
        populate: { path: "chops" },
      })
      .populate({
        path: "lump",
        populate: { path: "chops" },
      });
  },
  deleteChop: async (parent, args, { userId }, info) => {
    const { id } = args;
    // console.log(id + " ---- " + args.id)

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    // Find cart from given id
    const chop = await Chop.findById(id);
    // console.log(lump)
    // console.log(chop.imslaughter)
    const user = await User.findById(userId);
    const imslaughter = await Imslaughter.findById(chop.imslaughter);
    const lump = await Lump.findById(chop.lump);
    // console.log(imslaughter)

    // Delete cart
    const deletedChop = await Chop.findByIdAndDelete(id);
    // console.log(deletedChop)

    // Update user's carts
    const updatedUser = user.chops.filter(
      (chopsId) => chopsId.toString() !== deletedChop.id.toString()
    );
    await User.findByIdAndUpdate(userId, { chops: updatedUser });

    const updatedImslaughter = imslaughter.chops.filter(
      (chopsId) => chopsId.toString() !== deletedChop.id.toString()
    );
    await Imslaughter.findByIdAndUpdate(imslaughter.id, {
      chops: updatedImslaughter,
    });

    const updatedLump = lump.chops.filter(
      (chopsId) => chopsId.toString() !== deletedChop.id.toString()
    );
    await Lump.findByIdAndUpdate(lump.id, { chops: updatedLump });

    return deletedChop;
  },
  // updateLumpSent: async (parent, args, { userId }, info) => {
  //   const { id, sendAt } = args;

  //   // TODO: Check if user logged in
  //   if (!userId) throw new Error("Please log in.");

  //   const lump = await Lump.findById(id);

  //   // if (sendAt){
  //   //   sentAtnew = dayjs(sendAt)
  //   // }
  //   const sentAtnew = dayjs(sendAt);

  //   const updateInfo = {
  //     sendAt: !!sentAtnew ? sentAtnew : lump.sendAt,
  //   };

  //   // Update product in database
  //   await Lump.findByIdAndUpdate(id, updateInfo);
  //   // await Halve.findByIdAndUpdate(id, {sendAt:null});

  //   // Find the updated Product
  //   const updatedFinish = await Lump.findById(id)
  //   .populate({
  //     path: "user",
  //     populate: { path: "lumps" },
  //   })
  //   .populate({
  //     path: "status",
  //   })
  //   .populate({
  //     path: "beeftype",
  //   })
  //   .populate({
  //     path: "imslaughter",
  //     populate: { path: "lumps" },
  //   })
  //   .populate({
  //     path: "quarter",
  //     populate: { path: "lumps" },
  //   })

  //   return updatedFinish;
  // },
  // deleteLumpSent: async (parent, args, { userId }, info) => {
  //   const { id } = args;

  //   // TODO: Check if user logged in
  //   if (!userId) throw new Error("Please log in.");

  //   // Update product in database
  //   await Lump.findByIdAndUpdate(id, {sendAt:null});

  //   // Find the updated Product
  //   const updatedFinish = await Lump.findById(id)
  //   .populate({
  //     path: "user",
  //     populate: { path: "lumps" },
  //   })
  //   .populate({
  //     path: "status",
  //   })
  //   .populate({
  //     path: "beeftype",
  //   })
  //   .populate({
  //     path: "imslaughter",
  //     populate: { path: "lumps" },
  //   })
  //   .populate({
  //     path: "quarter",
  //     populate: { path: "lumps" },
  //   })

  //   return updatedFinish;
  // },
};

export default Mutation;
