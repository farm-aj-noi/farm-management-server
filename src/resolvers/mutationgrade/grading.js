import Grading from "../../models/Grade/grading";
import User from "../../models/user";
import Halve from "../../models/halve";

const Mutation = {
  createGrade: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");
    const finduser = userId;
    const user = await User.findById(finduser);

    const Statusgrade = "63315c03c1bc490068807e04";

    await Halve.findByIdAndUpdate(args.halve, {
      gradestatus: Statusgrade,
    });

    const grading = await Grading.create({
      pic: args.pic,
      userName: user.name,
      Halve: args.halve,
      SystemGrade: args.SystemGrade,
    });

    const halve = await Halve.findById(args.halve);

    if (!halve.grade) {
      halve.grade = [grading];
    } else {
      halve.grade.push(grading);
    }
    await halve.save();

    let returnData = await Grading.findById(grading.id).populate({
      path: "halve",
    });
    return returnData;
  },
  updateGrading: async (parent, args, { userId }, info) => {
    const {
      ExpertName1,
      ExpertName2,
      ExpertName3,
      ExpertName4,
      ExpertName5,
      ExpertGrade,
    } = args;

    const halve = await Halve.findOne({ grade: args.id });
    const halves = halve.id

    const statusGr = "633d4b62060eb95494a85ad3";
    const update = await Grading.findById(args.id);

    const updateInfo = {
      ExpertName1: !!ExpertName1 ? ExpertName1 : update.ExpertName1,
      ExpertName2: !!ExpertName2 ? ExpertName2 : update.ExpertName2,
      ExpertName3: !!ExpertName3 ? ExpertName3 : update.ExpertName3,
      ExpertName4: !!ExpertName4 ? ExpertName4 : update.ExpertName4,
      ExpertName5: !!ExpertName5 ? ExpertName5 : update.ExpertName5,
      ExpertGrade: !!ExpertGrade ? ExpertGrade : update.ExpertGrade,
    };

    await Halve.findByIdAndUpdate(halves, { gradestatus: statusGr });

    await Grading.findByIdAndUpdate(args.id, updateInfo);
    const updatedFinish = await Grading.findById(args.id);
    return updatedFinish;
  },
};
export default Mutation;
