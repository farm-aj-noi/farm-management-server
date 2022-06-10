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
    const find = await ExpdateSetting2.findById(args.exp);
    const y = find.totalday;
    const x = Number(y);

    const cursor = await Improduct.find({
      storestatus: "5f448d5d4ef8ed48806f1b53",
      name: "นำเข้า",
      $or: [
        {
          Expdate: {
            $lte: dayjs().startOf("D").add(x, "d"),
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
      Productstatus: "รอแปรรูป"
    })
    return cursor
  },

  choptoProduct: async (parent, args, context, info) => {
    const cursor = Chop.find({
      Productstatus: "รอแปรรูป"
    })
    return cursor
  },
};
export default Query;
