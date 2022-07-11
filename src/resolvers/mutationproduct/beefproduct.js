import Beefproduct from "../../models/Productstore/beefproduct";
import dayjs from "dayjs";
import User from "../../models/user";
import Producttype from "../../models/Productstore/producttype";
import Setting from "../../models/setting";
import Counter from "../../models/identitycounter";
import Lump from "../../models/lump";
import Chop from "../../models/chop";

const Mutation = {
  createBeefproduct: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.weight || !args.producttype) {
      throw new Error("Please provide all required fields.");
    }

    const SettingResetdate = await Setting.findOne({});

    const checkDate = await parseInt(dayjs().format("YYYYMMDD").toString());
    if (SettingResetdate.dateResetCountP < checkDate) {
      await Beefproduct.resetCount();
      await Setting.findByIdAndUpdate(SettingResetdate.id, {
        dateResetCountP: checkDate,
      });
    }

    const statusId = "5f0fdb4b02b40c2ab8506563";
    const exp = await Producttype.findById(args.producttype);

    const DateNow = dayjs().toISOString();
    const DateMFG = dayjs().add(exp.BBE, "d").toISOString();

    const product = await Beefproduct.create({
      ...args,
      status: statusId,
      MFG: DateNow,
      BBE: DateMFG,

      user: userId,
    });

    //barcode
    const DateCode = dayjs().format("YYYYMMDD").toString();
    const checkcount = await Counter.findOne({
      model: "Beefproduct",
    });

    const count = checkcount.count.toString().padStart(4, "0");

    const BeefCode = exp.code.toUpperCase().padStart(3, "0");
    const barcodeinput = DateCode + "P" + BeefCode + count;
    // console.log(barcodeinput);
    await Beefproduct.findByIdAndUpdate(product.id, { barcode: barcodeinput });

    const user = await User.findById(userId);
    if (!user.beefproduct) {
      user.beefproduct = [product];
    } else {
      user.beefproduct.push(product);
    }
    await user.save();

    return Beefproduct.findById(product.id)
      .populate({
        path: "user",
        populate: { path: "beefproduct" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "producttype",
      });
  },
  updateBeefProduct: async (parent, args, { userId }, info) => {
    
    const lump = await Lump.findOne({
      barcode: args.barcode
    });
    const chop = await Chop.findOne({
      barcode: args.barcode
    });

    const findl =
      (await Beefproduct.findOne({
        _id: args.id,
        lump: lump,
      }).countDocuments()) > 0;

    const findc =
      (await Beefproduct.findOne({
        _id: args.id,
        chop: chop,
      }).countDocuments()) > 0;

    const product = await Beefproduct.findById(args.id);

    if (lump) {
      if (findl) {
        throw new Error("ข้อมูลก้อนเนื้อซ้ำ");
      }
      if (!product.lump) {
        product.lump = [lump];
      } else {
        product.lump.push(lump);
      }
      await product.save();

      await Lump.findByIdAndUpdate(lump.id, {
        Productstatus: "62b95adc1b771c3d8ae74a05",
      });
    }

    if (chop) {
      if (findc) {
        throw new Error("ข้อมูลชิ้นเนื้อซ้ำ");
      }
      if (!product.chop) {
        product.chop = [chop];
      } else {
        product.chop.push(chop);
      }
      await product.save();

      await Chop.findByIdAndUpdate(chop.id, {
        Productstatus: "62b95adc1b771c3d8ae74a05",
      });
      
    }

    const updatedFinish = await Beefproduct.findById(args.id)
      .populate({
        path: "user",
        populate: { path: "beefproduct" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "producttype",
      })
      .populate({
        path: "lump",
        populate: { path: "imslaughter" },
      })
      .populate({
        path: "chop",
        populate: { path: "imslaughter" },
      });
    return updatedFinish;
  },
};
export default Mutation;
