import BeefStore from "../../../models/Beefstore/beefstore";
import Imhalve from "../../../models/Beefstore/imhalve";
import Imquarter from "../../../models/Beefstore/imquarter";
import dayjs from "dayjs";
import Imlump from "../../../models/Beefstore/imlump";
import Imchop from "../../../models/Beefstore/imchop";
import Imentrail from "../../../models/Beefstore/imentrail";
import EntrailStore from "../../../models/Beefstore/entrailstore";
import Chill from "../../../models/Beefstore/chill";
import Beefroom from "../../../models/Beefstore/beefroom";
import Shelf from "../../../models/Beefstore/shelf";
import Halve from "../../../models/halve";
import RequestExport from "../../../models/Beefstore/requestexport";
import Chillday from "../../../models/Beefstore/chillday";
import Basket from "../../../models/Beefstore/basket";
import ExpdateSetting from "../../../models/Beefstore/expdatesetting";

const Query = {
  liststore: async (parent, args, context, info) => {
    const cursor = await BeefStore.find({})
      .populate({
        path: "imhalves",
        populate: { path: "halve" },
      })
      /* .populate({
          path: "imhalves",
          populate: {path: "user", 
          populate: {path: "curings"}}
      }) */
      .populate({
        path: "imhalves",
        populate: { path: "storestatus" },
      })
      .populate({
        path: "imhalves",
        populate: { path: "halve", populate: { path: "imslaughter" } },
      })
      .populate({
        path: "imhalves",
        populate: { path: "halve", populate: { path: "beeftype" } },
      })
      .populate({
        path: "imhalves",
        populate: { path: "beefroom" },
      })
      ///////////////////////////////////////
      .populate({
        path: "imquarters",
        populate: { path: "quarter" },
      })
      .populate({
        path: "imquarters",
        populate: { path: "storestatus" },
      })
      .populate({
        path: "imquarters",
        populate: { path: "quarter", populate: { path: "imslaughter" } },
      })
      .populate({
        path: "imquarters",
        populate: { path: "quarter", populate: { path: "beeftype" } },
      })
      .populate({
        path: "imquarters",
        populate: { path: "beefroom" },
      })
      /////////////////////////////////////
      .populate({
        path: "imlumps",
        populate: { path: "lump" },
      })
      .populate({
        path: "imlumps",
        populate: { path: "storestatus" },
      })
      .populate({
        path: "imlumps",
        populate: { path: "lump", populate: { path: "imslaughter" } },
      })
      .populate({
        path: "imlumps",
        populate: { path: "lump", populate: { path: "beeftype" } },
      })
      .populate({
        path: "imlumps",
        populate: { path: "beefroom" },
      })
      .populate({
        path: "imlumps",
        populate: { path: "shelf" },
      })
      /////////////////////////////////////
      .populate({
        path: "imchops",
        populate: { path: "chop" },
      })
      .populate({
        path: "imchops",
        populate: { path: "storestatus" },
      })
      .populate({
        path: "imchops",
        populate: { path: "chop", populate: { path: "imslaughter" } },
      })
      .populate({
        path: "imchops",
        populate: { path: "chop", populate: { path: "beeftype" } },
      })
      .populate({
        path: "imchops",
        populate: { path: "beefroom" },
      })
      .populate({
        path: "imchops",
        populate: { path: "shelf" },
      });

    var returnData = [];

    if (cursor.length) {
      for (const item of cursor[0].imhalves) {
        //console.log(cursor[0].imhalves.length)
        let data = {
          beeftypeid: item.halve.beeftype.id,
          id: "ซากโคผ่าซีก",
          barcode: item.barcode,
          weightwarm: item.halve.weightwarm,
          importdate: item.importdate,
          beeftype: item.halve.beeftype.nameTH,
          cownum: item.halve.imslaughter.numcow,
          status: item.storestatus.nameTH,
          code: item.halve.beeftype.code,
          namefarmer: item.halve.imslaughter.namefarmer,
          beefroom: item.beefroom.roomname,
        };
        returnData.push(data);
      }
      ////////////////////////////////////////////////////////////
      for (const item of cursor[0].imquarters) {
        let data = {
          beeftypeid: item.quarter.beeftype.id,
          id: "ซากโคสี่เสี้ยว",
          barcode: item.barcode,
          importdate: item.importdate,
          weight: item.quarter.weight,
          beeftype: item.quarter.beeftype.nameTH,
          cownum: item.quarter.imslaughter.numcow,
          code: item.quarter.beeftype.code,
          status: item.storestatus.nameTH,
          namefarmer: item.quarter.imslaughter.namefarmer,
          beefroom: item.beefroom.roomname,
        };
        returnData.push(data);
      }
      ////////////////////////////////////////////////////////////
      for (const item of cursor[0].imlumps) {
        let data = {
          beeftypeid: item.lump.beeftype.id,
          id: "ก้อนเนื้อ",
          barcode: item.barcode,
          importdate: item.importdate,
          weight: item.lump.weight,
          beeftype: item.lump.beeftype.nameTH,
          cownum: item.lump.imslaughter.numcow,
          code: item.lump.beeftype.code,
          status: item.storestatus.nameTH,
          namefarmer: item.lump.imslaughter.namefarmer,
          beefroom: item.beefroom.roomname,
          shelf: item.shelf.shelfname,
          basket: item.basket,
        };
        returnData.push(data);
      }
      ////////////////////////////////////////////////////////////
      for (const item of cursor[0].imchops) {
        let data = {
          beeftypeid: item.chop.beeftype.id,
          id: "ชิ้นเนื้อ",
          barcode: item.barcode,
          importdate: item.importdate,
          weight: item.chop.weight,
          beeftype: item.chop.beeftype.nameTH,
          cownum: item.chop.imslaughter.numcow,
          code: item.chop.beeftype.code,
          status: item.storestatus.nameTH,
          namefarmer: item.chop.imslaughter.namefarmer,
          beefroom: item.beefroom.roomname,
          shelf: item.shelf.shelfname,
          basket: item.basket,
        };
        returnData.push(data);
      }
    }
    returnData.sort((a, b) => b.importdate - a.importdate);
    if (args.beeftype) {
      returnData = returnData.filter((e) => e.beeftypeid == args.beeftype);
    }
    if (args.type) {
      returnData = returnData.filter((e) => e.id == args.type);
    }
    return returnData;
  },

  listentrail: async (parent, args, context, info) => {
    let result = await EntrailStore.find({})
      .populate({
        path: "imentrails",
        populate: { path: "entrail" },
      })
      .populate({
        path: "imentrails",
        populate: { path: "entrail", populate: { path: "imslaughter" } },
      })
      .populate({
        path: "imentrails",
        populate: { path: "beefroom" },
      });

    var returnData = [];
    console.log(result);
    for (const item of result[0].imentrails) {
      let data = {
        id: "เครื่องใน",
        barcode: item.barcode,
        importdate: item.importdate,
        cownum: item.entrail.imslaughter.numcow,
        namefarmer: item.entrail.imslaughter.namefarmer,
        offal: item.entrail.offal,
        toe: item.entrail.toe,
        head: item.entrail.head,
        skin: item.entrail.skin,
        liver: item.entrail.liver,
        fat: item.entrail.fat,
        onkale: item.entrail.onkale,
        tail: item.entrail.tail,
        gallbladder: item.entrail.gallbladder,
        scrap: item.entrail.scrap,
        beefroom: item.beefroom.roomname,
      };
      returnData.push(data);
    }
    returnData.sort((a, b) => b.importdate - a.importdate);

    return returnData;
  },

  imhalveSearch: async (parent, args, context, info) => {
    const cursor = Imhalve.find({
      name: "นำเข้า",
    })
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
      .sort({ importdate: "DESC" });
    if (args.beeftype) {
      cursor.find({
        beeftype: args.beeftype,
      });
    }
    if (args.namefarmer) {
      cursor.find({
        namefarmer: args.namefarmer,
      });
    }
    if (args.userName) {
      cursor.find({
        userName: args.userName,
      });
    }
    if (args.startdate) {
      cursor.find({
        importdate: {
          $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
          $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
        },
      });
    }
    return cursor;
  },

  imquartSearch: async (parent, args, context, info) => {
    const cursor = Imquarter.find({
      name: "นำเข้า",
    })
      .populate({
        path: "user",
        populate: { path: "imquarter" },
      })
      .populate({
        path: "quarter",
        populate: { path: "status" },
      })
      .populate({
        path: "quarter",
        populate: { path: "imslaughter" },
      })
      .populate({
        path: "quarter",
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

      .sort({ importdate: "DESC" });
    if (args.beeftype) {
      cursor.find({
        beeftype: args.beeftype,
      });
    }
    if (args.namefarmer) {
      cursor.find({
        namefarmer: args.namefarmer,
      });
    }
    if (args.userName) {
      cursor.find({
        userName: args.userName,
      });
    }
    if (args.startdate) {
      cursor.find({
        importdate: {
          $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
          $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
        },
      });
    }

    return cursor;
  },

  exporthalve: async (parent, args, context, info) => {
    const cursor = Imhalve.find({
      name: "นำออก",
    })
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
      .sort({ exportdate: "DESC" });
    if (args.beeftype) {
      cursor.find({
        beeftype: args.beeftype,
      });
    }
    if (args.namefarmer) {
      cursor.find({
        namefarmer: args.namefarmer,
      });
    }
    if (args.userName) {
      cursor.find({
        userName: args.userName,
      });
    }
    if (args.exporter) {
      cursor.find({
        exporter: args.exporter,
      });
    }
    if (args.startdate) {
      cursor.find({
        exportdate: {
          $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
          $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
        },
      });
    }
    return cursor;
  },

  exportquart: async (parent, args, context, info) => {
    const cursor = Imquarter.find({
      name: "นำออก",
    })
      .populate({
        path: "user",
        populate: { path: "imquarters" },
      })
      .populate({
        path: "quarter",
        populate: { path: "status" },
      })
      .populate({
        path: "quarter",
        populate: { path: "imslaughter" },
      })
      .populate({
        path: "quarter",
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
      .sort({ exportdate: "DESC" });
    if (args.beeftype) {
      cursor.find({
        beeftype: args.beeftype,
      });
    }
    if (args.namefarmer) {
      cursor.find({
        namefarmer: args.namefarmer,
      });
    }
    if (args.userName) {
      cursor.find({
        userName: args.userName,
      });
    }
    if (args.exporter) {
      cursor.find({
        exporter: args.exporter,
      });
    }
    if (args.startdate) {
      cursor.find({
        exportdate: {
          $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
          $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
        },
      });
    }

    return cursor;
  },

  imlumpSearch: async (parent, args, context, info) => {
    const cursor = Imlump.find({
      name: "นำเข้า",
    })
      .populate({
        path: "user",
        populate: { path: "imlumps" },
      })
      .populate({
        path: "lump",
        populate: { path: "status" },
      })
      .populate({
        path: "lump",
        populate: { path: "imslaughter" },
      })
      .populate({
        path: "lump",
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
      .sort({ importdate: "DESC" });
    if (args.beeftype) {
      cursor.find({
        beeftype: args.beeftype,
      });
    }
    if (args.namefarmer) {
      cursor.find({
        namefarmer: args.namefarmer,
      });
    }
    if (args.userName) {
      cursor.find({
        userName: args.userName,
      });
    }
    if (args.startdate) {
      cursor.find({
        importdate: {
          $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
          $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
        },
      });
    }

    return cursor;
  },

  exportlump: async (parent, args, context, info) => {
    const cursor = Imlump.find({
      name: "นำออก",
    })
      .populate({
        path: "user",
        populate: { path: "imlumps" },
      })
      .populate({
        path: "lump",
        populate: { path: "status" },
      })
      .populate({
        path: "lump",
        populate: { path: "imslaughter" },
      })
      .populate({
        path: "lump",
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
      .sort({ exportdate: "DESC" });
    if (args.beeftype) {
      cursor.find({
        beeftype: args.beeftype,
      });
    }
    if (args.namefarmer) {
      cursor.find({
        namefarmer: args.namefarmer,
      });
    }
    if (args.userName) {
      cursor.find({
        userName: args.userName,
      });
    }
    if (args.exporter) {
      cursor.find({
        exporter: args.exporter,
      });
    }
    if (args.startdate) {
      cursor.find({
        exportdate: {
          $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
          $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
        },
      });
    }

    return cursor;
  },

  imchopSearch: async (parent, args, context, info) => {
    const cursor = Imchop.find({
      name: "นำเข้า",
    })
      .populate({
        path: "user",
        populate: { path: "imchops" },
      })
      .populate({
        path: "chop",
        populate: { path: "status" },
      })
      .populate({
        path: "chop",
        populate: { path: "imslaughter" },
      })
      .populate({
        path: "chop",
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
      .sort({ importdate: "DESC" });
    if (args.beeftype) {
      cursor.find({
        beeftype: args.beeftype,
      });
    }
    if (args.namefarmer) {
      cursor.find({
        namefarmer: args.namefarmer,
      });
    }
    if (args.userName) {
      cursor.find({
        userName: args.userName,
      });
    }
    if (args.startdate) {
      cursor.find({
        importdate: {
          $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
          $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
        },
      });
    }

    return cursor;
  },

  exportchop: async (parent, args, context, info) => {
    const cursor = Imchop.find({
      name: "นำออก",
    })
      .populate({
        path: "user",
        populate: { path: "imchops" },
      })
      .populate({
        path: "chop",
        populate: { path: "status" },
      })
      .populate({
        path: "chop",
        populate: { path: "imslaughter" },
      })
      .populate({
        path: "chop",
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
      .sort({ exportdate: "DESC" });
    if (args.beeftype) {
      cursor.find({
        beeftype: args.beeftype,
      });
    }
    if (args.namefarmer) {
      cursor.find({
        namefarmer: args.namefarmer,
      });
    }
    if (args.userName) {
      cursor.find({
        userName: args.userName,
      });
    }
    if (args.exporter) {
      cursor.find({
        exporter: args.exporter,
      });
    }
    if (args.startdate) {
      cursor.find({
        exportdate: {
          $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
          $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
        },
      });
    }

    return cursor;
  },

  imentrailSearch: async (parent, args, context, info) => {
    const cursor = Imentrail.find({
      name: "นำเข้า",
    })
      .populate({
        path: "user",
        populate: { path: "imentrails" },
      })
      .populate({
        path: "entrail",
        populate: { path: "imslaughter" },
      })
      .populate({
        path: "storestatus",
      })
      .sort({ importdate: "DESC" });
    if (args.beeftype) {
      cursor.find({
        beeftype: args.beeftype,
      });
    }
    if (args.namefarmer) {
      cursor.find({
        namefarmer: args.namefarmer,
      });
    }
    if (args.userName) {
      cursor.find({
        userName: args.userName,
      });
    }
    if (args.startdate) {
      cursor.find({
        importdate: {
          $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
          $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
        },
      });
    }

    return cursor;
  },

  exportentrail: async (parent, args, context, info) => {
    const cursor = Imentrail.find({
      name: "นำออก",
    })
      .populate({
        path: "user",
        populate: { path: "imentrails" },
      })
      .populate({
        path: "entrail",
        populate: { path: "imslaughter" },
      })
      .populate({
        path: "storestatus",
      })
      .sort({ exportdate: "DESC" });
    if (args.beeftype) {
      cursor.find({
        beeftype: args.beeftype,
      });
    }
    if (args.namefarmer) {
      cursor.find({
        namefarmer: args.namefarmer,
      });
    }
    if (args.userName) {
      cursor.find({
        userName: args.userName,
      });
    }
    if (args.exporter) {
      cursor.find({
        exporter: args.exporter,
      });
    }
    if (args.startdate) {
      cursor.find({
        exportdate: {
          $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
          $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
        },
      });
    }

    return cursor;
  },

  listchill: async (parent, args, context, info) => {
    const cursor = Chill.find({})
      .populate({
        path: "user",
      })
      .populate({
        path: "halve",
        populate: { path: "beeftype" },
      })
      .populate({
        path: "halve",
        populate: { path: "imslaughter" },
      })
      .populate({
        path: "chillstatus",
      })
      .populate({
        path: "chillroom",
      })
      .populate({
        path: "chillday",
      })
      .sort({ chilldate: "DESC" });
    if (args.beeftype) {
      cursor.find({
        beeftype: args.beeftype,
      });
    }
    if (args.startdate) {
      cursor.find({
        chilldate: {
          $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
          $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
        },
      });
    }
    return cursor;
  },

  allRoom: (parent, args, context, info) => {
    const cursor = Beefroom.find({})
  .populate({
    path: "typekeep",
    populate: { path: "beeftype" }
  })
    return cursor;
  },

  listShelf: (parent, args, context, info) => {
    if (!args.id) {
      const cursor = [];
      return cursor;
    }
    if (args.id) {
      const cursor = Shelf.find({
        beefroom: args.id,
      }).populate({
        path: "beefroom",
      });
      return cursor;
    }
  },

  roomsearch: (parent, args, context, info) => {
    const cursor = Beefroom.find({ _id: args.id }).populate({
      path: "shelf",
    });
    return cursor;
  },

  allhalve: async (parent, args, context, info) => {
    if (!args.barcode) {
      const cursor = null;
      return cursor;
    }
    if (args.barcode) {
      const cursor = await Halve.findOne({
        barcode: args.barcode,
      }).populate({
        path: "user",
        populate: { path: "halves" },
      });
      return cursor;
    }
  },

  listRequestEx: async (parent, args, context, info) => {
    const cursor = RequestExport.find({})
      .populate({
        path: "beeftype",
      })
      .sort({ requestdate: "DESC" });
    return cursor;
  },

  listChillday: async (parent, args, context, info) => {
    const cursor = Chillday.find({});
    return cursor;
  },

  test2: async (parent, args, context, info) => {
    const cursor = Halve.find({})
      .populate({
        path: "chill",
      })
      .populate({
        path: "chill",
        populate: { path: "chillstatus" },
      });
    return cursor;
  },

  allBasket: async (parent, args, context, info) => {
    if (!args.id) {
      const cursor = [];
      return cursor;
    }
    if (args.id) {
      const cursor = Basket.find({
        shelf: args.id,
      })
        .populate({
          path: "shelf",
        })
        .populate({
          path: "beefroom",
        });
      return cursor;
    }
  },

  Card8: async (parent, args, context, info) => {
    const find = await ExpdateSetting.findById(args.exp);
    const y = find.totalday;
    const x = Number(y);
    
      const cursor = await Imhalve.find({
        name: "นำเข้า",
        $or: [{almostExpdate: {
          $lte: dayjs().startOf("D").add(x, "d"),
          $gte: dayjs().startOf("D")
        }}, {almostExpdate: {
          $lte: dayjs().startOf("D"),
        }}]
        
      });
      //console.log(dayjs().startOf("D").add(4, "d"))
      return cursor;
    
    
  },

  Card9: async (parent, args, context, info) => {
    const cursor = await RequestExport.find({
      requestdate: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
    }).populate({
      path: "beeftype",
    });
    return cursor;
  },

  CardImh: async (parent, args, context, info) => {
    const cursor = await Imhalve.find({
      importdate: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
      name: "นำเข้า",
    })
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
      });
    return cursor;
  },
  CardImq: async (parent, args, context, info) => {
    const cursor = await Imquarter.find({
      importdate: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
      name: "นำเข้า",
    })
      .populate({
        path: "user",
        populate: { path: "imquarter" },
      })
      .populate({
        path: "quarter",
        populate: { path: "status" },
      })
      .populate({
        path: "quarter",
        populate: { path: "imslaughter" },
      })
      .populate({
        path: "quarter",
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
      });
    return cursor;
  },
  CardIml: async (parent, args, context, info) => {
    const cursor = await Imlump.find({
      importdate: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
      name: "นำเข้า",
    })
      .populate({
        path: "user",
        populate: { path: "imlumps" },
      })
      .populate({
        path: "lump",
        populate: { path: "status" },
      })
      .populate({
        path: "lump",
        populate: { path: "imslaughter" },
      })
      .populate({
        path: "lump",
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
      });
    return cursor;
  },
  CardImc: async (parent, args, context, info) => {
    const cursor = await Imchop.find({
      importdate: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
      name: "นำเข้า",
    })
      .populate({
        path: "user",
        populate: { path: "imchops" },
      })
      .populate({
        path: "chop",
        populate: { path: "status" },
      })
      .populate({
        path: "chop",
        populate: { path: "imslaughter" },
      })
      .populate({
        path: "chop",
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
      });
    return cursor;
  },
  CardIme: async (parent, args, context, info) => {
    const cursor = await Imentrail.find({
      importdate: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
      name: "นำเข้า",
    })
      .populate({
        path: "user",
        populate: { path: "imentrails" },
      })
      .populate({
        path: "entrail",
        populate: { path: "imslaughter" },
      })
      .populate({
        path: "storestatus",
      });
    return cursor;
  },
  ///////////////////////////////////////////////////////////
  CardExh: async (parent, args, context, info) => {
    const cursor = await Imhalve.find({
      exportdate: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
      name: "นำออก",
    })
      .populate({
        path: "user",
        populate: { path: "imhalves" },
      })
      /* .populate({
      path: "user",
      populate: {path: "curings"}
    }) */
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
        path: "exporter",
      });
    return cursor;
  },
  CardExq: async (parent, args, context, info) => {
    const cursor = await Imquarter.find({
      exportdate: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
      name: "นำออก",
    });
    return cursor;
  },
  CardExl: async (parent, args, context, info) => {
    const cursor = await Imlump.find({
      exportdate: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
      name: "นำออก",
    });
    return cursor;
  },
  CardExc: async (parent, args, context, info) => {
    const cursor = await Imchop.find({
      exportdate: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
      name: "นำออก",
    });
    return cursor;
  },
  CardExe: async (parent, args, context, info) => {
    const cursor = await Imentrail.find({
      exportdate: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
      name: "นำออก",
    });
    return cursor;
  },
};
//5f0fdb4b02b40c2ab8506563
export default Query;
