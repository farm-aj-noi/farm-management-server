import Chill from "../../models/Beefstore/chill";
import dayjs from "dayjs";
import Halve from "../../models/halve";
import Chillday from "../../models/Beefstore/chillday";
import Imhalve from "../../models/Beefstore/imhalve";
import Chillroom from "../../models/Beefstore/chillroom";
import User from "../../models/user";

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

    const imhalve = await Imhalve.findOne({
      barcode: args.barcode,
    });

    const finduser = userId;
    const username = await User.findById(finduser);
    const find = await Chillday.findById(args.chillday);
    const chillday = Number(find.day);

    const statusCh = "6284ad73fbfac22364a6e430";
    const statusSt = "6284ad73fbfac22364a6e430";

    const dateEnd = dayjs().add(chillday, "day").toISOString();

    const check =
      (await Chill.findOne({
        barcode: args.barcode,
      }).countDocuments()) > 0;

    if (check) {
      throw new Error("ซากโคผ่าเสี้ยวนี้ถูกบ่มไปเเล้ว");
    }

    await Halve.findByIdAndUpdate(halve.id, { chillstatus: statusCh });

    await Imhalve.findByIdAndUpdate(imhalve.id, { storestatus: statusSt });

    const room = await Chillroom.findById(args.chillroom);
    const roomnum = room.roomnum;

    await Imhalve.findByIdAndUpdate(imhalve.id, { chillroom: roomnum });

    const chill = await Chill.create({
      barcode: args.barcode,
      halve: halve,
      beeftype: halve.beeftype,
      chillroom: args.chillroom,
      chilldateStart: DateNow,
      chilldateEnd: dateEnd,
      chillday: find,
      chillstatus: statusCh,
      user: userId,
      name: username.name,
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
        path: "chill",
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
    const statusSt = "5f448d5d4ef8ed48806f1b53";

    const halve = await Halve.findOne({
      chill: args.id,
    });

    const imhalve = await Imhalve.findOne({
      halve: halve.id,
      name: "นำเข้า",
    });

    await Chill.findByIdAndUpdate(id, { chillstatus: statusCh });
    await Imhalve.findByIdAndUpdate(imhalve.id, { storestatus: statusSt });

    if (checkchilldate) {
      const statusCh = "6284ad91fbfac22364a6e431";

      await Halve.findByIdAndUpdate(halve.id, { chillstatus: statusCh });
      await Imhalve.findByIdAndUpdate(imhalve.id, { storestatus: statusSt });
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
