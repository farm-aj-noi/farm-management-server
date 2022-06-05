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

    /*  const currentRoom = await Improduct.find();
    const isRoomExist =
      currentRoom.findIndex((prod) => prod.barcode == args.barcode) > -1;

    if (isRoomExist) {
      throw new Error("บาร์โค้ดของคุณซ้ำ");
    } */

    const date = dayjs();

    const beefproduct = await Beefproduct.findOne({
      barcode: args.barcode,
    });

    const statusIM = "5f448d5d4ef8ed48806f1b53";

    const finduser = userId;
    const username = await User.findById(finduser);

    const freezer = await Freezer.findById(args.freezer);
    const y = freezer.typekeep2;
    const total = freezer.beefproduct;

    const type = beefproduct.producttype.toString();

    const typebeef = await Typekeep2.findOne({ _id: y, producttype: type });

    const findtype = typebeef.producttype.toString();

    const totalbeef = typebeef.totalproduct.toString();

    const isRoomEmpty = total.length == totalbeef;

    const pbasket = await Pbasket.findById(args.pbasket);

    const producttype = await Producttype.findById(type);

    //const exp = dayjs(beefproduct.MFG).add(producttype.BBE, "d").toISOString();
    

    await Beefproduct.findByIdAndUpdate(beefproduct.id, { status: statusIM });

    if (isRoomEmpty) {
      throw new Error("ตู้แช่ของคุณเต็มกรุณาเพิ่มตู้");
    }

    if (type !== findtype) {
      throw new Error("กรุณานำเข้าประเภทผลิตภัณฑ์ให้ถูกต้อง");
    }

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
};
export default Mutation;
