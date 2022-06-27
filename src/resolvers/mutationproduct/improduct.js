import Improduct from "../../models/Productstore/improduct";
import Beefproduct from "../../models/Productstore/beefproduct";
import dayjs from "dayjs";
import User from "../../models/user";
import Typekeep2 from "../../models/Productstore/typekeep2";
import Productroom from "../../models/Productstore/productroom";
import ProductStore from "../../models/Productstore/productstore";
import Freezer from "../../models/Productstore/freezer";
import Pbasket from "../../models/Productstore/pbasket";
import Producttype from "../../models/Productstore/producttype";
import RequestExportP from "../../models/Productstore/requestexportp";

const Mutation = {
  createImproduct: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (
      !args.barcode ||
      !args.productstore ||
      !args.productroom ||
      !args.freezer ||
      !args.pbasket
    ) {
      throw new Error("กรุณากรอกบาร์โค้ด");
    }

    const currentRoom = await Improduct.find();
    const isRoomExist =
      currentRoom.findIndex((prod) => prod.barcode == args.barcode) > -1;

    if (isRoomExist) {
      throw new Error("บาร์โค้ดของคุณซ้ำ");
    }

    const date = dayjs();

    const beefproduct = await Beefproduct.findOne({
      barcode: args.barcode,
    });

    const statusIM = "5f448d5d4ef8ed48806f1b53";

    const finduser = userId;
    const username = await User.findById(finduser);

    const pbasket = await Pbasket.findById(args.pbasket);

    const improduct = await Improduct.create({
      name: "นำเข้า",
      importdate: date,
      user: userId,
      beefproduct: beefproduct,
      barcode: args.barcode,
      storestatus: beefproduct.status,
      producttype: beefproduct.producttype,
      userName: username.name,
      productroom: args.productroom,
      freezer: args.freezer,
      pbasket: pbasket.basketname,
      Expdate: beefproduct.BBE,
    });

    const store = await ProductStore.findById(args.productstore);
    if (!store.improduct) {
      store.improduct = [improduct];
    } else {
      store.improduct.push(improduct);
    }
    await store.save();

    const rooms = await Productroom.findById(args.productroom);
    if (!rooms.beefproduct) {
      rooms.beefproduct = [beefproduct];
    } else {
      rooms.beefproduct.push(beefproduct);
    }
    await rooms.save();

    const freezers = await Freezer.findById(args.freezer);
    if (!freezers.beefproduct) {
      freezers.beefproduct = [beefproduct];
    } else {
      freezers.beefproduct.push(beefproduct);
    }
    await freezers.save();

    let test = await Improduct.findById(improduct.id)
      .populate({
        path: "user",
        populate: { path: "improducts" },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "producttype" },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "status" },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "chop", populate: { path: "imslaughter" } },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "lump", populate: { path: "imslaughter" } },
      })
      .populate({
        path: "producttype",
      })
      .populate({
        path: "storestatus",
      })
      .populate({
        path: "productroom",
      })
      .populate({
        path: "freezer",
      });

    console.log(test);
    return test;
  },

  createExproduct: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.barcode || !args.storestatus || !args.exporter) {
      throw new Error("กรุณากรอกข้อมูลให้ครบ");
    }

    const date = dayjs();

    const product = await Beefproduct.findOne({
      barcode: args.barcode,
    });

    const exproduct = await Improduct.findOne({
      barcode: args.barcode,
    });

    const e = await Improduct.findOne({
      barcode: args.barcode,
      name: "นำเข้า",
    });

    const exporter = await RequestExportP.findById(args.exporter);

    const finduser = userId;
    const username = await User.findById(finduser);

    const room = exproduct.productroom;

    const find =
      (await Improduct.findOne({
        barcode: args.barcode,
        name: "นำออก",
      }).countDocuments()) > 0;

    if (find) {
      throw new Error("ซากโคผ่าเสี้ยวนี้ถูกนำออกไปเเล้ว");
    }

    await Improduct.findByIdAndUpdate(e.id, {
      storestatus: "62a30cdccb9cda7371a7cd7f",
    });

    if (product) {
      const improduct = await Improduct.create({
        name: "นำออก",
        exportdate: date,
        user: userId,
        beefproduct: product,
        barcode: args.barcode,
        producttype: product.producttype,
        userName: username.name,
        storestatus: args.storestatus,
        exporter: exporter.name,
      });

      let result = await ProductStore.findByIdAndUpdate(
        {
          _id: "629cb4035d8e2a65ce3e3800",
        },
        { $pull: { improduct: exproduct.id } }
      );

      let r = await Productroom.findByIdAndUpdate(
        {
          _id: room,
        },
        { $pull: { beefproduct: product } }
      );

      let test = await Improduct.findById(improduct.id)
        .populate({
          path: "user",
          populate: { path: "improducts" },
        })
        .populate({
          path: "beefproduct",
          populate: { path: "producttype" },
        })
        .populate({
          path: "beefproduct",
          populate: { path: "status" },
        })
        .populate({
          path: "beefproduct",
          populate: { path: "chop", populate: { path: "imslaughter" } },
        })
        .populate({
          path: "beefproduct",
          populate: { path: "lump", populate: { path: "imslaughter" } },
        })
        .populate({
          path: "producttype",
        })
        .populate({
          path: "storestatus",
        })
        .populate({
          path: "productroom",
        })
        .populate({
          path: "freezer",
        });

      return test;
    }
  },
};
export default Mutation;
