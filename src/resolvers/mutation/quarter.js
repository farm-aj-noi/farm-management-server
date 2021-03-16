import dayjs from "dayjs";

import User from "../../models/user";
import Imslaughter from "../../models/imslaughter";
import Quarter from "../../models/quarter";
import Halve from "../../models/halve";
import Beeftype from "../../models/beeftype";
import Setting from "../../models/setting";
import Counter from '../../models/identitycounter'

const Mutation = {
  createQuarter: async (parent, args, { userId }, info) => {
    // Check if user logged in
    if (!userId) throw new Error("Please log in.");

    if (!args.weight || !args.imslaughter || !args.beeftype || !args.halve) {
      throw new Error("Please provide all required fields.");
    }

    //check count reset
    const SettingResetdate = await Setting.findOne({});
    const chaeckDate = await parseInt(dayjs().format("YYYYMMDD").toString());
    if (SettingResetdate.dateResetCountQ < chaeckDate) {
      await Quarter.resetCount();
      await Setting.findByIdAndUpdate(SettingResetdate.id, {
        dateResetCountQ: chaeckDate,
      });
    }

    const statusId = "5f3f2dd3b23ee40f9c84be07";
    const beeftype = await Beeftype.findById(args.beeftype);

    // ทดสอบนำเข้า
    const DateNow = dayjs().toISOString();

    const quarter = await Quarter.create({
      ...args,
      createdAt: DateNow,
      status: statusId,
      user: userId,
    });
    // console.log(quarter);

    //ราคา
    const calprice = await Quarter.findById(quarter.id)
      .populate({
        path: "imslaughter",
        populate: { path: "quarters" },
      })
      .populate({
        path: "halve",
        populate: { path: "quarters" },
      });
    // console.log(calprice);

    //change main status
    const statusMain = "5f1155c0f34d6036d0515e3f";
    if (calprice.halve.status !== statusMain) {
      // Update in database
      await Halve.findByIdAndUpdate(calprice.halve.id, { status: statusMain });
    }

    if (calprice.imslaughter.grade === "2") {
      const price = beeftype.priceG2h * calprice.weight;
      await Lump.findByIdAndUpdate(lump.id, { price: price });
    }
    if (calprice.imslaughter.grade === "2.5") {
      const price = beeftype.priceG2h * calprice.weight;
      await Quarter.findByIdAndUpdate(quarter.id, { price: price });
    }
    if (calprice.imslaughter.grade === "3") {
      const price = beeftype.priceG3 * calprice.weight;
      await Quarter.findByIdAndUpdate(quarter.id, { price: price });
    }
    if (calprice.imslaughter.grade === "3.5") {
      const price = beeftype.priceG3h * calprice.weight;
      await Quarter.findByIdAndUpdate(quarter.id, { price: price });
    }
    if (calprice.imslaughter.grade === "4") {
      const price = beeftype.priceG4 * calprice.weight;
      await Quarter.findByIdAndUpdate(quarter.id, { price: price });
    }
    if (calprice.imslaughter.grade === "4.5") {
      const price = beeftype.priceG4h * calprice.weight;
      await Quarter.findByIdAndUpdate(quarter.id, { price: price });
    }
    if (calprice.imslaughter.grade === "5") {
      const price = beeftype.priceG5 * calprice.weight;
      await Quarter.findByIdAndUpdate(quarter.id, { price: price });
    }

    //barcode
    const DateCode = await dayjs().format("YYYYMMDD").toString();
    const checkcount = await Counter.findOne({
      model: "Quarter"
    })

    const count = checkcount.count.toString().padStart(4, "0");
    // console.log(beeftype);
    const BeefCode = beeftype.code.toUpperCase().padStart(3, "0");
    const barcodeinput = DateCode + BeefCode + count;
    // console.log(barcodeinput);
    await Quarter.findByIdAndUpdate(quarter.id, {
      barcode: barcodeinput,
    });

    const user = await User.findById(userId);
    if (!user.quarters) {
      user.quarters = [quarter];
    } else {
      user.quarters.push(quarter);
    }
    await user.save();

    const imslaughter = await Imslaughter.findById(args.imslaughter);
    if (!imslaughter.quarters) {
      imslaughter.quarters = [quarter];
    } else {
      imslaughter.quarters.push(quarter);
    }
    await imslaughter.save();

    const halve = await Halve.findById(args.halve);
    if (!halve.quarters) {
      halve.quarters = [quarter];
    } else {
      halve.quarters.push(quarter);
    }
    await halve.save();

    return Quarter.findById(quarter.id)
      .populate({
        path: "user",
        populate: { path: "quarters" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "imslaughter",
        populate: { path: "quarters" },
      })
      .populate({
        path: "halve",
        populate: { path: "quarters" },
      });
  },
  deleteQuarter: async (parent, args, { userId }, info) => {
    const { id } = args;

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    // Find cart from given id
    const quarter = await Quarter.findById(id);
    // console.log(quarter)

    const user = await User.findById(userId);
    const imslaughter = await Imslaughter.findById(quarter.imslaughter);
    const halve = await Halve.findById(quarter.halve);
    // console.log(imslaughter)

    // Delete cart
    const deletedQuarter = await Quarter.findByIdAndDelete(id);

    // Update user's carts
    const updatedUser = user.quarters.filter(
      (quartersId) => quartersId.toString() !== deletedQuarter.id.toString()
    );
    await User.findByIdAndUpdate(userId, { quarters: updatedUser });

    const updatedImslaughter = imslaughter.quarters.filter(
      (quartersId) => quartersId.toString() !== deletedQuarter.id.toString()
    );
    await Imslaughter.findByIdAndUpdate(imslaughter.id, {
      quarters: updatedImslaughter,
    });

    const updatedHalve = halve.quarters.filter(
      (quartersId) => quartersId.toString() !== deletedQuarter.id.toString()
    );
    await Halve.findByIdAndUpdate(halve.id, { quarters: updatedHalve });

    return deletedQuarter;
  },
  updateQuarterSent: async (parent, args, { userId }, info) => {
    const { id, sendAt } = args;

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    const quarter = await Quarter.findById(id);

    // if (sendAt){
    //   sentAtnew = dayjs(sendAt)
    // }
    const sentAtnew = dayjs(sendAt);

    const updateInfo = {
      sendAt: !!sentAtnew ? sentAtnew : quarter.sendAt,
    };

    // Update product in database
    await Quarter.findByIdAndUpdate(id, updateInfo);
    // await Halve.findByIdAndUpdate(id, {sendAt:null});

    // Find the updated Product
    const updatedFinish = await Quarter.findById(id)
      .populate({
        path: "user",
        populate: { path: "quarters" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "imslaughter",
        populate: { path: "quarters" },
      })
      .populate({
        path: "halve",
        populate: { path: "quarters" },
      });

    return updatedFinish;
  },
  deleteQuarterSent: async (parent, args, { userId }, info) => {
    const { id } = args;

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    // Update product in database
    await Quarter.findByIdAndUpdate(id, { sendAt: null });

    // Find the updated Product
    const updatedFinish = await Quarter.findById(id)
      .populate({
        path: "user",
        populate: { path: "quarters" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "imslaughter",
        populate: { path: "quarters" },
        populate: { path: "statusEn" },
      })
      .populate({
        path: "halve",
        populate: { path: "quarters" },
      });

    return updatedFinish;
  },
};

export default Mutation;
