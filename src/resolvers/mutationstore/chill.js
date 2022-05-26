import Chill from "../../models/Beefstore/chill";
import dayjs from "dayjs";
import Halve from "../../models/halve";
import Chillday from "../../models/Beefstore/chillday";

const Mutation = {
  createChill: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.barcode || !args.chillroom || !args.chillday) {
      throw new Error("Please provide all required fields.");
    }

    const DateNow = dayjs().toISOString();

    const halve = await Halve.findOne({
      barcode: args.barcode,
    });

    const find = await Chillday.findById(args.chillday);
    const chillday = Number(find.day);

    const statusCh = "6284ad73fbfac22364a6e430";

    const dateEnd = dayjs().add(chillday, "day").toISOString();

    /* let result = await Imhalve.findOneAndUpdate({
        barcode: args.barcode},
        {storestatus: statusCh }) */

    //await Imhalve.findOneAndUpdate({barcode: args.barcode},{storestatus : statusCh})

    const chill = await Chill.create({
      halve: halve,
      beeftype: halve.beeftype,
      chillroom: args.chillroom,
      chilldateStart: DateNow,
      chilldateEnd: dateEnd,
      chillday: find,
      user: userId,
      barcode: args.barcode,
      chillstatus: statusCh,
    });

    const halves = await Halve.findById(halve.id);
    if (!halves.chill) {
      halves.chill = [chill];
    } else {
      halves.chill.push(chill);
    }
    await halves.save();

    let test = Chill.findById(chill.id)
      .populate({
        path: "halve",
        populate: { path: "imslaughter" },
      })
      .populate({
        path: "halve",
        populate: { path: "beeftype" },
      })
      .populate({
        path: "halve",
        populate: { path: "status" },
      })
      .populate({
        path: "chillroom",
      })
      .populate({
        path: "chillstatus",
      })
      .populate({
        path: "chillday",
      });
    return test;
  },

  updateChillday: async (parent, args, { userId }, info) => {
    const { id } = args;

    if (!userId) throw new Error("Please log in.");

    const chill = await Chill.findById(id);

    const dateEnd = chill.chilldateEnd;
    const chillenddate = dayjs(dateEnd).format("YYYYMMDD").toString();

    const checkdate = dayjs().format("YYYYMMDD").toString();

    const checkchilldate = checkdate >= chillenddate;

    const statusCh = "6284ad91fbfac22364a6e431";

    await Chill.findByIdAndUpdate(id, { chillstatus: statusCh });
    if (checkchilldate) {
      const statusCh = "6284ad91fbfac22364a6e431";

      await Chill.findByIdAndUpdate(id, { chillstatus: statusCh });
    } else {
      throw new Error("ซากโคผ่าซีกกำลังบ่ม");
    }
    const updatedFinish = await Chill.findById(id).populate({
      path: "chillstatus",
    });

    return updatedFinish;
  },
};
export default Mutation;
