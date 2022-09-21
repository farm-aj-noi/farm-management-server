import Unit from "../../../models/Productstore/unit";
import Producttype from "../../../models/Productstore/producttype";
import Beefproduct from "../../../models/Productstore/beefproduct";
import ProductStore from "../../../models/Productstore/productstore";
import Improduct from "../../../models/Productstore/improduct";
import Productroom from "../../../models/Productstore/productroom";
import Freezer from "../../../models/Productstore/freezer";
import Pbasket from "../../../models/Productstore/pbasket";
import Typekeep2 from "../../../models/Productstore/typekeep2";
import ExpdateSetting2 from "../../../models/Productstore/expdatesetting2";
import dayjs from "dayjs";
import Lump from "../../../models/lump";
import Chop from "../../../models/chop";
import RequestExportP from "../../../models/Productstore/requestexportp";

const Query = {
  listunit: async (parent, args, context, info) => {
    const cursor = await Unit.find({});
    return cursor;
  },

  allproducttype: async (parent, args, context, info) => {
    const cursor = await Producttype.find({}).populate({
      path: "unit",
    });
    return cursor;
  },

  allproduct: async (parent, args, context, info) => {
    let result = await ProductStore.find({})
      .populate({
        path: "improduct",
        populate: { path: "producttype" },
      })
      .populate({
        path: "improduct",
        populate: { path: "storestatus" },
      })
      .populate({
        path: "improduct",
        populate: {
          path: "beefproduct ",
          populate: { path: "lump", populate: { path: "imslaughter" } },
        },
      })
      .populate({
        path: "improduct",
        populate: {
          path: "beefproduct ",
          populate: { path: "chop", populate: { path: "imslaughter" } },
        },
      })
      .populate({
        path: "improduct",
        populate: { path: "productroom" },
      })
      .populate({
        path: "improduct",
        populate: { path: "freezer" },
      });

    var returnData = [];

    for (const item of result[0].improduct) {
      let data = {
        id: item.id,
        barcode: item.barcode,
        status: item.storestatus.nameTH,
        producttypeid: item.producttype.id,
        producttype: item.producttype.nameTH,
        code: item.producttype.code,
        weight: item.beefproduct.weight,
        importdate: item.importdate,
        productroomid: item.productroom.id,
        productroom: item.productroom.roomname,
        freezerid: item.freezer.id,
        freezer: item.freezer.freezername,
        pbasket: item.pbasket,
        MFGdate: item.beefproduct.MFG,
        BBEdate: item.beefproduct.BBE,
        info: item.info,
        mfg: dayjs(item.beefproduct.MFG).format("YYYY-MM-DD").toString(),
        bbe: dayjs(item.beefproduct.BBE).format("YYYY-MM-DD").toString(),
      };
      returnData.push(data);
    }
    returnData.sort((a, b) => b.importdate - a.importdate);

    if (args.producttype) {
      returnData = returnData.filter(
        (e) => e.producttypeid == args.producttype
      );
    }
    if (args.productroom) {
      returnData = returnData.filter(
        (e) => e.productroomid == args.productroom
      );
    }
    if (args.freezer) {
      returnData = returnData.filter((e) => e.freezerid == args.freezer);
    }
    if (args.pbasket) {
      returnData = returnData.filter((e) => e.pbasket == args.pbasket);
    }
    if (args.code) {
      returnData = returnData.filter((e) => e.code == args.code);
    }
    if (args.mfgdate) {
      returnData = returnData.filter((e) => e.mfg == args.mfgdate);
    }
    if (args.bbedate) {
      returnData = returnData.filter((e) => e.bbe == args.bbedate);
    }

    return returnData;
  },

  improductSearch: async (parent, args, context, info) => {
    const cursor = Improduct.find({
      name: "นำเข้า",
    })
      .populate({
        path: "user",
        populate: { path: "improducts" },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "producttype" },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "status" },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "chop", populate: { path: "imslaughter" } },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "lump", populate: { path: "imslaughter" } },
      })
      .populate({
        path: "producttype",
      })
      .populate({
        path: "storestatus",
      })
      .populate({
        path: "productroom",
      })
      .populate({
        path: "freezer",
      })
      .sort({ importdate: "DESC" });
    if (args.producttype) {
      cursor.find({
        producttype: args.producttype,
      });
    }
    if (args.userName) {
      cursor.find({
        userName: args.userName,
      });
    }
    if (args.productroom) {
      cursor.find({
        productroom: args.productroom,
      });
    }
    if (args.freezer) {
      cursor.find({
        freezer: args.freezer,
      });
    }
    if (args.pbasket) {
      cursor.find({
        pbasket: args.pbasket,
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

  allproductroom: async (parent, args, context, info) => {
    const cursor = Productroom.find({});
    return cursor;
  },

  productroomsearch: (parent, args, context, info) => {
    const cursor = Productroom.find({ _id: args.id }).populate({
      path: "freezer",
    });
    return cursor;
  },

  listFreezer: (parent, args, context, info) => {
    if (!args.id) {
      const cursor = [];
      return cursor;
    }
    if (args.id) {
      const cursor = Freezer.find({
        productroom: args.id,
      })
        .populate({
          path: "productroom",
        })
        .populate({
          path: "typekeep2",
          populate: { path: "producttype" },
        });
      return cursor;
    }
  },

  allFreezer: (parent, args, context, info) => {
    const cursor = Freezer.find({}).populate({
      path: "productroom",
    });
    return cursor;
  },

  allpbasket: async (parent, args, context, info) => {
    if (!args.id) {
      const cursor = [];
      return cursor;
    }
    if (args.id) {
      const cursor = Pbasket.find({
        freezer: args.id,
      })
        .populate({
          path: "freezer",
        })
        .populate({
          path: "productroom",
        });
      return cursor;
    }
  },

  pbasket: async (parent, args, context, info) => {
    const cursor = Pbasket.find({})
      .populate({
        path: "freezer",
      })
      .populate({
        path: "productroom",
      });
    return cursor;
  },

  alltypkeep2: async (parent, args, context, info) => {
    const cursor = Typekeep2.find({});
    return cursor;
  },

  card8product: async (parent, args, context, info) => {
    const find = await ExpdateSetting2.findById("62ac62cc97dad53b30895a97");
    const day = find.day;

    const cursor = await Improduct.find({
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
        populate: { path: "improducts" },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "producttype" },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "status" },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "chop", populate: { path: "imslaughter" } },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "lump", populate: { path: "imslaughter" } },
      })
      .populate({
        path: "producttype",
      })
      .populate({
        path: "storestatus",
      })
      .populate({
        path: "productroom",
      })
      .populate({
        path: "freezer",
      });
    return cursor;
  },

  exproductSearch: async (parent, args, context, info) => {
    const cursor = Improduct.find({
      name: "นำออก",
    })
      .populate({
        path: "user",
        populate: { path: "improducts" },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "producttype" },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "status" },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "chop", populate: { path: "imslaughter" } },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "lump", populate: { path: "imslaughter" } },
      })
      .populate({
        path: "producttype",
      })
      .populate({
        path: "storestatus",
      })
      .populate({
        path: "productroom",
      })
      .populate({
        path: "freezer",
      })
      .sort({ exportdate: "DESC" });

    if (args.producttype) {
      cursor.find({
        producttype: args.producttype,
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

  cardImP: async (parent, args, context, info) => {
    const cursor = await Improduct.find({
      importdate: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
      name: "นำเข้า",
    })
      .populate({
        path: "user",
        populate: { path: "improducts" },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "producttype" },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "status" },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "chop", populate: { path: "imslaughter" } },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "lump", populate: { path: "imslaughter" } },
      })
      .populate({
        path: "producttype",
      })
      .populate({
        path: "storestatus",
      })
      .populate({
        path: "productroom",
      })
      .populate({
        path: "freezer",
      });
    return cursor;
  },

  cardExP: async (parent, args, context, info) => {
    const cursor = await Improduct.find({
      exportdate: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
      name: "นำออก",
    })
      .populate({
        path: "user",
        populate: { path: "improducts" },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "producttype" },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "status" },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "chop", populate: { path: "imslaughter" } },
      })
      .populate({
        path: "beefproduct",
        populate: { path: "lump", populate: { path: "imslaughter" } },
      })
      .populate({
        path: "producttype",
      })
      .populate({
        path: "storestatus",
      })
      .populate({
        path: "productroom",
      })
      .populate({
        path: "freezer",
      });
    return cursor;
  },

  lumptoProduct: async (parent, args, context, info) => {
    const cursor = Lump.find({
      Productstatus: "รอแปรรูป",
    });
    return cursor;
  },

  choptoProduct: async (parent, args, context, info) => {
    const cursor = Chop.find({
      Productstatus: "รอแปรรูป",
    });
    return cursor;
  },

  listExpSetting2: async (parent, args, context, info) => {
    const cursor = await ExpdateSetting2.find({});
    return cursor;
  },

  ProductTracking: async (parent, args, context, info) => {
    const cursor = await Beefproduct.findOne({
      barcode: args.barcode,
    })
      .populate({
        path: "producttype",
      })
      .populate({
        path: "status",
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
        path: "chop",
        populate: { path: "imslaughter" },
      })
      .populate({
        path: "chop",
        populate: { path: "beeftype" },
      })
      .populate({
        path: "producttransport",
      });
    return cursor;
  },

  ProductTrace: async (parent, args, context, info) => {
    const cursor = await Beefproduct.findOne({
      barcode: args.barcode,
    })
      .populate({
        path: "producttype",
      })
      .populate({
        path: "producttransport",
      });
    return cursor;
  },

  listRequestExP: async (parent, args, context, info) => {
    const cursor = RequestExportP.find({})
      .populate({
        path: "producttype",
      })
      .populate({
        path: "status",
      })
      .sort({ requestdate: "DESC" });
    return cursor;
  },

  Card9product: async (parent, args, context, info) => {
    const cursor = await RequestExportP.find({
      requestdate: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
    })
      .populate({
        path: "producttype",
      })
      .populate({
        path: "status",
      });
    return cursor;
  },

  ProductSearch: async (parent, args, context, info) => {
    const cursor = await Beefproduct.find({})
      .populate({
        path: "producttype",
      })
      .sort({ MFG: "DESC" });
    return cursor;
  },

  ProductSearch2: async (parent, args, context, info) => {
    const cursor = await Beefproduct.find({
      _id: args.id,
    })
      .populate({
        path: "producttype",
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
        path: "chop",
        populate: { path: "imslaughter" },
      })
      .populate({
        path: "chop",
        populate: { path: "beeftype" },
      });
    return cursor;
  },

  top10product: async (parent, args, context, info) => {
    const cursor1 = await Improduct.find({
      name: "นำออก",
      exportdate: {
        $gte: dayjs(new Date()).startOf("month"),
        $lt: dayjs(new Date()),
      },
    });

    const producttype = await Producttype.find();

    let bigarray = [...cursor1];

    let data = [];

    for (const key1 in producttype) {
      if (Object.hasOwnProperty.call(producttype, key1)) {
        const e1 = producttype[key1];
        //console.log(e1.id);
        for (const key2 in bigarray) {
          if (Object.hasOwnProperty.call(bigarray, key2)) {
            const e2 = bigarray[key2];
            //console.log(e2)
            if (e1.id == e2.producttype) {
              const checkIndex = data.findIndex((e) => e.id == e1.id);
              if (checkIndex == -1) {
                data.push({
                  id: e1.id,
                  nameth: e1.nameTH,
                  nameen: e1.nameEN,
                  count: 1,
                });
              } else {
                data[checkIndex].count++;
              }
            }
          }
        }
      }
    }

    //console.log(data)

    data.sort((a, b) => b.count - a.count);
    return data;
  },

  productGraph: async (parent, args, context, info) => {
    let startdate = args.startdate;
    let enddate = args.enddate;
    let _filter = {
      $or: [
        {
          importdate: {
            $gte: dayjs(startdate).startOf("D"),
            $lt: dayjs(enddate).endOf("D"),
          },
        },
        {
          exportdate: {
            $gte: dayjs(startdate).startOf("D"),
            $lt: dayjs(enddate).endOf("D"),
          },
        },
      ],
    };
    const cursor1 = await Improduct.find(_filter);

    let bigarray = [...cursor1];

    let data = [];

    let start = dayjs(startdate).startOf("D");
    let end = dayjs(enddate).endOf("D");

    //console.log(bigarray)
    let test = 0;
    do {
      let list = {
        day: start.format("YYYY-MM-DD").toString(),
        import: 0,
        export: 0,
      };
      for (let index = 0; index < bigarray.length; index++) {
        const e = bigarray[index];
        if (e.name == "นำออก") {
          if (
            dayjs(e.exportdate) >= start &&
            dayjs(e.exportdate) <= dayjs(start).endOf("D")
          ) {
            console.log("out");
            list.export++;
          }
        } else if (e.name == "นำเข้า") {
          if (
            dayjs(e.importdate) >= start &&
            dayjs(e.importdate) <= dayjs(start).endOf("D")
          ) {
            console.log("im");

            list.import++;
          }
        }
      }

      data.push(list);

      start = dayjs(start).add(1, "day");
      test++;
      console.log(test + " " + start);
    } while (start <= end);

    console.log(data);
    return data;
  },

  productSale: async (parent, args, context, info) => {
    const cursor = await Improduct.find({
      name: "นำออก",
      storestatus: "6280fac6d3dbf7345093676f",
    }).populate({
      path: "producttype",
    })
    .populate({
      path: "beefproduct",
    });
   
    var returnData = [];

    for (const item of cursor) {
      let data = {
        id: item.id,
        producttype: item.producttype.nameTH,
        code: item.producttype.code,
        barcode: item.barcode,
        weight: item.beefproduct.weight,
        Expdate: item.beefproduct.BBE,
        info: item.info,
      };
      returnData.push(data);
    }
    return returnData;
  },
  
};
export default Query;
