import Lump from "../../models/lump";
import Imlump from "../../models/Beefstore/imlump";
import dayjs from "dayjs";
import BeefStore from "../../models/Beefstore/beefstore";
import Imslaughter from "../../models/imslaughter";
import User from "../../models/user";
import Beefroom from "../../models/Beefstore/beefroom";
import Shelf from "../../models/Beefstore/shelf";
import Typekeep from "../../models/Beefstore/typekeep";
import RequestExport from "../../models/Beefstore/requestexport";
import Basket from "../../models/Beefstore/basket";
import TotalExpdate from "../../models/Beefstore/totalexpdate";

const Mutation = {
  createImlump: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (
      !args.barcode ||
      !args.beefstore ||
      !args.beefroom ||
      !args.shelf ||
      !args.basket
    ) {
      throw new Error("กรุณากรอกบาร์โค้ด");
    }

    const currentRoom = await Imlump.find();
    const isRoomExist =
      currentRoom.findIndex((prod) => prod.barcode == args.barcode) > -1;

    if (isRoomExist) {
      throw new Error("บาร์โค้ดของคุณซ้ำ");
    }

    const date = dayjs();

    const lump = await Lump.findOne({
      barcode: args.barcode,
    });

    const statusIM = "5f448d5d4ef8ed48806f1b53";

    const findfarmer = lump.imslaughter;
    const farmerName = await Imslaughter.findById(findfarmer);

    const finduser = userId;
    const username = await User.findById(finduser);

    const shelfs = await Shelf.findById(args.shelf);
    const y = shelfs.typekeep;
    const totallump = shelfs.lump;

    const type = lump.beeftype.toString();

    const typebeef = await Typekeep.findOne({ _id: y, beeftype: type });

    const findtype = typebeef.beeftype.toString();

    const totalbeef = typebeef.totalbeef.toString();

    const isRoomEmpty = totallump.length == totalbeef;

    const basket = await Basket.findById(args.basket);

    const exp = await TotalExpdate.findById("629eeaa60931a4ec74bc75fd")
    const Dateexp = dayjs().add(exp.dayL, "d").toISOString();

    if (isRoomEmpty) {
      throw new Error("ชั้นของคุณเต็มกรุณาเพิ่มชั้น");
    }

    if (type !== findtype) {
      throw new Error("กรุณานำเข้าประเภทชิ้นเนื้อให้ถูกต้อง");
    }

    if (lump) {
      const imlump = await Imlump.create({
        name: "นำเข้า",
        importdate: date,
        user: userId,
        lump: lump,
        barcode: args.barcode,
        beeftype: lump.beeftype,
        namefarmer: farmerName.namefarmer,
        userName: username.name,
        storestatus: statusIM,
        beefroom: args.beefroom,
        shelf: args.shelf,
        basket: basket.basketname,
        Expdate: Dateexp
      });

      const store = await BeefStore.findById(args.beefstore);
      if (!store.imlumps) {
        store.imlumps = [imlump];
      } else {
        store.imlumps.push(imlump);
      }
      await store.save();

      const rooms = await Beefroom.findById(args.beefroom);
      if (!rooms.lump) {
        rooms.lump = [lump];
      } else {
        rooms.lump.push(lump);
      }
      await rooms.save();

      const shelfs = await Shelf.findById(args.shelf);
      if (!shelfs.lump) {
        shelfs.lump = [lump];
      } else {
        shelfs.lump.push(lump);
      }
      await shelfs.save();

      let test = await Imlump.findById(imlump.id)
        .populate({
          path: "user",
          populate: { path: "imlumps" },
        })
        .populate({
          path: "lump",
          populate: { path: "status" },
        })
        .populate({
          path: "lump",
          populate: { path: "imslaughter" },
        })
        .populate({
          path: "lump",
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

      console.log(test);
      return test;
    }
  },

  createExportl: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.barcode || !args.storestatus || !args.exporter) {
      throw new Error("กรุณากรอกข้อมูลให้ครบ");
    }

    const date = dayjs();

    const lump = await Lump.findOne({
      barcode: args.barcode,
    });

    const exlump = await Imlump.findOne({
      barcode: args.barcode,
    });

    const exporter = await RequestExport.findById(args.exporter);

    const findfarmer = lump.imslaughter;
    const farmerName = await Imslaughter.findById(findfarmer);

    const finduser = userId;
    const username = await User.findById(finduser);

    const room = exlump.beefroom;
    const shelf = exlump.shelf;

    if (args.storestatus == "62821d931768cd521052118b") {
      await Lump.findByIdAndUpdate(lump.id, { Productstatus: "รอแปรรูป" });
    }

    const find =
      (await Imlump.findOne({
        barcode: args.barcode,
        name: "นำออก",
      }).countDocuments()) > 0;

    if (find) {
      throw new Error("ก้อนเนื้อนี้ถูกนำออกไปเเล้ว");
    }

    if (lump) {
      const imlump = await Imlump.create({
        name: "นำออก",
        exportdate: date,
        user: userId,
        lump: lump,
        barcode: args.barcode,
        beeftype: lump.beeftype,
        namefarmer: farmerName.namefarmer,
        userName: username.name,
        storestatus: args.storestatus,
        exporter: exporter.name,
      });

      let result = await BeefStore.findByIdAndUpdate(
        {
          _id: "6284d7035415c34e54b2fc2c",
        },
        { $pull: { imlumps: exlump.id } }
      );

      let r = await Beefroom.findByIdAndUpdate(
        {
          _id: room,
        },
        { $pull: { lump: lump } }
      );

      let s = await Shelf.findByIdAndUpdate(
        {
          _id: shelf,
        },
        { $pull: { lump: lump } }
      );

      let test = await Imlump.findById(imlump.id)
        .populate({
          path: "user",
          populate: { path: "imlumps" },
        })
        .populate({
          path: "lump",
          populate: { path: "status" },
        })
        .populate({
          path: "lump",
          populate: { path: "imslaughter" },
        })
        .populate({
          path: "lump",
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

  /* updateTotalExpl: async (parent, args, { userId }, info) => {
    const imlump = await Imlump.find({ name: "นำเข้า" });

    const exp = await TotalExpdate.findById(args.totalday);

    const expdate = dayjs().add(exp.totalday, "d").toISOString();

    for (let i = 0; i < imlump.length; i++) {
      await Imlump.findByIdAndUpdate(imlump[i].id, { Expdate: expdate });
    }
  }, */
};
export default Mutation;
