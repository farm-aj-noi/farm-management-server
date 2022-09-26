import Halve from "../../models/halve";
import Imhalve from "../../models/Beefstore/imhalve";
import dayjs from "dayjs";
import BeefStore from "../../models/Beefstore/beefstore";
import Imslaughter from "../../models/imslaughter";
import User from "../../models/user";
import Beefroom from "../../models/Beefstore/beefroom";
import Typekeep from "../../models/Beefstore/typekeep";
import RequestExport from "../../models/Beefstore/requestexport";
import TotalExpdate from "../../models/Beefstore/totalexpdate";

const Mutation = {
  createImHalve: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    const currentRoom = await Imhalve.find();
    const isRoomExist =
      currentRoom.findIndex((prod) => prod.barcode == args.barcode) > -1;

    if (isRoomExist) {
      throw new Error("บาร์โค้ดของคุณซ้ำ");
    }

    const date = dayjs();

    //const test = await Imhalve.find( {name: "นำเข้า"} ).count()

    const halve = await Halve.findOne({
      barcode: args.barcode,
    });

    const statusIM = "5f448d5d4ef8ed48806f1b53";

    const findfarmer = halve.imslaughter;
    const farmerName = await Imslaughter.findById(findfarmer);

    const finduser = userId;
    const username = await User.findById(finduser);

    const room = await Beefroom.findById(args.beefroom);
    const y = room.typekeep;
    const totalhalve = room.halve;

    const type = halve.beeftype.toString();

    const typebeef = await Typekeep.findOne({ _id: y, beeftype: type });

    if (typebeef == null) {
      throw new Error("ไม่พบประเภทจัดเก็บในห้องนี้");
    }

    const findtype = typebeef.beeftype.toString();

    const totalbeef = typebeef.totalbeef.toString();

    const isRoomEmpty = totalhalve.length == totalbeef;

    const exp = await TotalExpdate.findById("629eeaa60931a4ec74bc75fd");
    const Dateexp = dayjs().add(exp.dayH, "d").toISOString();

    if (isRoomEmpty) {
      throw new Error("ห้องของคุณเต็มกรุณาเพิ่มประเภทจัดเก็บ");
    }

    if (type !== findtype) {
      throw new Error("กรุณานำเข้าประเภทชิ้นเนื้อให้ถูกต้อง");
    }

    if (halve) {
      const imhalve = await Imhalve.create({
        name: "นำเข้า",
        importdate: date,
        user: userId,
        halve: halve,
        barcode: args.barcode,
        beeftype: halve.beeftype,
        namefarmer: farmerName.namefarmer,
        userName: username.name,
        storestatus: statusIM,
        beefroom: args.beefroom,
        Expdate: Dateexp,
      });

      const store = await BeefStore.findById(args.beefstore);
      if (!store.imhalves) {
        store.imhalves = [imhalve];
      } else {
        store.imhalves.push(imhalve);
      }
      await store.save();

      const rooms = await Beefroom.findById(args.beefroom);
      if (!rooms.halve) {
        rooms.halve = [halve];
      } else {
        rooms.halve.push(halve);
      }
      await rooms.save();

      let test = await Imhalve.findById(imhalve.id)
        .populate({
          path: "user",
          populate: { path: "imhalves" },
        })
        .populate({
          path: "halve",
          populate: { path: "status" },
        })
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
          populate: { path: "chill", populate: { path: "chillstatus" } },
        })
        .populate({
          path: "beeftype",
        })
        .populate({
          path: "storestatus",
        })
        .populate({
          path: "beefroom",
        });

      console.log(test);
      return test;
    }
  },

  createExporth: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.barcode || !args.storestatus || !args.exporter) {
      throw new Error("กรุณากรอกข้อมูลให้ครบ");
    }

    const date = dayjs();

    const halve = await Halve.findOne({
      barcode: args.barcode,
    });

    const exhalve = await Imhalve.findOne({
      barcode: args.barcode,
    });

    const e = await Imhalve.findOne({
      barcode: args.barcode,
      name: "นำเข้า",
    });

    //const exporter = await RequestExport.findById(args.exporter);

    const f = halve.imslaughter;
    const farmerName = await Imslaughter.findById(f);

    const finduser = userId;
    const username = await User.findById(finduser);

    const room = exhalve.beefroom;

    const find =
      (await Imhalve.findOne({
        barcode: args.barcode,
        name: "นำออก",
      }).countDocuments()) > 0;

    if (find) {
      throw new Error("ซากโคผ่าเสี้ยวนี้ถูกนำออกไปเเล้ว");
    }

    await Imhalve.findByIdAndUpdate(e.id, {
      storestatus: "62a30cdccb9cda7371a7cd7f",
    });

    await Halve.findByIdAndUpdate(halve.id, { sendAt: date });

    if (halve) {
      const imhalve = await Imhalve.create({
        name: "นำออก",
        exportdate: date,
        user: userId,
        halve: halve,
        barcode: args.barcode,
        beeftype: halve.beeftype,
        namefarmer: farmerName.namefarmer,
        userName: username.name,
        storestatus: args.storestatus,
        exporter: args.exporter,
        Expdate: e.Expdate,
      });

      let result = await BeefStore.findByIdAndUpdate(
        {
          _id: "6284d7035415c34e54b2fc2c",
        },
        { $pull: { imhalves: exhalve.id } }
      );

      let r = await Beefroom.findByIdAndUpdate(
        {
          _id: room,
        },
        { $pull: { halve: halve } }
      );

      let test = await Imhalve.findById(imhalve.id)
        .populate({
          path: "user",
          populate: { path: "imhalves" },
        })
        .populate({
          path: "halve",
          populate: { path: "status" },
        })
        .populate({
          path: "halve",
          populate: { path: "imslaughter" },
        })
        .populate({
          path: "halve",
          populate: { path: "beeftype" },
        })
        .populate({
          path: "beeftype",
        })
        .populate({
          path: "storestatus",
        })
        .populate({
          path: "beefroom",
        })
        .populate({
          path: "shelf",
        });

      return test;
    }
  },
  updateInfoH: async (parent, args, { userId }, info) => {
    const imhalve = await Imhalve.findById(args.id);

    const updateInfo = {
      info: args.info,
    };

    await Imhalve.findByIdAndUpdate(imhalve.id, updateInfo);

    const updatedFinish = await Imhalve.findById(imhalve.id);
    return updatedFinish;
  },
};
export default Mutation;
