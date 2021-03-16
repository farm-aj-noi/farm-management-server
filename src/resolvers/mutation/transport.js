import dayjs from "dayjs";

import User from "../../models/user";
import Imslaughter from "../../models/imslaughter";
import Chop from "../../models/chop";
import Lump from "../../models/lump";
import Halve from "../../models/halve";
import Quarter from "../../models/quarter";
import Beeftype from "../../models/beeftype";
import Setting from "../../models/setting";
import Counter from "../../models/identitycounter";
import Transport from "../../models/transport";

const Mutation = {
  createTransport: async (parent, args, { userId }, info) => {
    // Check if user logged in
    if (!userId) throw new Error("Please log in.");

    if ( !args.name || !args.place || !args.barcode) {
      throw new Error("Please provide all required fields.");
    }

    // ทดสอบนำเข้า
    // const date = dayjs(args.date).toISOString();
    const date = dayjs()

    const chop = await Chop.findOne({
      barcode: args.barcode,
    });

    if (chop) {
      const transport = await Transport.create({
        date: date,
        name: args.name,
        place: args.place,
        note: args.note,
        chop: chop.id,
      });

      const link = await Chop.findById(chop.id);
      if (!link.transports) {
        link.transports = [transport];
      } else {
        link.transports.push(transport);
      }
      await link.save();
      return Transport.findById(transport.id);
    }

    const lump = await Lump.findOne({
      barcode: args.barcode,
    });
    if (lump) {
      const transport = await Transport.create({
        date: date,
        name: args.name,
        place: args.place,
        note: args.note,
        lump: lump.id,
      });

      const link = await Lump.findById(lump.id);
      if (!link.transports) {
        link.transports = [transport];
      } else {
        link.transports.push(transport);
      }
      await link.save();
      return Transport.findById(transport.id);
    }

    const quarter = await Quarter.findOne({
      barcode: args.barcode,
    });
    if (quarter) {
      const transport = await Transport.create({
        date: date,
        name: args.name,
        place: args.place,
        note: args.note,
        quarter: quarter.id,
      });

      const link = await Quarter.findById(quarter.id);
      if (!link.transports) {
        link.transports = [transport];
      } else {
        link.transports.push(transport);
      }
      await link.save();
      return Transport.findById(transport.id);
    }

    const halve = await Halve.findOne({
      barcode: args.barcode,
    });
    if (halve) {
      const transport = await Transport.create({
        date: date,
        name: args.name,
        place: args.place,
        note: args.note,
        halve: halve.id,
      });

      const link = await Halve.findById(halve.id);
      if (!link.transports) {
        link.transports = [transport];
      } else {
        link.transports.push(transport);
      }
      await link.save();
      return Transport.findById(transport.id);
    }

  },
};

export default Mutation;
