import Setting from "../../models/setting";
import SettingMedi from "../../models/settingMedi";
import Dayslaugh from "../../models/dayslaugh";

const Mutation = {
  // setting
  createsetting: async (parent, args, { userId }, info) => {
    // Check if user logged in
    if (!userId) throw new Error("Please log in.");

    if (!args.dateResetCount) {
      throw new Error("Please provide all required fields.");
    }
    return Setting.create({
      ...args,
      dateResetCountH: args.dateResetCount,
      dateResetCountQ: args.dateResetCount,
      dateResetCountL: args.dateResetCount,
      dateResetCountC: args.dateResetCount,
      dateResetCountE: args.dateResetCount,
    });
  },
  createDayslaugh: async (parent, args, { userId }, info) => {
    // Check if user logged in
    // if (!userId) throw new Error("Please log in.");

    // if (!args.dateResetCount) {
    //   throw new Error("Please provide all required fields.");
    // }
    return Dayslaugh.create({
      ...args,
    });
  },
  updateDayslaugh: async (parent, args, { userId }, info) => {
    const { id, year , month , weight } = args;

    // const imslaughter = await Dayslaugh.findById(id);

    // Update product in database
    await Dayslaugh.findByIdAndUpdate(id, {year:year , month:month , weight:weight});

    const updatedFinish = await Dayslaugh.findById(id)

    return updatedFinish;
  },
  setmedi: async (parent, args, { userId }, info) => {
    // Check if user logged in
    // if (!userId) throw new Error("Please log in.");

    // if (!args.dateResetCount) {
    //   throw new Error("Please provide all required fields.");
    // }
    return SettingMedi.create({
      ...args,
    });
  },
};

export default Mutation;
