import Chop from "../../models/chop";
import Imchop from "../../models/Beefstore/imchop";
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
  createImchop: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    const currentRoom = await Imchop.find();
    const isRoomExist =
      currentRoom.findIndex((prod) => prod.barcode == args.barcode) > -1;

    if (isRoomExist) {
      throw new Error("บาร์โค้ดของคุณซ้ำ");
    }

    const date = dayjs();

    const chop = await Chop.findOne({
      barcode: args.barcode,
    });

    const statusIM = "5f448d5d4ef8ed48806f1b53";

    const findfarmer = chop.imslaughter;
    const farmerName = await Imslaughter.findById(findfarmer);

    const finduser = userId;
    const username = await User.findById(finduser);

    const shelfs = await Shelf.findById(args.shelf);
    const y = shelfs.typekeep;
    const totalchop = shelfs.chop;

    const type = chop.beeftype.toString();

    const typebeef = await Typekeep.findOne({ _id: y, beeftype: type });

    if (typebeef == null) {
      throw new Error("ไม่พบประเภทจัดเก็บในห้องนี้");
    }

    const findtype = typebeef.beeftype.toString();

    const totalbeef = typebeef.totalbeef.toString();

    const isRoomEmpty = totalchop.length == totalbeef;

    const basket = await Basket.findById(args.basket);

    const exp = await TotalExpdate.findById("629eeaa60931a4ec74bc75fd");
    const Dateexp = dayjs().add(exp.dayC, "d").toISOString();

    if (args.storestatus == "62821d931768cd521052118b") {
      await Chop.findByIdAndUpdate(chop.id, { Productstatus: "รอแปรรูป" });
    }

    if (isRoomEmpty) {
      throw new Error("ชั้นของคุณเต็มกรุณาเพิ่มชั้น");
    }

    if (type !== findtype) {
      throw new Error("กรุณานำเข้าประเภทชิ้นเนื้อให้ถูกต้อง");
    }

    if (chop) {
      const imchop = await Imchop.create({
        name: "นำเข้า",
        importdate: date,
        user: userId,
        chop: chop,
        barcode: args.barcode,
        beeftype: chop.beeftype,
        namefarmer: farmerName.namefarmer,
        userName: username.name,
        storestatus: statusIM,
        beefroom: args.beefroom,
        shelf: args.shelf,
        basket: basket.basketname,
        Expdate: Dateexp,
      });

      const store = await BeefStore.findById(args.beefstore);
      if (!store.imchops) {
        store.imchops = [imchop];
      } else {
        store.imchops.push(imchop);
      }
      await store.save();

      const rooms = await Beefroom.findById(args.beefroom);
      if (!rooms.chop) {
        rooms.chop = [chop];
      } else {
        rooms.chop.push(chop);
      }
      await rooms.save();

      const shelfs = await Shelf.findById(args.shelf);
      if (!shelfs.chop) {
        shelfs.chop = [chop];
      } else {
        shelfs.chop.push(chop);
      }
      await shelfs.save();

      let test = await Imchop.findById(imchop.id)
        .populate({
          path: "user",
          populate: { path: "imchops" },
        })
        .populate({
          path: "chop",
          populate: { path: "status" },
        })
        .populate({
          path: "chop",
          populate: { path: "imslaughter" },
        })
        .populate({
          path: "chop",
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

  createExportc: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.barcode || !args.storestatus || !args.exporter) {
      throw new Error("กรุณากรอกข้อมูลให้ครบ");
    }

    const date = dayjs();

    const chop = await Chop.findOne({
      barcode: args.barcode,
    });

    const exchop = await Imchop.findOne({
      barcode: args.barcode,
    });

    const exporter = await RequestExport.findById(args.exporter);

    const findfarmer = chop.imslaughter;
    const farmerName = await Imslaughter.findById(findfarmer);

    const finduser = userId;
    const username = await User.findById(finduser);

    const room = exchop.beefroom;

    const find =
      (await Imchop.findOne({
        barcode: args.barcode,
        name: "นำออก",
      }).countDocuments()) > 0;

    if (find) {
      throw new Error("ชิ้นเนื้อถูกนำออกไปเเล้ว");
    }

    if (chop) {
      const imchop = await Imchop.create({
        name: "นำออก",
        exportdate: date,
        user: userId,
        chop: chop,
        barcode: args.barcode,
        beeftype: chop.beeftype,
        namefarmer: farmerName.namefarmer,
        userName: username.name,
        storestatus: args.storestatus,
        exporter: exporter.name,
      });

      let result = await BeefStore.findByIdAndUpdate(
        {
          _id: "6284d7035415c34e54b2fc2c",
        },
        { $pull: { imchops: exchop.id } }
      );

      let r = await Beefroom.findByIdAndUpdate(
        {
          _id: room,
        },
        { $pull: { chop: chop } }
      );

      let test = await Imchop.findById(imchop.id)
        .populate({
          path: "user",
          populate: { path: "imchops" },
        })
        .populate({
          path: "chop",
          populate: { path: "status" },
        })
        .populate({
          path: "chop",
          populate: { path: "imslaughter" },
        })
        .populate({
          path: "chop",
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
};
export default Mutation;
