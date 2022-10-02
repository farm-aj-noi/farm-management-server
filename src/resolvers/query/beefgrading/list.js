import Grading from "../../../models/Grade/grading";
import Halve from "../../../models/halve";
import Imslaughter from "../../../models/imslaughter";

const Query = {
  listhalvegrade: async (parent, args, context, info) => {
    const cursor = Halve.find({
      gradestatus: "63315bdbc1bc490068807e03",
      chillstatus: "6284ad91fbfac22364a6e431",
    })

      .populate({
        path: "beeftype",
      })
      .populate({
        path: "chill",
        populate: { path: "chillroom" },
      })
      .populate({
        path: "imslaughter",
      });

    return cursor;
  },
  Cowgrade: async (parent, args, context, info) => {
    const cursor = Halve.find({
      _id: args.id,
    })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "chill",
        populate: { path: "chillroom" },
      })
      .populate({
        path: "imslaughter",
      })
      .populate({
        path: "grade",
      });
    return cursor;
  },
  listGrade: async (parent, args, context, info) => {
    const cursor = Grading.find({
      _id: args.id,
    });
    return cursor;
  },
  historyGrade: async (parent, args, context, info) => {
    const cursor = Halve.find({
      gradestatus: "63315c03c1bc490068807e04",
    })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "chill",
        populate: { path: "chillroom" },
      })
      .populate({
        path: "imslaughter",
      })
      .populate({
        path: "grade",
      });
    return cursor;
  },
};

export default Query;
