import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import Foodset from "../../models/foodset";

import User from "../../models/user";
import Product from "../../models/product";
import Status from "../../models/status";
import Imslaughter from "../../models/imslaughter";
import Importcowfarm from "../../models/importcowfarm";
import Dayslaugh from "../../models/dayslaugh";

import Halve from "../../models/halve";
import Quarter from "../../models/quarter";
import Lump from "../../models/lump";
import Chop from "../../models/chop";
import Entrail from "../../models/entrail";

import Box from "../../models/box";
import Beeftype from "../../models/beeftype";
import Drug from "../../models/Raise/drug";
import Disease from "../../models/Raise/disease";
import PunType from "../../models/puntype"
import DataCow from "../../modelsregister/datacow";
import Datatreat from "../../modelsregister/datatreat";


const Query = {
  postsOffset: async (parent, { limit, offset }) => {
    const cursor = Product.find();
    if (limit) cursor.limit(limit);
    if (offset) cursor.skip(offset);
    return cursor;
  },
  user: async (parent, args, { userId }, info) => {
    // Check if user logged in
    if (!userId) throw new Error("Please log in");

    let result = await User.findById(userId).populate({
      path: "products",
      options: { sort: { createdAt: "desc" } },
      populate: { path: "user" },
    })
    .populate({ path: "carts", populate: { path: "product" } })
    .populate({ path: "role" })
    .populate({ path: "statuses" });

    // console.log(test)
    if (!result.passsport) {
      result.passsport = ""
    }

    return result
     
  },
  user2: (parent, args, { userId }, info) => {
    // Check if user logged in
    if (!userId) throw new Error("Please log in");

    return User.findById(args.id)
      .populate({
        path: "products",
        options: { sort: { createdAt: "desc" } },
        populate: { path: "user" },
      })
      .populate({ path: "carts", populate: { path: "product" } });
  },
  users: (parent, args, context, info) =>
    User.find({})
      .populate({
        path: "products",
        populate: { path: "user" },
      })
      .populate({ path: "carts", populate: { path: "product" } })
      .populate({ path: "role" }),
  product: (parent, args, context, info) =>
    Product.findById(args.id).populate({
      path: "user",
      populate: { path: "products" },
    }),
  productSearch: async (parent, args, context, info) => {
    const cursor = Product.find({
      description: { $regex: args.description },
    }).populate({
      path: "user",
      populate: { path: "products" },
    });
    if (args.price) cursor.find({ price: args.price });
    return cursor;
  },
  products: (parent, args, context, info) =>
    Product.find()
      .populate({
        path: "user",
        populate: { path: "products" },
      })
      .sort({ createdAt: "desc" }),
  boxSearch: (parent, args, context, info) => Box.find({}),
  beeftypeSearch: (parent, args, context, info) => Beeftype.find({}),

  // งานจริงๆ
  statusSearch: (parent, args, context, info) =>
    Status.find({}).populate({
      path: "user",
      populate: { path: "statuses" },
    }),

  Cowdetail: (parent, args, context, info) =>
  Imslaughter.findById(args.id).populate({
      path: "user",
      populate: { path: "imslaughter" },
    })
    .populate({
      path:"treats"
  }).sort({ date: "desc" }),

  CowWaitting: (parent, args, context, info) =>
  Importcowfarm.findById(args.id).populate({
      path: "user",
      populate: { path: "imslaughter" },
    })
    .populate({
      path:"treats"
  }).sort({ date: "desc" }),
  imslaughtersSearch: (parent, args, context, info) =>
    // Imslaughter.find({statusIm: "5f0fdb6502b40c2ab8506565"})
    Imslaughter.find({statusIm: "5f0fdb6502b40c2ab8506565"})

      .populate({
        path: "user",
        populate: { path: "imslaughters" },
      })
      .populate({
        path: "statusIm",
      })
      .populate({
        path: "statusCa",
      })
      .populate({
        path: "statusEn",
      })
      .populate({
        path: "halves",
        populate: { path: "quarters" },
      })
      .populate({
        path:"treats"
    }),

  Allcow: (parent, args, context, info) => Imslaughter.find({})
  .populate({
      path:"treats"
  })
 ,
 
 cowfarmmer: (parent, args, context, info) => {
  // console.log("input : "+args.numkun.trim())
  const cursor = Imslaughter.find({
    // passsport:  args.passsport
        numkun: { $regex: args.numkun.trim() },
        statusIm: "5f0fdb6502b40c2ab8506565"
    })
    .populate({
      path: "user",
      populate: { path: "passsport" },
    })
   .populate({
      path: "feeds",
      // populate: { path: "beeftype" },
    })
    .populate({
      path: "treats",
      // populate: { path: "beeftype" },
    })
  return cursor;
},

cowfarmmerweitting: (parent, args, context, info) => {
  // console.log("input : "+args.numkun.trim())
  const cursor = Importcowfarm.find({
        // namecow: { $regex: args.namecow.trim() },
    }) .populate({
      path: "statusIm",
    })
    .sort({ statusIm: "ASC" });
    if (args.statusIm) {
      cursor.find({
        statusIm: args.statusIm,
      });
    }

  
  return cursor;
},

treatSearch: (parent, args, context, info) =>
      // Imslaughter.find({statuscow:'กำลังรักษา'})
      Imslaughter.find({statusIm:"5ff2e44a74a6e82d00686276"})

  ,
  imslaughtersSearchNumkun: async (parent, args, context, info) => {
    const cursor = Imslaughter.find({
      numkun: { $regex: args.numkun.trim() },
      importDate: {
        $gte: dayjs(args.importDate).startOf("D"),
        $lt: dayjs(args.importDate).endOf("D"),
      },
    })
      .populate({
        path: "user",
        populate: { path: "imslaughters" },
      })
      .populate({
        path: "statusIm",
      })
      .populate({
        path: "statusCa",
      })
      .populate({
        path: "statusEn",
      })
      .sort({ statusIm: "ASC" });
    if (args.statusIm) {
      cursor.find({
        statusIm: args.statusIm,
      });
    }
    return cursor;
  },
  imslaughtersSearchList: async (parent, args, context, info) => {
    const cursor = Imslaughter.find({
      importslaughterDate: {
        $gte: dayjs(args.importslaughterDate).startOf("D"),
        $lt: dayjs(args.importslaughterDate).endOf("D"),
      },
      // statusCa: args.statusCa
    })
      .populate({
        path: "user",
        populate: { path: "imslaughters" },
      })
      .populate({
        path: "statusIm",
      })
      .populate({
        path: "statusCa",
      })
      .populate({
        path: "statusEn",
      })
      .sort({ statusCa: "ASC" });
    if (args.statusCa) {
      cursor.find({
        statusCa: args.statusCa,
      });
    }
    return cursor;
  },
  imslaughtersSearchHalve: async (parent, args, context, info) => {
    const cursor = Imslaughter.find({
      numkun: { $regex: args.numkun.trim() },
      importslaughterDate: {
        $gte: dayjs(args.importslaughterDate).startOf("D"),
        $lt: dayjs(args.importslaughterDate).endOf("D"),
      },
      // statusCa: args.statusCa
    })
      .populate({
        path: "user",
        populate: { path: "imslaughters" },
      })
      .populate({
        path: "statusIm",
      })
      .populate({
        path: "statusCa",
      })
      .populate({
        path: "statusEn",
      })
      .populate({
        path: "halves",
        // populate: { path: "imslaughter" },
        populate: { path: "beeftype" },
      })
      .sort({ statusCa: "ASC" });
    if (args.statusCa) {
      cursor.find({
        statusCa: args.statusCa,
      });
    }
    return cursor;
  },

  
  
  imslaughtersSearchGrade: async (parent, args, context, info) => {
    const cursor = Imslaughter.find({
      numkun: { $regex: args.numkun.trim() },
      // importslaughterDate: {
      //   $gte: dayjs(args.importslaughterDate).startOf("D"),
      //   $lt: dayjs(args.importslaughterDate).endOf("D"),
      // },
      // statusCa: args.statusCa
    })
      .populate({
        path: "user",
        populate: { path: "imslaughters" },
      })
      .populate({
        path: "statusIm",
      })
      .populate({
        path: "statusCa",
      })
      .populate({
        path: "statusEn",
      })
      .populate({
        path: "halves",
        // populate: { path: "imslaughter" },
        populate: { path: "beeftype" },
      })
      .sort({ statusCa: "ASC" });
    if (args.importslaughterDate) {
      cursor.find({
        importslaughterDate: {
          $gte: dayjs(args.importslaughterDate).startOf("D"),
          $lt: dayjs(args.importslaughterDate).endOf("D"),
        },
      });
    }
    if (args.statusCa) {
      cursor.find({
        statusCa: args.statusCa,
      });
    }
    return cursor;
  },
  imslaughtersSearchEntrails: async (parent, args, context, info) => {
    const cursor = Imslaughter.find({
      numkun: { $regex: args.numkun.trim() },
      importslaughterDate: {
        $gte: dayjs(args.importslaughterDate).startOf("D"),
        $lt: dayjs(args.importslaughterDate).endOf("D"),
      },
      // statusCa: args.statusCa
    })
      .populate({
        path: "user",
        populate: { path: "imslaughters" },
      })
      .populate({
        path: "statusIm",
      })
      .populate({
        path: "statusCa",
      })
      .populate({
        path: "statusEn",
      })
      .populate({
        path: "halves",
        // populate: { path: "imslaughter" },
        populate: { path: "beeftype" },
      })
      .populate({
        path: "entrails",
        populate: { path: "imslaughter" },
      })
      .sort({ entrails: "ASC" });
    if (args.statusEn) {
      cursor.find({
        statusEn: args.statusEn,
      });
    }
    return cursor;
  },
  SearchHalveForSent: async (parent, args, context, info) => {
    const cursor = Halve.find({
      barcode: { $regex: args.barcode.toUpperCase() },
      // createdAt: {
      //   $gte: dayjs(args.createdAt).startOf("D"),
      //   $lt: dayjs(args.createdAt).endOf("D"),
      // },
      // statusCa: args.statusCa
    })
      .populate({
        path: "user",
        populate: { path: "halves" },
      })
      .populate({
        path: "imslaughter",
        populate: { path: "halves" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      })
      .sort({ sendAt: "ASC" });
    if (args.createdAt) {
      cursor
        .find({
          createdAt: {
            $gte: dayjs(args.createdAt).startOf("D"),
            $lt: dayjs(args.createdAt).endOf("D"),
          },
        })
        .sort({ createdAt: "ASC" });
    }
    if (args.status) {
      cursor.find({
        status: args.status,
      });
    }
    return cursor;
  },
  SearchHalveForCut: async (parent, args, context, info) => {
    const cursor = Halve.find({
      barcode: { $regex: args.barcode.toUpperCase() },
      sendAt: { $ne: null },
      // createdAt: {
      //   $gte: dayjs(args.createdAt).startOf("D"),
      //   $lt: dayjs(args.createdAt).endOf("D"),
      // },
      // statusCa: args.statusCa$ne
    })
      .populate({
        path: "user",
        populate: { path: "halves" },
      })
      .populate({
        path: "imslaughter",
        populate: { path: "halves" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      })
      .sort({ sendAt: "ASC" });
    if (args.sendAt) {
      cursor
        .find({
          sendAt: {
            $gte: dayjs(args.sendAt).startOf("D"),
            $lt: dayjs(args.sendAt).endOf("D"),
          },
        })
        .sort({ sendAt: "ASC" });
    }
    if (args.status) {
      cursor.find({
        status: args.status,
      });
    }
    return cursor;
  },
  HalveForCut: async (parent, args, context, info) => {
    if (!args.barcode) {
      const cursor = null;
      return cursor;
    }

    if (args.barcode) {
      const cursor = Halve.findOne({
        barcode: { $regex: args.barcode.toUpperCase() },
        sendAt: {
          $gte: dayjs().startOf("D"),
          $lt: dayjs().endOf("D"),
        },
      })
        .populate({
          path: "user",
          populate: { path: "halves" },
        })
        .populate({
          path: "imslaughter",
          populate: { path: "halves" },
        })
        .populate({
          path: "status",
        })
        .populate({
          path: "beeftype",
        })
        .sort({ sendAt: "ASC" });
      return cursor;
    }
  },
  SearchBeeftypefour: async (parent, args, context, info) => {
    if (!args.code) {
      const cursor = null;
      return cursor;
    }
    if (args.code) {
      const cursor = Beeftype.findOne({
        code: { $regex: args.code.toLowerCase() },
        codecount: {
          $gte: 3,
          $lt: 7,
        },
      });
      return cursor;
    }
  },
  SearchQuarter: async (parent, args, context, info) => {
    if (!args.halve) {
      const cursor = null;
      return cursor;
    }
    if (args.halve) {
      const cursor = Quarter.find({
        halve: args.halve,
      })
        .populate({
          path: "user",
          populate: { path: "quarters" },
        })
        .populate({
          path: "status",
        })
        .populate({
          path: "beeftype",
        })
        .populate({
          path: "imslaughter",
          populate: { path: "quarters" },
        })
        .populate({
          path: "halve",
          populate: { path: "quarters" },
        })
        .sort({ createdAt: "DESC" });
      return cursor;
    }
  },
  SearchQuarterForSent: async (parent, args, context, info) => {
    const cursor = Quarter.find({
      barcode: { $regex: args.barcode.toUpperCase() },
      // createdAt: {
      //   $gte: dayjs(args.createdAt).startOf("D"),
      //   $lt: dayjs(args.createdAt).endOf("D"),
      // },
      // statusCa: args.statusCa
    })
      .populate({
        path: "user",
        populate: { path: "quarters" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "imslaughter",
        populate: { path: "quarters" },
      })
      .populate({
        path: "halve",
        populate: { path: "quarters" },
      })
      .sort({ sendAt: "ASC" });
    if (args.createdAt) {
      cursor
        .find({
          createdAt: {
            $gte: dayjs(args.createdAt).startOf("D"),
            $lt: dayjs(args.createdAt).endOf("D"),
          },
        })
        .sort({ sendAt: "ASC" });
    }
    return cursor;
  },
  SearchQuarterForCut: async (parent, args, context, info) => {
    const cursor = Quarter.find({
      barcode: { $regex: args.barcode.toUpperCase() },
      sendAt: { $ne: null },
      // createdAt: {
      //   $gte: dayjs(args.createdAt).startOf("D"),
      //   $lt: dayjs(args.createdAt).endOf("D"),
      // },
      // statusCa: args.statusCa$ne
    })
      .populate({
        path: "user",
        populate: { path: "quarters" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "imslaughter",
        populate: { path: "quarters" },
      })
      .populate({
        path: "halve",
        populate: { path: "quarters" },
      })
      .sort({ sendAt: "ASC" });
    if (args.sendAt) {
      cursor
        .find({
          sendAt: {
            $gte: dayjs(args.sendAt).startOf("D"),
            $lt: dayjs(args.sendAt).endOf("D"),
          },
        })
        .sort({ sendAt: "ASC" });
    }
    if (args.status) {
      cursor.find({
        status: args.status,
      });
    }
    return cursor;
  },
  QuarterForCut: async (parent, args, context, info) => {
    if (!args.barcode) {
      const cursor = null;
      return cursor;
    }

    if (args.barcode) {
      const cursor = Quarter.findOne({
        barcode: { $regex: args.barcode.toUpperCase() },
        sendAt: {
          $gte: dayjs().startOf("D"),
          $lt: dayjs().endOf("D"),
        },
      })
        .populate({
          path: "user",
          populate: { path: "quarters" },
        })
        .populate({
          path: "status",
        })
        .populate({
          path: "beeftype",
        })
        .populate({
          path: "imslaughter",
          populate: { path: "quarters" },
        })
        .populate({
          path: "halve",
          populate: { path: "quarters" },
        })
        .sort({ sendAt: "ASC" });
      return cursor;
    }
  },
  SearchBeeftypeLump: async (parent, args, context, info) => {
    if (!args.code) {
      const cursor = null;
      return cursor;
    }
    if (args.code) {
      const cursor = Beeftype.findOne({
        code: { $regex: args.code.toLowerCase() },
        codecount: {
          $gte: 7,
        },
      });
      return cursor;
    }
  },
  SearchBeeftypeLumpAll: async (parent, args, context, info) => {
    const cursor = Beeftype.find({
      codecount: { $gte: 7 },
    });
    return cursor;
  },
  SearchLump: async (parent, args, context, info) => {
    if (!args.quarter) {
      const cursor = null;
      return cursor;
    }
    if (args.quarter) {
      const cursor = Lump.find({
        quarter: args.quarter,
      })
        .populate({
          path: "user",
          populate: { path: "lumps" },
        })
        .populate({
          path: "status",
        })
        .populate({
          path: "beeftype",
        })
        .populate({
          path: "imslaughter",
          populate: { path: "lumps" },
        })
        .populate({
          path: "quarter",
          populate: { path: "lumps" },
        })
        .sort({ createdAt: "DESC" });
      return cursor;
    }
  },
  SearchLumpForSent: async (parent, args, context, info) => {
    const cursor = Lump.find({
      barcode: { $regex: args.barcode.toUpperCase() },
      // createdAt: {
      //   $gte: dayjs(args.createdAt).startOf("D"),
      //   $lt: dayjs(args.createdAt).endOf("D"),
      // },
      // statusCa: args.statusCa
    })
      .populate({
        path: "user",
        populate: { path: "lumps" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "imslaughter",
        populate: { path: "lumps" },
      })
      .populate({
        path: "quarter",
        populate: { path: "lumps" },
      })
      .sort({ sendAt: "ASC" });
    if (args.createdAt) {
      cursor
        .find({
          createdAt: {
            $gte: dayjs(args.createdAt).startOf("D"),
            $lt: dayjs(args.createdAt).endOf("D"),
          },
        })
        .sort({ sendAt: "ASC" });
    }
    return cursor;
  },
  SearchLumpForCut: async (parent, args, context, info) => {
    const cursor = Lump.find({
      barcode: { $regex: args.barcode.toUpperCase() },
      sendAt: { $ne: null },
      // createdAt: {
      //   $gte: dayjs(args.createdAt).startOf("D"),
      //   $lt: dayjs(args.createdAt).endOf("D"),
      // },
      // statusCa: args.statusCa$ne
    })
      .populate({
        path: "user",
        populate: { path: "lumps" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "imslaughter",
        populate: { path: "lumps" },
      })
      .populate({
        path: "quarter",
        populate: { path: "lumps" },
      })
      .sort({ status: "ASC" });
    if (args.sendAt) {
      cursor
        .find({
          sendAt: {
            $gte: dayjs(args.sendAt).startOf("D"),
            $lt: dayjs(args.sendAt).endOf("D"),
          },
        })
        .sort({ sendAt: "ASC" });
    }
    if (args.status) {
      cursor.find({
        status: args.status,
      });
    }
    return cursor;
  },
  LumpForCut: async (parent, args, context, info) => {
    if (!args.barcode) {
      const cursor = null;
      return cursor;
    }

    if (args.barcode) {
      const cursor = Lump.findOne({
        barcode: { $regex: args.barcode.toUpperCase() },
        sendAt: {
          $gte: dayjs().startOf("D"),
          $lt: dayjs().endOf("D"),
        },
      })
        .populate({
          path: "user",
          populate: { path: "lumps" },
        })
        .populate({
          path: "status",
        })
        .populate({
          path: "beeftype",
        })
        .populate({
          path: "imslaughter",
          populate: { path: "lumps" },
        })
        .populate({
          path: "quarter",
          populate: { path: "lumps" },
        })
        .sort({ sendAt: "ASC" });
      return cursor;
    }
  },
  SearchChop: async (parent, args, context, info) => {
    if (!args.lump) {
      const cursor = null;
      return cursor;
    }
    if (args.lump) {
      const cursor = Chop.find({
        lump: args.lump,
      })
        .populate({
          path: "user",
          populate: { path: "chops" },
        })
        .populate({
          path: "status",
        })
        .populate({
          path: "beeftype",
        })
        .populate({
          path: "imslaughter",
          populate: { path: "chops" },
        })
        .populate({
          path: "lump",
          populate: { path: "chops" },
        })
        .sort({ createdAt: "DESC" });
      return cursor;
    }
  },
  SearchBuy: async (parent, args, context, info) => {
    const cursor = Imslaughter.find({
      numkun: { $regex: args.numkun.trim() },
      statusIm: "5f0fdb6502b40c2ab8506565",
      // fees: { $eq: null },
      // importDate: {
      //   $gte: dayjs(args.importDate).startOf("D"),
      //   $lt: dayjs(args.importDate).endOf("D"),
      // }
    })
      .populate({
        path: "user",
        populate: { path: "imslaughters" },
      })
      .populate({
        path: "statusIm",
      })
      .populate({
        path: "statusCa",
      })
      .populate({
        path: "statusEn",
      })
      .sort({ fees: "ASC" });
    if (args.fees === "0") {
      cursor.find({
        fees: { $eq: null },
      });
    }
    if (args.fees === "1") {
      cursor.find({
        fees: { $nin: null },
      });
    }
    return cursor;
  },
  Card1: async (parent, args, context, info) => {
    const cursor = Imslaughter.find({
      importDate: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
      statusIm: "5f0fdb4b02b40c2ab8506563",
    });
    return cursor;
  },
  Cardregis: async (parent, args, context, info) => {
    const cursor = Imslaughter.find({
      date: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
      statusIm: "5f0fdb6502b40c2ab8506565",
    });
    return cursor;
  },
  CardWaitting: async (parent, args, context, info) => {
    const cursor = Importcowfarm.find({
      statusIm: "605af3da9c7419287cdb3138",
    });
    return cursor;
  },
  Cardtreat: async (parent, args, context, info) => {
    const cursor = Imslaughter.find({
      date :{
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
      statusIm: "5ff2e44a74a6e82d00686276",

    });
    return cursor;
  },
  Card1_5: async (parent, args, context, info) => {
    const cursor = Imslaughter.find({
      importslaughterDate: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
      statusCa: "5f0fdb7b02b40c2ab8506566",
    });
    return cursor;
  },
  Card2: async (parent, args, context, info) => {
    const cursor = Halve.find({
      sendAt: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
      status: "5f1155b2f34d6036d0515e3e",

    });
    return cursor;
  },
  Card3: async (parent, args, context, info) => {
    const cursor = Quarter.find({
      sendAt: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
      status: "5f3f2dd3b23ee40f9c84be07",
    });
    return cursor;
  },
  Card4: async (parent, args, context, info) => {
    const cursor = Lump.find({
      sendAt: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
      status: "5f4468d4f226042dc88ef334",
    });
    return cursor;
  },
  Card5: async (parent, args, context, info) => {
    const cursor = Imslaughter.find({
      fees: { $eq: null },
      statusIm: "5f0fdb6502b40c2ab8506565",
    });
    return cursor;
  },
  Card6: async (parent, args, context, info) => {
    const cursor = Imslaughter.find({
      importslaughterDate: {
        $gte: dayjs(new Date()).startOf("D"),
        $lt: dayjs(new Date()).endOf("D"),
      },
      statusEn: "5f0fdba202b40c2ab8506568",
    });
    return cursor;
  },
  Tracking: async (parent, args, context, info) => {
    if (!args.barcode) {
      return { barcode: null };
    }
    const chop = await Chop.findOne({
      barcode: args.barcode,
    })
      .populate({
        path: "user",
        populate: { path: "chops" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "imslaughter",
        populate: { path: "chops" },
      })
      .populate({
        path: "lump",
        populate: { path: "chops" },
      })
      .populate({
        path: "transports",
      })
      .sort({ createdAt: "DESC" });

    if (chop) {
      return {
        barcode: chop.barcode,
        beeftype: chop.beeftype.nameTH,
        grade: chop.imslaughter.grade,
        weight: chop.weight,
        price: chop.price,
        MFG: chop.createdAt,
        BBE: chop.BBE,
        farmer: chop.imslaughter.namefarmer,
        numcow: chop.imslaughter.numcow,
        numkun: chop.imslaughter.numkun,
        pun: chop.imslaughter.pun,
        age: "2 ปี 3 เดือน",
        weightcow: chop.imslaughter.weight,
        transports: chop.transports,
      };
    }
    // ---------------------------------------
    const lump = await Lump.findOne({
      barcode: args.barcode,
    })
      .populate({
        path: "user",
        populate: { path: "lumps" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "imslaughter",
        populate: { path: "lumps" },
      })
      .populate({
        path: "transports",
      })
      .populate({
        path: "quarter",
        populate: { path: "lumps" },
      });
    // console.log(lump);
    if (lump) {
      return {
        barcode: lump.barcode,
        beeftype: lump.beeftype.nameTH,
        grade: lump.imslaughter.grade,
        weight: lump.weight,
        price: lump.price,
        MFG: lump.createdAt,
        BBE: null,
        farmer: lump.imslaughter.namefarmer,
        numcow: lump.imslaughter.numcow,
        numkun: lump.imslaughter.numkun,
        pun: lump.imslaughter.pun,
        age: "2 ปี 3 เดือน",
        weightcow: lump.imslaughter.weight,
        transports: lump.transports,
      };
    }
    // ---------------------------------------
    const quarter = await Quarter.findOne({
      barcode: args.barcode,
    })
      .populate({
        path: "user",
        populate: { path: "quarters" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "imslaughter",
        populate: { path: "quarters" },
      })
      .populate({
        path: "transports",
      })
      .populate({
        path: "halve",
        populate: { path: "quarters" },
      });
    // console.log(quarter);
    if (quarter) {
      return {
        barcode: quarter.barcode,
        beeftype: quarter.beeftype.nameTH,
        grade: quarter.imslaughter.grade,
        weight: quarter.weight,
        price: quarter.price,
        MFG: quarter.createdAt,
        BBE: null,
        farmer: quarter.imslaughter.namefarmer,
        numcow: quarter.imslaughter.numcow,
        numkun: quarter.imslaughter.numkun,
        pun: quarter.imslaughter.pun,
        age: "2 ปี 3 เดือน",
        weightcow: quarter.imslaughter.weight,
        transports: quarter.transports,
      };
    }
    // ---------------------------------------
    const halve = await Halve.findOne({
      barcode: args.barcode,
    })
      .populate({
        path: "user",
        populate: { path: "halves" },
      })
      .populate({
        path: "imslaughter",
        populate: { path: "halves" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "transports",
      })
      .populate({
        path: "beeftype",
      });
    if (halve) {
      return {
        barcode: halve.barcode,
        beeftype: halve.beeftype.nameTH,
        grade: halve.imslaughter.grade,
        weight: halve.weightcool ? halve.weightcool : halve.weightwarm,
        price: null,
        MFG: halve.createdAt,
        BBE: null,
        farmer: halve.imslaughter.namefarmer,
        numcow: halve.imslaughter.numcow,
        numkun: halve.imslaughter.numkun,
        pun: halve.imslaughter.pun,
        age: "2 ปี 3 เดือน",
        weightcow: halve.imslaughter.weight,
        transports: halve.transports,
      };
    }
    return { barcode: null };
  },
  SlipChop: async (parent, args, context, info) => {
    const chop = await Chop.findOne({
      barcode: args.barcode,
    })
      .populate({
        path: "user",
        populate: { path: "chops" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "imslaughter",
        populate: { path: "chops" },
      })
      .populate({
        path: "lump",
        populate: { path: "chops" },
      })
      .sort({ createdAt: "DESC" });
    return chop;
  },
  SlipLump: async (parent, args, context, info) => {
    const lump = await Lump.findOne({
      barcode: args.barcode,
    })
      .populate({
        path: "user",
        populate: { path: "lumps" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "imslaughter",
        populate: { path: "lumps" },
      })
      .populate({
        path: "quarter",
        populate: { path: "lumps" },
      });
    return lump;
  },
  SlipQuarter: async (parent, args, context, info) => {
    const quarter = await Quarter.findOne({
      barcode: args.barcode,
    })
      .populate({
        path: "user",
        populate: { path: "quarters" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "imslaughter",
        populate: { path: "quarters" },
      })
      .populate({
        path: "halve",
        populate: { path: "quarters" },
      });
    return quarter;
  },
  SlipHalve: async (parent, args, context, info) => {
    const halve = await Halve.findOne({
      barcode: args.barcode,
    })
      .populate({
        path: "user",
        populate: { path: "halves" },
      })
      .populate({
        path: "imslaughter",
        populate: { path: "halves" },
      })
      .populate({
        path: "status",
      })
      .populate({
        path: "beeftype",
      });
    return halve;
  },
  SettingBeeftype2: async (parent, args, context, info) => {
    const cursor = Beeftype.find({
      codecount: { $lt: 3 },
    });
    return cursor;
  },
  SettingBeeftype4: async (parent, args, context, info) => {
    const cursor = Beeftype.find({
      codecount: { $gte: 3, $lt: 7 },
    });
    return cursor;
  },
  SettingBeeftype18: async (parent, args, context, info) => {
    const cursor = Beeftype.find({
      codecount: { $gte: 7 },
    });
    return cursor;
  },
  SettingBeeftypeCheck: async (parent, args, context, info) => {
    const cursor = Beeftype.find({
      codecount: { $gte: 7 },
    }).sort({ codecount: "DESC" });
    return cursor;
  },
  trace: (parent, args, context, info) => {
    const cursor = Imslaughter.findOne({
      numkun: args.numkun.trim(),
    })
      .populate({
        path: "halves",
        populate: { path: "quarters" },
        // populate: { path: "beeftype" },
      })
      .populate({
        path: "halves",
        populate: { path: "beeftype" },
        // populate: { path: "beeftype" },
      })
      .populate({
        path: "halves",
        populate: { path: "transports" },
        // populate: { path: "beeftype" },
      })
      .populate({
        path: "quarters",
        populate: { path: "lumps" },
      })
      .populate({
        path: "quarters",
        populate: { path: "beeftype" },
        // populate: { path: "beeftype" },
      })
      .populate({
        path: "quarters",
        populate: { path: "transports" },
        // populate: { path: "beeftype" },
      })
      .populate({
        path: "lumps",
        populate: { path: "chops" },
      })
      .populate({
        path: "lumps",
        populate: { path: "beeftype" },
        // populate: { path: "beeftype" },
      })
      .populate({
        path: "lumps",
        populate: { path: "transports" },
        // populate: { path: "beeftype" },
      })
      .populate({
        path: "chops",
        populate: { path: "beeftype" },
        // populate: { path: "beeftype" },
      })
      .populate({
        path: "chops",
        populate: { path: "transports" },
        // populate: { path: "beeftype" },
      });

    return cursor;
  },
  Reportim: async (parent, args, context, info) => {
    const cursor = Imslaughter.find({
      importDate: {
        $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
        $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
      },
      weight: { $ne: null },
    })
      .populate({
        path: "user",
        populate: { path: "imslaughters" },
      })
      .populate({
        path: "statusIm",
      })
      .populate({
        path: "statusCa",
      })
      .populate({
        path: "statusEn",
      })
      .sort({ importDate: "ASC" });
    if (!cursor) return null;
    return cursor;
  },
  Reportcuttwo: async (parent, args, context, info) => {
    const cursor = Halve.find({
      createdAt: {
        $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
        $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
      },
      weightwarm: { $ne: null },
    })
      .populate({
        path: "imslaughter",
        populate: { path: "halves" },
      })
      .populate({
        path: "beeftype",
      })
      .sort({ createdAt: "ASC" });
    if (!cursor) return null;
    return cursor;
  },
  Reportentrail: async (parent, args, context, info) => {
    const cursor = Entrail.find({
      createdAt: {
        $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
        $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
      },
    })
      .populate({
        path: "imslaughter",
      })
      .sort({ createdAt: "ASC" });
    if (!cursor) return null;
    return cursor;
  },
  Reportquarter: async (parent, args, context, info) => {
    const cursor = Quarter.find({
      createdAt: {
        $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
        $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
      },
    })
      .populate({
        path: "beeftype",
      })
      .sort({ createdAt: "ASC" });
    if (!cursor) return null;
    return cursor;
  },
  Reportlump: async (parent, args, context, info) => {
    const cursor = Lump.find({
      createdAt: {
        $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
        $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
      },
    })
      .populate({
        path: "imslaughter",
      })
      .populate({
        path: "beeftype",
      })
      .sort({ createdAt: "ASC" });
    if (!cursor) return null;
    return cursor;
  },
  Reportchop: async (parent, args, context, info) => {
    const cursor = Chop.find({
      createdAt: {
        $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
        $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
      },
    })
      .populate({
        path: "imslaughter",
      })
      .populate({
        path: "beeftype",
      })
      .sort({ createdAt: "ASC" });
    if (!cursor) return null;
    return cursor;
  },
  toslaughter: async (parent, args, context, info) => {
    const cursor = Imslaughter.find({
      $or: [
        { importDate: { $eq: null } },
        {
          importDate: {
            $gte: dayjs().subtract(1, "d").startOf("D"),
            $lt: dayjs().endOf("D"),
          },
        },
      ],
      // importDate: { $eq: null , $lt: dayjs().add(1,'d').endOf("D")},
      // importDate: { $lt: dayjs().add(2,'d').endOf("D")}
      // importslaughterDate: { $ne: null },
    })
      .populate({
        path: "user",
        populate: { path: "imslaughters" },
      })
      .populate({
        path: "statusIm",
      })
      .populate({
        path: "statusCa",
      })
      .populate({
        path: "statusEn",
      })
      .sort({ datebirhtday: "ASC" });
    if (!cursor) return null;
    return cursor;
  },
  Trackinginfo: (parent, args, context, info) => {
    const cursor = Imslaughter.findOne({
      numkun: args.numkun.trim(),
    })
      .populate({
        path: "feeds",
        // populate: { path: "beeftype" },
      })
      .populate({
        path: "treats",
        // populate: { path: "beeftype" },
      });

    // if (!cursor) return null;

    return cursor;
  },
  allDrug: (parent, args, context, info) => {
    const cursor = Drug.find({});

    return cursor;
  },
  allFood: (parent, args, context, info) => {
    const cursor = Foodset.find({type:"F1"});

    return cursor;
  },
  allFoodF2: (parent, args, context, info) => {
    const cursor = Foodset.find({type:"F2"});

    return cursor;
  },
  selectFood: (parent, args, context, info) => {
    // console.log("input : "+args.numkun.trim())
    const cursor = Foodset.find({
      type:{ $regex: args.type.trim()},

    })
    return cursor;
  },

  allDisease: (parent, args, context, info) => {
    const cursor = Disease.find({});

    return cursor;
  },
    datacow: (parent, args, context, info) => DataCow.findById(args.id),
    datacows: (parent, args, context, info) => DataCow.find({}),
    datatreat: (parent, args, context, info) => 
    Datatreat.findById(args.id).populate({
    path:"datacow" ,
    populate:{ path: "datatreats"}
  }),
    datatreats: (parent, args, context, info) =>  
    Datatreat.find().populate({
      path:"datacow" ,
      populate:{ path: "datatreats"}
    }),
    Reportgetin: async (parent, args, context, info) => {
      const cursor = Imslaughter.find({
        date: {
          $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
          $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
        },
      })
        .populate({
          path: "user",
          populate: { path: "imslaughters" },
        })
        .populate({
          path: "statusIm",
        })
        .populate({
          path: "statusCa",
        })
        .populate({
          path: "statusEn",
        })
        .sort({ date: "ASC" });
      if (!cursor) return null;
      return cursor;
    },
    Reportdead: (parent, args, context, info) => {
      // console.log("input : "+args.numkun.trim())
      const cursor = Imslaughter.find({
        importDateDead: {
          $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
          $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
        },
        statusIm: "601f968a8443a40c74357c2f"
      })
       .populate({
          path: "feeds",
          // populate: { path: "beeftype" },
        })
        .populate({
          path: "treats",
          // populate: { path: "beeftype" },
        })        .sort({ date: "ASC" });
         if (!cursor) return null;
         return cursor;
    },

    ReportgetGroup: async (parent, args, context, info) => {
      const cursor = Imslaughter.find({
        date: {
          $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
          $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
        },
        group:{ $regex: args.group.trim()},
        district:{ $regex: args.district.trim() },
        province:{ $regex: args.province.trim()},
        
      })
        .populate({
          path: "user",
          populate: { path: "imslaughters" },
        })
        .populate({
          path: "statusIm",
        })
        .populate({
          path: "statusCa",
        })
        .populate({
          path: "statusEn",
        })
        .sort({ date: "ASC" });
      if (!cursor) return null;
      return cursor;
    },
    ReportgetTreat: async (parent, args, context, info) => {
      const cursor = Imslaughter.find({
        date: {
          $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
          $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
        },
    treats: {$ne:[]},

      })
      .populate({
        path: "treats",
      })
        .populate({
          path: "user",
          populate: { path: "imslaughters" },
        })
        .populate({
          path: "statusIm",
        })
        .populate({
          path: "statusCa",
        })
        .populate({
          path: "statusEn",
        })
        .sort({ date: "ASC" });
      if (!cursor) return null;
      return cursor;
    },
    
    Selectcow: (parent, args, context, info) => {
      // console.log("input : "+args.numkun.trim())
      const cursor = Imslaughter.find({
        numkun: { $regex: args.numkun.trim() },
        statusIm: "5f0fdb6502b40c2ab8506565"
      })
       .populate({
          path: "feeds",
          // populate: { path: "beeftype" },
        })
        .populate({
          path: "treats",
          // populate: { path: "beeftype" },
        })
      return cursor;
    },
    Selecttreat: (parent, args, context, info) => {
      // console.log("input : "+args.numkun.trim())
      const cursor = Imslaughter.find({
        numkun: { $regex: args.numkun.trim() ,
        },
        // statusIm: { $regex: args.statusIm.trim() ,
        // },

      })
       .populate({
          path: "feeds",
          // populate: { path: "beeftype" },
        })
        .populate({
          path: "treats",
          // populate: { path: "beeftype" },
        }) .populate({
          path: "statusIm",
        })
        .populate({
          path: "statusCa",
        })
        .populate({
          path: "statusEn",
        })
        .sort({ statusIm: "ASC" });
        if (args.statusIm) {
          cursor.find({
            statusIm: args.statusIm,
          });
        }
      return cursor;
    },

    showDayslaugh: (parent, args, context, info) => {
      // console.log("input : "+args.numkun.trim())
      const cursor = Dayslaugh.find({})
       
      return cursor;
    },
    Selecttreatfarm: (parent, args, context, info) => {
      // console.log("input : "+args.numkun.trim())
      const cursor = Imslaughter.find({
        numkun: { $regex: args.numkun.trim() ,
        },
        // statusIm: { $regex: args.statusIm.trim() ,
        // },

      })
       .populate({
          path: "feeds",
          // populate: { path: "beeftype" },
        })
        .populate({
          path: "treats",
          // populate: { path: "beeftype" },
        }) .populate({
          path: "statusIm",
        })
        .populate({
          path: "statusCa",
        })
        .populate({
          path: "statusEn",
        })
        .sort({ statusIm: "ASC" });
        if (args.statusIm) {
          cursor.find({
            statusIm: args.statusIm,
          });
        }
      return cursor;
    },
    puntypeQuery: async (parent, args, context, info) => {
      const cursor = PunType.find({});
      return cursor;
    },
    Selectslaugerfarm: (parent, args, context, info) => {
      // console.log("input : "+args.numkun.trim())
      const cursor = Imslaughter.find({
        numkun: { $regex: args.numkun.trim() ,
        },
        // statusIm: { $regex: args.statusIm.trim() ,
        // },

      })
       .populate({
          path: "feeds",
          // populate: { path: "beeftype" },
        })
        .populate({
          path: "treats",
          // populate: { path: "beeftype" },
        }) .populate({
          path: "statusIm",
        })
        .populate({
          path: "statusCa",
        })
        .populate({
          path: "statusEn",
        })
        .sort({ statusIm: "ASC" });
        if (args.statusIm) {
          cursor.find({
            statusIm: args.statusIm,
          });
        }
      return cursor;
    },

};
//5f0fdb4b02b40c2ab8506563
export default Query;
