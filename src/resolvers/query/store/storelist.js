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
import TotalExpdate from "../../../models/Beefstore/totalexpdate";
import Typekeep from "../../../models/Beefstore/typekeep";
import Chillroom from "../../../models/Beefstore/chillroom";

const Query = {
  liststore: async (parent, args, context, info) => {
    const cursor = await BeefStore.find({})
      .populate({
        path: "imhalves",
        populate: { path: "halve" },
      })
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
        //console.log(item.beefroom.id)
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
          beefroomid: item.beefroom.id,
          beefroom: item.beefroom.roomname,
          Expdate: item.Expdate,
          exp: dayjs(item.Expdate).format('YYYY-MM-DD').toString()
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
          beefroomid: item.beefroom.id,
          beefroom: item.beefroom.roomname,
          Expdate: item.Expdate,
          exp: dayjs(item.Expdate).format('YYYY-MM-DD').toString()
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
          beefroomid: item.beefroom.id,
          beefroom: item.beefroom.roomname,
          shelfid: item.shelf.id,
          shelf: item.shelf.shelfname,
          basket: item.basket,
          Expdate: item.Expdate,
          exp: dayjs(item.Expdate).format('YYYY-MM-DD').toString()
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
          beefroomid: item.beefroom.id,
          beefroom: item.beefroom.roomname,
          shelfid: item.shelf.id,
          shelf: item.shelf.shelfname,
          basket: item.basket,
          Expdate: item.Expdate,
          exp: dayjs(item.Expdate).format('YYYY-MM-DD').toString()
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
    if (args.beefroom) {
      returnData = returnData.filter((e) => e.beefroomid == args.beefroom);
    }
    if (args.shelf) {
      returnData = returnData.filter((e) => e.shelfid == args.shelf);
    }
    if (args.expdate) {
      returnData = returnData.filter((e) => e.exp == args.expdate);
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
        beefroomid: item.beefroom.id,
        Expdate: item.Expdate,
        exp: dayjs(item.Expdate).format("YYYYMMDD").toString(),
      };
      if (args.beefroom) {
        returnData = returnData.filter((e) => e.beefroomid == args.beefroom);
      }
      if (args.expdate) {
        returnData = returnData.filter((e) => e.exp == args.expdate);
      }
      returnData.push(data);
    }
    returnData.sort((a, b) => b.importdate - a.importdate);
    if (args.beefroom) {
      returnData = returnData.filter((e) => e.beefroomid == args.beefroom);
    }

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
    if (args.beefroom) {
      cursor.find({
        beefroom: args.beefroom,
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
    if (args.beefroom) {
      cursor.find({
        beefroom: args.beefroom,
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
    if (args.beefroom) {
      cursor.find({
        beefroom: args.beefroom,
      });
    }
    if (args.shelf) {
      cursor.find({
        shelf: args.shelf,
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
    if (args.beefroom) {
      cursor.find({
        beefroom: args.beefroom,
      });
    }
    if (args.shelf) {
      cursor.find({
        shelf: args.shelf,
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
    if (args.beefroom) {
      cursor.find({
        beefroom: args.beefroom,
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
    const cursor = Beefroom.find({}).populate({
      path: "typekeep",
      populate: { path: "beeftype" },
    });
    return cursor;
  },

  TypeRoom: (parent, args, context, info) => {
    const cursor = Typekeep.find({
      beefroom: args.beefroom,
    }).populate({
      path: "beefroom",
    });

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
      })
        .populate({
          path: "beefroom",
        })
        .populate({
          path: "typekeep",
          populate: { path: "beeftype" },
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

  Baskets: async (parent, args, context, info) => {
    const cursor = Basket.find({})
      .populate({
        path: "shelf",
      })
      .populate({
        path: "beefroom",
      });
    return cursor;
  },

  Card8h: async (parent, args, context, info) => {
    const find = await ExpdateSetting.findById("629f3729a96c14e8f1f2473b");
    const day = find.dayH;

    const cursor = await Imhalve.find({
      storestatus: "5f448d5d4ef8ed48806f1b53",
      name: "นำเข้า",
      $or: [
        {
          Expdate: {
            $lte: dayjs().startOf("D").add(day, "d"),
            $gte: dayjs().startOf("D"),
          },
        },
        {
          Expdate: {
            $lte: dayjs().startOf("D"),
          },
        },
      ],
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
    //console.log(dayjs().startOf("D").add(4, "d"))
    return cursor;
  },

  Card8q: async (parent, args, context, info) => {
    const find = await ExpdateSetting.findById("629f3729a96c14e8f1f2473b");
    const day = find.dayQ;

    const cursor = await Imquarter.find({
      name: "นำเข้า",
      $or: [
        {
          Expdate: {
            $lte: dayjs().startOf("D").add(day, "d"),
            $gte: dayjs().startOf("D"),
          },
        },
        {
          Expdate: {
            $lte: dayjs().startOf("D"),
          },
        },
      ],
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
      });
    //console.log(dayjs().startOf("D").add(4, "d"))
    return cursor;
  },

  Card8l: async (parent, args, context, info) => {
    const find = await ExpdateSetting.findById("629f3729a96c14e8f1f2473b");
    const day = find.dayL;

    const cursor = await Imlump.find({
      name: "นำเข้า",
      $or: [
        {
          Expdate: {
            $lte: dayjs().startOf("D").add(day, "d"),
            $gte: dayjs().startOf("D"),
          },
        },
        {
          Expdate: {
            $lte: dayjs().startOf("D"),
          },
        },
      ],
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
      });
    return cursor;
  },

  Card8c: async (parent, args, context, info) => {
    const find = await ExpdateSetting.findById("629f3729a96c14e8f1f2473b");
    const day = find.dayC;

    const cursor = await Imchop.find({
      name: "นำเข้า",
      $or: [
        {
          Expdate: {
            $lte: dayjs().startOf("D").add(day, "d"),
            $gte: dayjs().startOf("D"),
          },
        },
        {
          Expdate: {
            $lte: dayjs().startOf("D"),
          },
        },
      ],
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
      });
    return cursor;
  },

  Card8e: async (parent, args, context, info) => {
    const find = await ExpdateSetting.findById("629f3729a96c14e8f1f2473b");
    const day = find.dayE;

    const cursor = await Imentrail.find({
      name: "นำเข้า",
      $or: [
        {
          Expdate: {
            $lte: dayjs().startOf("D").add(day, "d"),
            $gte: dayjs().startOf("D"),
          },
        },
        {
          Expdate: {
            $lte: dayjs().startOf("D"),
          },
        },
      ],
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
      .populate({
        path: "beefroom",
      });
    return cursor;
  },

  Card9: async (parent, args, context, info) => {
    const cursor = await RequestExport.find({
      chilldateEnd: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
      chillstatus: "6284ad91fbfac22364a6e431",
    })
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
      });
    return cursor;
  },

  Card10: async (parent, args, context, info) => {
    const cursor = await Chill.find({
      chilldateEnd: {
        $gte: dayjs(new Date()).startOf("D").format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
        $lt: dayjs(new Date()).endOf("D").format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
      },
    }).populate({
      path: "chillday",
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
  CardExc: async (parent, args, context, info) => {
    const cursor = await Imchop.find({
      exportdate: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
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

  Totalexpdate: async (parent, args, context, info) => {
    const cursor = await TotalExpdate.find({});
    return cursor;
  },

  listChillroom: async (parent, args, context, info) => {
    const cursor = await Chillroom.find({});
    return cursor;
  },

  listExpSetting: async (parent, args, context, info) => {
    const cursor = await ExpdateSetting.find({});
    return cursor;
  },
};
//5f0fdb4b02b40c2ab8506563
export default Query;
