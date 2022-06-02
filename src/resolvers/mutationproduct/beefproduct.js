import Beefproduct from "../../models/Productstore/beefproduct";
import dayjs from "dayjs";
import User from "../../models/user";
import Producttype from "../../models/Productstore/producttype";
import Setting from "../../models/setting";
import Counter from "../../models/identitycounter";

const Mutation = {
  createBeefproduct: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.weightwarm || !args.producttype) {
      throw new Error("Please provide all required fields.");
    }

    const SettingResetdate = await Setting.findOne({});

    const checkDate = await parseInt(dayjs().format("YYYYMMDD").toString());
    if (SettingResetdate.dateResetCountP < checkDate) {
      await Halve.resetCount();
      await Setting.findByIdAndUpdate(SettingResetdate.id, {
        dateResetCountP: checkDate,
      });
    }

    const statusId = "5f0fdb4b02b40c2ab8506563";
    const exp = await Producttype.findById(args.Producttype);

    const DateNow = dayjs().toISOString();
    const DateMFG = dayjs().add(exp.BBE, "d").toISOString();

    const product = await Beefproduct.create({
      ...args,
      MFG: DateNow,
      BBE: DateMFG,
      status: statusId,
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
      })
  },
};
export default Mutation;
