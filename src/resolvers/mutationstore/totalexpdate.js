import Imhalve from "../../models/Beefstore/imhalve";
import TotalExpdate from "../../models/Beefstore/totalexpdate";
import dayjs from "dayjs";
import Imquarter from "../../models/Beefstore/imquarter";
import Imlump from "../../models/Beefstore/imlump";
import Imchop from "../../models/Beefstore/imchop";
import Imentrail from "../../models/Beefstore/imentrail";

const Mutation = {
  createTotalExp: async (parent, args, { userId }, info) => {
    return await TotalExpdate.create({
      ...args,
    });
  },

  updateTotalExp: async (parent, args, { userId }, info) => {
    const { dayH, dayQ, dayL, dayC, dayE} = args;

    const totalexp = await TotalExpdate.findById(args.id);

    const updateInfo = {
      dayH: !!dayH ? dayH : totalexp.dayH,
      dayQ: !!dayQ ? dayQ : totalexp.dayQ,
      dayL: !!dayL ? dayL : totalexp.dayL,
      dayC: !!dayC ? dayC : totalexp.dayC,
      dayE: !!dayE ? dayE : totalexp.dayE,
    };

    if (args.dayH) {
      const imhalve = await Imhalve.find({ name: "นำเข้า" });
      for (let i = 0; i < imhalve.length; i++) {
        const exp = dayjs(imhalve[i].importdate)
          .add(totalexp.dayH, "d")
          .toISOString();
        await Imhalve.findByIdAndUpdate(imhalve[i].id, { Expdate: exp });
      }
    }

    else if (args.dayQ) {
      const imquarter = await Imquarter.find({ name: "นำเข้า" });
      for (let i = 0; i < imquarter.length; i++) {
        const exp = dayjs(imquarter[i].importdate)
          .add(totalexp.dayQ, "d")
          .toISOString();
        await Imquarter.findByIdAndUpdate(imquarter[i].id, { Expdate: exp });
      }
    }

    else if (args.dayL) {
      const imlump = await Imlump.find({ name: "นำเข้า" });
      for (let i = 0; i < imlump.length; i++) {
        const exp = dayjs(imlump[i].importdate)
          .add(totalexp.dayL, "d")
          .toISOString();
        await Imlump.findByIdAndUpdate(imlump[i].id, { Expdate: exp });
      }
    }

    else if (args.dayC) {
      const imchop = await Imchop.find({ name: "นำเข้า" });
      for (let i = 0; i < imchop.length; i++) {
        const exp = dayjs(imchop[i].importdate)
          .add(totalexp.dayC, "d")
          .toISOString();
        await Imchop.findByIdAndUpdate(imchop[i].id, { Expdate: exp });
      }
    }

    if (args.dayE) {
      const imentrail = await Imentrail.find({ name: "นำเข้า" });
      for (let i = 0; i < imentrail.length; i++) {
        const exp = dayjs(imentrail[i].importdate)
          .add(totalexp.dayE, "d")
          .toISOString();
        await Imentrail.findByIdAndUpdate(imentrail[i].id, { Expdate: exp });
      }
    }

    await TotalExpdate.findByIdAndUpdate(args.id, updateInfo);

    const updatedFinish = await TotalExpdate.findById(args.id);
    return updatedFinish;
  },
};
export default Mutation;
