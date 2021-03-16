import User from "../../models/user";
import Status from "../../models/status";

const Mutation = {
  // สถานะ
  createStatus: async (parent, args, { userId }, info) => {
    // Check if user logged in
    // if (!userId) throw new Error("Please log in.");

    if (!args.code || !args.nameTH || !args.nameEN) {
      throw new Error("Please provide all required fields.");
    }

    // Check if code already exist in database
    const code = args.code.trim().toLowerCase();
    const currentCode = await Status.find({});
    const isCodeExist =
      currentCode.findIndex((status) => status.code === code) > -1;

    if (isCodeExist) {
      throw new Error("Code already exist.");
    }

    const status = await Status.create({ ...args, user: userId });

    const user = await User.findById(userId);
    if (!user.statuses) {
      user.statuses = [status];
    } else {
      user.statuses.push(status);
    }
    await user.save();

    return Status.findById(status.id).populate({
      path: "user",
      populate: { path: "statuses" },
    });
  },
  updateStatus: async (parent, args, { userId }, info) => {
    const { id, code, nameTH, nameEN } = args;

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    const status = await Status.findById(id);

    // Form updated information
    const updateInfo = {
      code: !!code ? code : status.code,
      nameTH: !!nameTH ? nameTH : status.nameTH,
      nameEN: !!nameEN ? nameEN : status.nameEN,
    };

    // Update product in database
    await Status.findByIdAndUpdate(id, updateInfo);

    // Find the updated Product
    const updatedFinish = await Status.findById(id).populate({
      path: "user",
    });

    return updatedFinish;
  },
  deleteStatus: async (parent, args, { userId }, info) => {
    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    // TODO: user id from request --> Find user
    const user = await User.findById(userId);

    // Delete status
    const deletedStatus = await Status.findByIdAndDelete(args.id);

    // Update user's statuses
    const updatedLinkUser = user.statuses.filter(
      (statusId) => statusId.toString() !== deletedStatus.id.toString()
    );

    await User.findByIdAndUpdate(userId, { statuses: updatedLinkUser });

    return deletedStatus;
  },
};

export default Mutation;
