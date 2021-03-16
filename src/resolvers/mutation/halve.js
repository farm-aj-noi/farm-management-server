import dayjs from "dayjs";

import User from "../../models/user";
import Imslaughter from "../../models/imslaughter";
import Halve from "../../models/halve";
import Beeftype from "../../models/beeftype";
import Setting from "../../models/setting";
import Counter from '../../models/identitycounter'

const Mutation = {
  createHalve: async (parent, args, { userId }, info) => {
    // Check if user logged in
    if (!userId) throw new Error("Please log in.");

    if (!args.weightwarm || !args.imslaughter || !args.beeftype) {
      throw new Error("Please provide all required fields.");
    }

    //check count reset
    const SettingResetdate = await Setting.findOne({});
    const chaeckDate = await parseInt(dayjs().format("YYYYMMDD").toString());
    if (SettingResetdate.dateResetCountH < chaeckDate) {
      await Halve.resetCount();
      await Setting.findByIdAndUpdate(SettingResetdate.id, {
        dateResetCountH: chaeckDate,
      });
    }

    const statusId = "5f1155b2f34d6036d0515e3e";

    // ทดสอบนำเข้า
    const DateNow = dayjs().toISOString();

    const halve = await Halve.create({
      ...args,
      createdAt: DateNow,
      status: statusId,
      user: userId,
    });

    //barcode
    const DateCode = await dayjs().format("YYYYMMDD").toString();
    const checkcount = await Counter.findOne({
      model: "Halve"
    })

    const count = checkcount.count.toString().padStart(4, "0");
    const beeftype = await Beeftype.findById(args.beeftype);
    // console.log(beeftype);
    const BeefCode = beeftype.code.toUpperCase().padStart(3, "0");
    const barcodeinput = DateCode + BeefCode + count;
    // console.log(barcodeinput);
    await Halve.findByIdAndUpdate(halve.id, { barcode: barcodeinput });

    const user = await User.findById(userId);
    if (!user.halves) {
      user.halves = [halve];
    } else {
      user.halves.push(halve);
    }
    await user.save();

    const imslaughter = await Imslaughter.findById(args.imslaughter);
    if (!imslaughter.halves) {
      imslaughter.halves = [halve];
    } else {
      imslaughter.halves.push(halve);
    }
    await imslaughter.save();

    return Halve.findById(halve.id)
      .populate({
        path: "user",
        populate: { path: "halves" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "imslaughter",
        populate: { path: "halves" },
      });
  },
  createHalveL: async (parent, args, { userId }, info) => {
    // Check if user logged in
    if (!userId) throw new Error("Please log in.");

    if (!args.weightwarm || !args.imslaughter) {
      throw new Error("Please provide all required fields.");
    }

    //check count reset
    const SettingResetdate = await Setting.findOne({});
    const chaeckDate = await parseInt(dayjs().format("YYYYMMDD").toString());
    if (SettingResetdate.dateResetCount < chaeckDate) {
      await Halve.resetCount();
      await Setting.findByIdAndUpdate(SettingResetdate.id, {
        dateResetCount: chaeckDate,
      });
    }

    const statusId = "5f1155b2f34d6036d0515e3e";
    const beeftypeId = "5f1000e28d55662dcc23d95e";

    // ทดสอบนำเข้า
    const DateNow = dayjs().toISOString();

    const halve = await Halve.create({
      ...args,
      createdAt: DateNow,
      status: statusId,
      beeftype: beeftypeId,
      user: userId,
    });

    //barcode
    const DateCode = await dayjs().format("YYYYMMDD").toString();
    const checkcount = await Counter.findOne({
      model: "Halve"
    })

    const count = checkcount.count.toString().padStart(4, "0");
    const beeftype = await Beeftype.findById(beeftypeId);
    // console.log(beeftype);
    const BeefCode = beeftype.code.toUpperCase().padStart(3, "0");;
    const barcodeinput = DateCode + BeefCode + count;
    // console.log(barcodeinput);
    await Halve.findByIdAndUpdate(halve.id, { barcode: barcodeinput });

    const user = await User.findById(userId);
    if (!user.halves) {
      user.halves = [halve];
    } else {
      user.halves.push(halve);
    }
    await user.save();

    const imslaughter = await Imslaughter.findById(args.imslaughter);
    if (!imslaughter.halves) {
      imslaughter.halves = [halve];
    } else {
      imslaughter.halves.push(halve);
    }
    await imslaughter.save();

    return Halve.findById(halve.id)
      .populate({
        path: "user",
        populate: { path: "halves" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "imslaughter",
        populate: { path: "halves" },
      });
  },
  createHalveR: async (parent, args, { userId }, info) => {
    // Check if user logged in
    if (!userId) throw new Error("Please log in.");

    if (!args.weightwarm || !args.imslaughter) {
      throw new Error("Please provide all required fields.");
    }

    //check count reset
    const SettingResetdate = await Setting.findOne({});
    const chaeckDate = await parseInt(dayjs().format("YYYYMMDD").toString());
    if (SettingResetdate.dateResetCount < chaeckDate) {
      await Halve.resetCount();
      await Setting.findByIdAndUpdate(SettingResetdate.id, {
        dateResetCount: chaeckDate,
      });
    }

    const statusId = "5f1155b2f34d6036d0515e3e";
    const beeftypeId = "5f1000ee8d55662dcc23d960";

    // ทดสอบนำเข้า
    const DateNow = dayjs().toISOString();

    const halve = await Halve.create({
      ...args,
      createdAt: DateNow,
      status: statusId,
      beeftype: beeftypeId,
      user: userId,
    });

    //barcode
    const DateCode = await dayjs().format("YYYYMMDD").toString();
    const checkcount = await Counter.findOne({
      model: "Halve"
    })

    const count = checkcount.count.toString().padStart(4, "0");
    const beeftype = await Beeftype.findById(beeftypeId);
    // console.log(beeftype);
    const BeefCode = beeftype.code.toUpperCase().padStart(3, "0");;
    const barcodeinput = DateCode + BeefCode + count;
    // console.log(barcodeinput);
    await Halve.findByIdAndUpdate(halve.id, { barcode: barcodeinput });

    const user = await User.findById(userId);
    if (!user.halves) {
      user.halves = [halve];
    } else {
      user.halves.push(halve);
    }
    await user.save();

    const imslaughter = await Imslaughter.findById(args.imslaughter);
    if (!imslaughter.halves) {
      imslaughter.halves = [halve];
    } else {
      imslaughter.halves.push(halve);
    }
    await imslaughter.save();

    return Halve.findById(halve.id)
      .populate({
        path: "user",
        populate: { path: "halves" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "imslaughter",
        populate: { path: "halves" },
      });
  },
  updateHalve: async (parent, args, { userId }, info) => {
    const { id, weightwarm ,sendAt} = args;

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    const halve = await Halve.findById(id);

    // if (sendAt){
    //   sentAtnew = dayjs(sendAt)
    // }
    const sentAtnew = dayjs(sendAt)

    const updateInfo = {
      weightwarm: !!weightwarm ? weightwarm : halve.weightwarm,
      sendAt: !!sentAtnew ? sentAtnew : halve.sendAt,
    };

    // Update product in database
    await Halve.findByIdAndUpdate(id, updateInfo);
    // await Halve.findByIdAndUpdate(id, {sendAt:null});

    // Find the updated Product
    const updatedFinish = await Halve.findById(id).populate({
      path: "user",
      populate: { path: "halves" },
    })
    .populate({
      path: "imslaughter",
      populate: { path: "halves" },
    })
    .populate({
      path: "status",
    })
    .populate({
      path: "beeftype",
    });

    return updatedFinish;
  },
  deleteHalveSent: async (parent, args, { userId }, info) => {
    const { id } = args;

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    const halve = await Halve.findById(id);


    // Update product in database
    await Halve.findByIdAndUpdate(id, {sendAt:null});

    // Find the updated Product
    const updatedFinish = await Halve.findById(id).populate({
      path: "user",
      populate: { path: "halves" },
    })
    .populate({
      path: "imslaughter",
      populate: { path: "halves" },
    })
    .populate({
      path: "status",
    })
    .populate({
      path: "beeftype",
    });

    return updatedFinish;
  },
  updateHalveWeightCool: async (parent, args, { userId }, info) => {
    const { id, weightcool } = args;

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    const halve = await Halve.findById(id);

    if (!id || !weightcool) {
      throw new Error("Please provide all required fields.");
    }

    // Update product in database
    await Halve.findByIdAndUpdate(id, {weightcool:weightcool});

    // Find the updated Product
    const updatedFinish = await Halve.findById(id).populate({
      path: "user",
      populate: { path: "halves" },
    })
    .populate({
      path: "imslaughter",
      populate: { path: "halves" },
    })
    .populate({
      path: "status",
    })
    .populate({
      path: "beeftype",
    });

    return updatedFinish;
  },
};

export default Mutation;
