import dayjs from "dayjs";

import User from "../../models/user";
import Imslaughter from "../../models/imslaughter";
import Entrail from "../../models/entrail";
import Beeftype from "../../models/beeftype";
import Setting from "../../models/setting";
import Counter from '../../models/identitycounter'

const Mutation = {
  createEntrail: async (parent, args, { userId }, info) => {
    // Check if user logged in
    if (!userId) throw new Error("Please log in.");

    if (
      !args.imslaughter ||
      !args.offal ||
      !args.toe ||
      !args.head ||
      !args.skin ||
      !args.liver ||
      !args.fat ||
      !args.onkale ||
      !args.tail ||
      !args.gallbladder ||
      !args.scrap
    ) {
      throw new Error("Please provide all required fields.");
    }

    const imslaughter = await Imslaughter.findById(args.imslaughter);
    const checkalgro = imslaughter.entrails ? 'ture' : 'false';

    // console.log(!imslaughter.entrails);
    // console.log(checkalgro);

    if (checkalgro === 'ture') {
      throw new Error("Error.");
    }
        //check count reset
        const SettingResetdate = await Setting.findOne({});
        const chaeckDate = await parseInt(dayjs().format("YYYYMMDD").toString());
        if (SettingResetdate.dateResetCountE < chaeckDate) {
          await Entrail.resetCount();
          await Setting.findByIdAndUpdate(SettingResetdate.id, {
            dateResetCountE: chaeckDate,
          });
        }
  
        // ทดสอบนำเข้า
        const DateNow = dayjs().toISOString();
  
        const entrail = await Entrail.create({
          ...args,
          createdAt: DateNow,
          user: userId,
        });
  
        //barcode
        const DateCode = await dayjs().format("YYYYMMDD").toString();
        const checkcount = await Counter.findOne({
          model: "Entrail"
        })
    
        const count = checkcount.count.toString().padStart(4, "0");
        const barcodeinput = DateCode + "ZZZ" + count;
        // console.log(barcodeinput);
        await Entrail.findByIdAndUpdate(entrail.id, { barcode: barcodeinput });
  
        const user = await User.findById(userId);
        if (!user.entrails) {
          user.entrails = [entrail];
        } else {
          user.entrails.push(entrail);
        }
        await user.save();
  
        const imslaughters = await Imslaughter.findByIdAndUpdate(
          args.imslaughter,
          { entrails: entrail }
        );
  
        return Entrail.findById(entrail.id)
          .populate({
            path: "user",
            populate: { path: "entrails" },
          })
          .populate({
            path: "imslaughter",
            populate: { path: "entrails" },
          });
    
  },
  updateEntrail: async (parent, args, { userId }, info) => {
    const {
      id,
      offal,
      toe,
      head,
      skin,
      liver,
      fat,
      onkale,
      tail,
      gallbladder,
      scrap,
    } = args;

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    const entrail = await Entrail.findById(id);

    const updateInfo = {
      offal: !!offal ? offal : entrail.offal,
      toe: !!toe ? toe : entrail.toe,
      head: !!head ? head : entrail.head,
      skin: !!skin ? skin : entrail.skin,
      liver: !!liver ? liver : entrail.liver,
      fat: !!fat ? fat : entrail.fat,
      onkale: !!onkale ? onkale : entrail.onkale,
      tail: !!tail ? tail : entrail.tail,
      gallbladder: !!gallbladder ? gallbladder : entrail.gallbladder,
      scrap: !!scrap ? scrap : entrail.scrap,
    };

    await Entrail.findByIdAndUpdate(id, updateInfo);

    const updatedFinish = await Entrail.findById(id)
      .populate({
        path: "user",
        populate: { path: "entrails" },
      })
      .populate({
        path: "imslaughter",
        populate: { path: "entrails" },
      });

    return updatedFinish;
  },
};

export default Mutation;
