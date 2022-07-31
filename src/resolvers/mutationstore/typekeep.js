import Beefroom from "../../models/Beefstore/beefroom";
import Shelf from "../../models/Beefstore/shelf";
import Typekeep from "../../models/Beefstore/typekeep";
import Beeftype from "../../models/beeftype";

const Mutation = {
  createtypekeep: async (parent, args, { userId }, info) => {
    if (!args.totalbeef || !args.beeftype) {
      throw new Error("กรุณากรอกข้อมูลให้ครบ");
    }

    const beeftype = await Beeftype.findById(args.beeftype);

    const room = await Beefroom.findById(args.beefroom);
    const findshelf = await Shelf.findById(args.shelf);

    
    if (args.beefroom) {
      const check1 = await Typekeep.find({
        beefroom: args.beefroom,
      });

      for (let i = 0; i < check1.length; i++) {
        let x = check1[0].beeftype;
        const check = x !== check1[i].beeftype
        if (check) {
          throw new Error("ประเภทชิ้นเนื้อซ้ำ");
        }
        console.log(x !== check1[i].beeftype);
      }
    }

    const keep = await Typekeep.create({
      totalbeef: args.totalbeef,
      beeftype: beeftype,
      beefroom: room,
      shelf: findshelf,
    });

    if (args.beefroom) {
      const beefroom = await Beefroom.findById(args.beefroom);
      if (!beefroom.typekeep) {
        beefroom.typekeep = [keep];
      } else {
        beefroom.typekeep.push(keep);
      }
      await beefroom.save();
    } else {
      const shelfs = await Shelf.findById(args.shelf);
      if (!shelfs.typekeep) {
        shelfs.typekeep = [keep];
      } else {
        shelfs.typekeep.push(keep);
      }
      await shelfs.save();
    }

    let test = await Typekeep.findById(keep.id)
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "beefroom",
      })
      .populate({
        path: "shelf",
      });
    return test;
  },

  uppdatetypekeep: async (parent, args, { userId }, info) => {
    const { id, totalbeef } = args;

    const typekeep = await Typekeep.findById(id);

    const updateInfo = {
      totalbeef: !!totalbeef ? totalbeef : typekeep.totalbeef,
    };

    await Typekeep.findByIdAndUpdate(id, updateInfo);

    const updatedFinish = await Typekeep.findById(id);
    return updatedFinish;
  },

  deletetypekeep: async (parent, args, { userId }, info) => {
    const type = await Typekeep.findById(args.id);

    if (type.shelf == null) {
      const room = await Beefroom.findOne({ typekeep: args.id });
      const rooms = room.id;

      let result = await Beefroom.findByIdAndUpdate(
        {
          _id: rooms,
        },
        { $pull: { typekeep: type.id } }
      );
    } else {
      const shelf = await Shelf.findOne({ typekeep: args.id });
      const shelfs = shelf.id;

      let r = await Shelf.findByIdAndUpdate(
        {
          _id: shelfs,
        },
        { $pull: { typekeep: type.id } }
      );
    }

    const deletetype = await Typekeep.findByIdAndDelete(type);
    return deletetype;
  },
};
export default Mutation;
