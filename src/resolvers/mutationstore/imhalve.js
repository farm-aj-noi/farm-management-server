import Halve from "../../models/halve";
import Imhalve from "../../models/Beefstore/imhalve";
import dayjs from "dayjs";
import BeefStore from "../../models/Beefstore/beefstore";
import Imslaughter from "../../models/imslaughter";
import User from "../../models/user";
import Beefroom from "../../models/Beefstore/beefroom";
import Typekeep from "../../models/Beefstore/typekeep";
import RequestExport from "../../models/Beefstore/requestexport";
import ExpdateSetting from "../../models/Beefstore/expdatesetting";

const Mutation = {
  createImHalve: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.barcode || !args.beefstore || !args.beefroom) {
      throw new Error("กรุณากรอกบาร์โค้ด");
    }

    /* const currentRoom = await Imhalve.find();
        const isRoomExist = 
            currentRoom.findIndex((prod) => prod.barcode == args.barcode) > -1;
            
        if (isRoomExist) {
            throw new Error("บาร์โค้ดของคุณซ้ำ");
        }
 */
    const date = dayjs();

    //const test = await Imhalve.find( {name: "นำเข้า"} ).count()

    const halve = await Halve.findOne({
      barcode: args.barcode,
    });

    const statusIM = "5f448d5d4ef8ed48806f1b53";

    const findfarmer = halve.imslaughter;
    const farmerName = await Imslaughter.findById(findfarmer);

    const finduser = userId;
    const username = await User.findById(finduser);

    const room = await Beefroom.findById(args.beefroom);
    const y = room.typekeep;
    const totalhalve = room.halve;

    const type = halve.beeftype.toString();

    const typebeef = await Typekeep.findOne({ _id: y, beeftype: type });

    const findtype = typebeef.beeftype.toString();

    const totalbeef = typebeef.totalbeef.toString();

    const isRoomEmpty = totalhalve.length == totalbeef;

    if (isRoomEmpty) {
      throw new Error("ห้องของคุณเต็มกรุณาเพิ่มประเภทจัดเก็บ");
    }

    if (type !== findtype) {
      throw new Error("กรุณานำเข้าประเภทชิ้นเนื้อให้ถูกต้อง");
    }

    if (halve) {
      const imhalve = await Imhalve.create({
        name: "นำเข้า",
        importdate: date,
        user: userId,
        halve: halve,
        barcode: args.barcode,
        beeftype: halve.beeftype,
        namefarmer: farmerName.namefarmer,
        userName: username.name,
        storestatus: statusIM,
        beefroom: args.beefroom,
      });

      const store = await BeefStore.findById(args.beefstore);
      if (!store.imhalves) {
        store.imhalves = [imhalve];
      } else {
        store.imhalves.push(imhalve);
      }
      await store.save();

      const rooms = await Beefroom.findById(args.beefroom);
      if (!rooms.halve) {
        rooms.halve = [halve];
      } else {
        rooms.halve.push(halve);
      }
      await rooms.save();

      let test = await Imhalve.findById(imhalve.id)
        .populate({
          path: "user",
          populate: { path: "imhalves" },
        })
        .populate({
          path: "halve",
          populate: { path: "status" },
        })
        .populate({
          path: "halve",
          populate: { path: "imslaughter" },
        })
        .populate({
          path: "halve",
          populate: { path: "beeftype" },
        })
        .populate({
          path: "halve",
          populate: { path: "chill", populate: { path: "chillstatus" } },
        })
        .populate({
          path: "beeftype",
        })
        .populate({
          path: "storestatus",
        })
        .populate({
          path: "beefroom",
        });

      console.log(test);
      return test;
    }
  }, 

  createExporth: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Please log in.");

    if (!args.barcode || !args.storestatus || !args.exporter) {
      throw new Error("กรุณากรอกข้อมูลให้ครบ");
    }

    const date = dayjs();

    const halve = await Halve.findOne({
      barcode: args.barcode,
    });

    const exhalve = await Imhalve.findOne({
      barcode: args.barcode,
    });

    const exporter = await RequestExport.findById(args.exporter);

    const f = halve.imslaughter;
    const farmerName = await Imslaughter.findById(f);

    const finduser = userId;
    const username = await User.findById(finduser);

    const room = exhalve.beefroom;

    const find =
      (await Imhalve.findOne({
        barcode: args.barcode,
        name: "นำออก",
      }).countDocuments()) > 0;

    if (find) {
      throw new Error("ซากโคผ่าเสี้ยวนี้ถูกนำออกไปเเล้ว");
    }

    if (halve) {
      const imhalve = await Imhalve.create({
        name: "นำออก",
        exportdate: date,
        user: userId,
        halve: halve,
        barcode: args.barcode,
        beeftype: halve.beeftype,
        namefarmer: farmerName.namefarmer,
        userName: username.name,
        storestatus: args.storestatus,
        exporter: exporter,
      });

      let result = await BeefStore.findByIdAndUpdate(
        {
          _id: "6284d7035415c34e54b2fc2c",
        },
        { $pull: { imhalves: exhalve.id } }
      );

      let r = await Beefroom.findByIdAndUpdate(
        {
          _id: room,
        },
        { $pull: { halve: halve } }
      );

      let test = await Imhalve.findById(imhalve.id)
        .populate({
          path: "user",
          populate: { path: "imhalves" },
        })
        .populate({
          path: "halve",
          populate: { path: "status" },
        })
        .populate({
          path: "halve",
          populate: { path: "imslaughter" },
        })
        .populate({
          path: "halve",
          populate: { path: "beeftype" },
        })
        .populate({
          path: "beeftype",
        })
        .populate({
          path: "storestatus",
        })
        .populate({
          path: "beefroom",
        })
        .populate({
          path: "shelf",
        })
        .populate({
          path: "exporter",
        });

      return test;
    }
  },

  updateExpdateh: async (parent, args, { userId }, info) => {
    
    const imhalve = await Imhalve.find({name: "นำเข้า"})

    const find = await ExpdateSetting.findById(args.ExpdateSetting)

    const checkdate = dayjs().format("YYYYMMDD").toString();
    
    const y = find.totalday
    const exp = Number(y)

    
    /* console.log(exp)
    return */

    for(let i=0; i < imhalve.length; i++){
        const date = dayjs(imhalve[i].importdate).add(30, 'days').subtract(exp, 'days')//.format("YYYYMMDD")//.toString()  
        
        
        await Imhalve.findByIdAndUpdate(imhalve[i].id, {almostExpdate : date})
        
    
    }
    
    
    
    





  }
};
export default Mutation;
