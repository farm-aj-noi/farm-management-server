import dayjs from "dayjs";

import User from "../../models/user";
import Imslaughter from "../../models/imslaughter";
import Chop from "../../models/chop";
import Lump from "../../models/lump";
import Beeftype from "../../models/beeftype";
import Setting from "../../models/setting";
import Counter from "../../models/identitycounter";
import Feed from "../../models/feed";

const Mutation = {
  createFeed: async (parent, args, { userId }, info) => {
    // Check if user logged in
    if (!userId) throw new Error("Please log in.");

    if (
      !args.datestart ||
      !args.dateend ||
      !args.typefood ||
      !args.namefood ||
      !args.namecop ||
      !args.quantity ||
      !args.imslaughter
    ) {
      throw new Error("Please provide all required fields.");
    }

    // ทดสอบนำเข้า
    const datestart = dayjs(args.datestart).toISOString();
    const dateend = dayjs(args.dateend).toISOString();

    const feed = await Feed.create({
      datestart: datestart,
      dateend: dateend,
      typefood: args.typefood,
      namefood: args.namefood,
      namecop: args.namecop,
      cp: args.cp ? args.cp : "-",
      tdn: args.tdn ? args.tdn : "-",
      quantity: args.quantity,
      note: args.note,
      imslaughter: args.imslaughter,
    });
    // console.log(chop);

    const imslaughter = await Imslaughter.findById(args.imslaughter);
    if (!imslaughter.feeds) {
      imslaughter.feeds = [feed];
    } else {
      imslaughter.feeds.push(feed);
    }
    await imslaughter.save();

    return Feed.findById(feed.id).populate({
      path: "imslaughter",
    });
  },
};

export default Mutation;
