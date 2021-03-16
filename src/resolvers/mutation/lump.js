import dayjs from "dayjs";

import User from "../../models/user";
import Imslaughter from "../../models/imslaughter";
import Quarter from "../../models/quarter";
import Lump from "../../models/lump";
import Beeftype from "../../models/beeftype";
import Setting from "../../models/setting";
import Counter from '../../models/identitycounter'

const Mutation = {
  createLump: async (parent, args, { userId }, info) => {
    // Check if user logged in
    if (!userId) throw new Error("Please log in.");

    if (!args.weight || !args.imslaughter || !args.beeftype || !args.quarter) {
      throw new Error("Please provide all required fields.");
    }

    //check count reset
    const SettingResetdate = await Setting.findOne({});
    const chaeckDate = await parseInt(dayjs().format("YYYYMMDD").toString());
    if (SettingResetdate.dateResetCountL < chaeckDate) {
      await Lump.resetCount();
      await Setting.findByIdAndUpdate(SettingResetdate.id, {
        dateResetCountL: chaeckDate,
      });
    }

    const statusId = "5f4468d4f226042dc88ef334";
    const beeftype = await Beeftype.findById(args.beeftype);

    // ทดสอบนำเข้า
    const DateNow = dayjs().toISOString();

    const lump = await Lump.create({
      ...args,
      createdAt: DateNow,
      status: statusId,
      user: userId,
    });
    // console.log(lump);

    //ราคา
    const calprice = await Lump.findById(lump.id)
      .populate({
        path: "imslaughter",
        populate: { path: "lumps" },
      })
      .populate({
        path: "quarter",
        populate: { path: "lumps" },
      });
    // console.log(calprice);
    // console.log(calprice.imslaughter.grade);

    //change main status
    const statusMain = "5f3f2de2b23ee40f9c84be08";
    if (calprice.quarter.status !== statusMain) {
      // Update in database
      await Quarter.findByIdAndUpdate(calprice.quarter.id, { status: statusMain });
    }

    if (calprice.imslaughter.grade === "2") {
      const price = beeftype.priceG2h * calprice.weight;
      await Lump.findByIdAndUpdate(lump.id, { price: price });
    }
    if (calprice.imslaughter.grade === "2.5") {
      const price = beeftype.priceG2h * calprice.weight;
      await Lump.findByIdAndUpdate(lump.id, { price: price });
    }
    if (calprice.imslaughter.grade === "3") {
      const price = beeftype.priceG3 * calprice.weight;
      await Lump.findByIdAndUpdate(lump.id, { price: price });
    }
    if (calprice.imslaughter.grade === "3.5") {
      const price = beeftype.priceG3h * calprice.weight;
      await Lump.findByIdAndUpdate(lump.id, { price: price });
    }
    if (calprice.imslaughter.grade === "4") {
      const price = beeftype.priceG4 * calprice.weight;
      await Lump.findByIdAndUpdate(lump.id, { price: price });
    }
    if (calprice.imslaughter.grade === "4.5") {
      const price = beeftype.priceG4h * calprice.weight;
      await Lump.findByIdAndUpdate(lump.id, { price: price });
    }
    if (calprice.imslaughter.grade === "5") {
      const price = beeftype.priceG5 * calprice.weight;
      await Lump.findByIdAndUpdate(lump.id, { price: price });
    }

    //barcode
    const DateCode = await dayjs().format("YYYYMMDD").toString();
    const checkcount = await Counter.findOne({
      model: "Lump"
    })

    const count = checkcount.count.toString().padStart(4, "0");
    // console.log(beeftype);
    const BeefCode = beeftype.code.toUpperCase().toString().padStart(3, "0");
    const barcodeinput = DateCode + BeefCode + count;
    // console.log(barcodeinput);
    await Lump.findByIdAndUpdate(lump.id, {
      barcode: barcodeinput,
    });

    const user = await User.findById(userId);
    if (!user.lumps) {
      user.lumps = [lump];
    } else {
      user.lumps.push(lump);
    }
    await user.save();

    const imslaughter = await Imslaughter.findById(args.imslaughter);
    if (!imslaughter.lumps) {
      imslaughter.lumps = [lump];
    } else {
      imslaughter.lumps.push(lump);
    }
    await imslaughter.save();

    const quarter = await Quarter.findById(args.quarter);
    if (!quarter.lumps) {
      quarter.lumps = [lump];
    } else {
      quarter.lumps.push(lump);
    }
    await quarter.save();

    return Lump.findById(lump.id)
      .populate({
        path: "user",
        populate: { path: "lumps" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "imslaughter",
        populate: { path: "lumps" },
      })
      .populate({
        path: "quarter",
        populate: { path: "lumps" },
      });
  },
  deleteLump: async (parent, args, { userId }, info) => {
    const { id } = args;

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    // Find cart from given id
    const lump = await Lump.findById(id);
    // console.log(lump)

    const user = await User.findById(userId);
    const imslaughter = await Imslaughter.findById(lump.imslaughter);
    const quarter = await Quarter.findById(lump.quarter);
    // console.log(imslaughter)

    // Delete cart
    const deletedLump = await Lump.findByIdAndDelete(id);

    // Update user's carts
    const updatedUser = user.lumps.filter(
      (lumpsId) => lumpsId.toString() !== deletedLump.id.toString()
    );
    await User.findByIdAndUpdate(userId, { lumps: updatedUser });

    const updatedImslaughter = imslaughter.lumps.filter(
      (lumpsId) => lumpsId.toString() !== deletedLump.id.toString()
    );
    await Imslaughter.findByIdAndUpdate(imslaughter.id, {
      lumps: updatedImslaughter,
    });

    const updatedQuarter = quarter.lumps.filter(
      (lumpsId) => lumpsId.toString() !== deletedLump.id.toString()
    );
    await Quarter.findByIdAndUpdate(quarter.id, { lumps: updatedQuarter });

    return deletedLump;
  },
  updateLumpSent: async (parent, args, { userId }, info) => {
    const { id, sendAt } = args;

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    const lump = await Lump.findById(id);

    // if (sendAt){
    //   sentAtnew = dayjs(sendAt)
    // }
    const sentAtnew = dayjs(sendAt);

    const updateInfo = {
      sendAt: !!sentAtnew ? sentAtnew : lump.sendAt,
    };

    // Update product in database
    await Lump.findByIdAndUpdate(id, updateInfo);
    // await Halve.findByIdAndUpdate(id, {sendAt:null});

    // Find the updated Product
    const updatedFinish = await Lump.findById(id)
      .populate({
        path: "user",
        populate: { path: "lumps" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "imslaughter",
        populate: { path: "lumps" },
      })
      .populate({
        path: "quarter",
        populate: { path: "lumps" },
      });

    return updatedFinish;
  },
  deleteLumpSent: async (parent, args, { userId }, info) => {
    const { id } = args;

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    // Update product in database
    await Lump.findByIdAndUpdate(id, { sendAt: null });

    // Find the updated Product
    const updatedFinish = await Lump.findById(id)
      .populate({
        path: "user",
        populate: { path: "lumps" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "imslaughter",
        populate: { path: "lumps" },
      })
      .populate({
        path: "quarter",
        populate: { path: "lumps" },
      });

    return updatedFinish;
  },
};

export default Mutation;
