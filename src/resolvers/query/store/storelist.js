
import BeefStore from "../../../models/Beefstore/beefstore";
import Imhalve from "../../../models/Beefstore/imhalve";
import Imquarter from "../../../models/Beefstore/imquarter";

import dayjs from "dayjs";
import Imlump from "../../../models/Beefstore/imlump";
import Imchop from "../../../models/Beefstore/imchop";
import Imentrail from "../../../models/Beefstore/imentrail";
import EntrailStore from "../../../models/Beefstore/entrailstore";


const Query = {

    liststore: async (parent, args, context, info) =>{
      let result = await BeefStore.find({})
      .populate({
          path: "imhalves",
          populate: {path: "halve"}
      })
     /* .populate({
          path: "imhalves",
          populate: {path: "user", 
          populate: {path: "curings"}}
      }) */
      .populate({
          path: "imhalves",
          populate: {path: "halve", 
          populate: {path: "storestatus"}}
      })
      .populate({
          path: "imhalves",    
          populate: {path: "halve", 
          populate: {path: "imslaughter"}}
      })
      .populate({
        path: "imhalves",    
        populate: {path: "halve", 
        populate: {path: "beeftype"}}
      })
      ///////////////////////////////////////
      .populate({
          path: "imquarters",
          populate: {path: "quarter"}
      })
       .populate({
          path: "imquarters",
          populate: {path: "quarter", 
          populate: {path: "storestatus"}}
      })
      .populate({
          path: "imquarters",    
          populate: {path: "quarter", 
          populate: {path: "imslaughter"}}
      })
      .populate({
          path: "imquarters",
          populate: {path: "quarter", 
          populate: {path: "beeftype"}}
      })
      /////////////////////////////////////
      .populate({
          path: "imlumps",
          populate: {path: "lump"}
      })
      .populate({
          path: "imlumps",
          populate: {path: "lump", 
          populate: {path: "storestatus"}}
      })
      .populate({
          path: "imlumps",    
          populate: {path: "lump", 
          populate: {path: "imslaughter"}}
      })
      .populate({
          path: "imlumps",
          populate: {path: "lump", 
          populate: {path: "beeftype"}}
      })
      /////////////////////////////////////
      .populate({
          path: "imchops",
          populate: {path: "chop"}
      })
      .populate({
          path: "imchops",
          populate: {path: "chop", 
          populate: {path: "storestatus"}}
      })
      .populate({
          path: "imchops",    
          populate: {path: "chop", 
          populate: {path: "imslaughter"}}
      })
      .populate({
          path: "imchops",
          populate: {path: "chop", 
          populate: {path: "beeftype"}}
      })
      var returnData = []
  
      console.log(result)
      if(result.length) {
        for (const item of result[0].imhalves) {
          console.log(item.halve)
          let data = {
            id: 'halve',
            barcode: item.barcode,
            weightwarm: item.halve.weightwarm,
            importdate: item.importdate,
            beeftype: item.halve.beeftype.nameTH,
            cownum: item.halve.imslaughter.numcow,
            status: item.halve.storestatus.nameTH,
            code: item.halve.beeftype.code,
            namefarmer: item.halve.imslaughter.namefarmer
            /* oom: item.halve[0].curing.cureroom.room */
          }
          returnData.push(data)
        }
        ////////////////////////////////////////////////////////////
        for (const item of result[0].imquarters) {
          let data = {
            id: 'quarter',
            barcode: item.barcode,
            importdate: item.importdate,
            weight: item.quarter.weight,
            beeftype: item.quarter.beeftype.nameTH,
            cownum: item.quarter.imslaughter.numcow,
            code: item.quarter.beeftype.code,
            status: item.quarter.storestatus.nameTH,
            namefarmer: item.quarter.imslaughter.namefarmer
          }
          returnData.push(data)
        }
        ////////////////////////////////////////////////////////////
        for (const item of result[0].imlumps) {
          let data = {
            id: 'lump',
            barcode: item.barcode,
            importdate: item.importdate,
            weight: item.lump.weight,
            beeftype: item.lump.beeftype.nameTH,
            cownum: item.lump.imslaughter.numcow,
            code: item.lump.beeftype.code,
            status: item.lump.storestatus.nameTH,
            namefarmer: item.lump.imslaughter.namefarmer
          }
          returnData.push(data)
        }
        ////////////////////////////////////////////////////////////
        for (const item of result[0].imchops) {
          let data = {
            id: 'chop',
            barcode: item.barcode,
            importdate: item.importdate,
            weight: item.chop.weight,
            beeftype: item.chop.beeftype.nameTH,
            cownum: item.chop.imslaughter.numcow,
            code: item.chop.beeftype.code,
            status: item.chop.storestatus.nameTH,
            namefarmer: item.chop.imslaughter.namefarmer
          }
          returnData.push(data)
        }
      }
  
      returnData.sort((a , b) => b.importdate - a.importdate)
      
      return returnData
    },

    listentrail: async (parent, args, context, info) =>{
      let result = await EntrailStore.find({})
      .populate({
        path: "imentrails",
        populate: {path: "entrail"}
      })
      .populate({
          path: "imentrails",    
          populate: {path: "entrail", 
          populate: {path: "imslaughter"}}
      })

      var returnData = []
      console.log(result)
        for (const item of result[0].imentrails) {
          let data = {
            id: 'entrail',
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
            scrap: item.entrail.scrap
          }
          returnData.push(data)
        }
        returnData.sort((a , b) => b.importdate - a.importdate)
      
        return returnData
    },

    imhalveSearch: async (parent, args, context, info) =>{
      const cursor = Imhalve.find({
        name: 'นำเข้า'
      })
      .populate({
        path: "user",
        populate: {path: "imhalves"}
      })
      /* .populate({
        path: "user",
        populate: {path: "curings"}
      }) */
      .populate({
        path: "halve",
        populate: {path: "status"}
      })
      .populate({
        path: "halve",    
        populate: {path: "imslaughter",}
      })
      .populate({
        path: "halve",
        populate: {path: "beeftype"}
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "beeftypechange"
      })
      .populate({
        path: "storestatus"
      })
      
      /* .populate({
        path: "halve",
        populate: {path: "curing", populate: {path: "cureroom"}}
      }) */
      .sort({ importdate: "DESC"})
      if (args.beeftype){
        cursor.find({
          beeftype: args.beeftype,
        });
      }
      if (args.startdate){
        cursor.find({
          importdate: {
            $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
            $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
          },  
        })
      }
      return cursor;
    },

    imquartSearch: async (parent, args, context, info) =>{
      const cursor = Imquarter.find({
        name: 'นำเข้า'
      })
      .populate({
        path: "user",
        populate: {path: "imquarter"}
      })
      .populate({
        path: "quarter",
        populate: {path: "status"}
      })
      .populate({
        path: "quarter",    
        populate: {path: "imslaughter",}
      })
      .populate({
        path: "quarter",
        populate: {path: "beeftype"}
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "beeftypechange"
      })
      .populate({
        path: "storestatus"
      })
      .sort({ importdate: "DESC"})
      if (args.beeftype){
        cursor.find({
          beeftype: args.beeftype,
        });
      }
      if (args.startdate){
        cursor.find({
          importdate: {
            $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
            $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
          },  
        })
      }
      
      return cursor;
    },

    exporthalve: async (parent, args, context, info) =>{
      const cursor = Imhalve.find({
        name: 'นำออก'
      })
      .populate({
        path: "user",
        populate: {path: "imhalves"}
      })
      /* .populate({
        path: "user",
        populate: {path: "curings"}
      }) */
      .populate({
        path: "halve",
        populate: {path: "status"}
      })
      .populate({
        path: "halve",    
        populate: {path: "imslaughter",}
      })
      .populate({
        path: "halve",
        populate: {path: "beeftype"}
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "beeftypechange"
      })
      .populate({
        path: "storestatus"
      })
      
      /* .populate({
        path: "halve",
        populate: {path: "curing", populate: {path: "cureroom"}}
      }) */
      .sort({ exportdate: "DESC"})
      if (args.beeftype){
        cursor.find({
          beeftype: args.beeftype,
        });
      }
      if (args.startdate){
        cursor.find({
          exportdate: {
            $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
            $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
          },  
        })
      }
      return cursor;
    },

    exportquart: async (parent, args, context, info) =>{
      const cursor = Imquarter.find({
        name: 'นำออก'
      })
      .populate({
        path: "user",
        populate: {path: "imquarters"}
      })
      .populate({
        path: "quarter",
        populate: {path: "status"}
      })
      .populate({
        path: "quarter",    
        populate: {path: "imslaughter",}
      })
      .populate({
        path: "quarter",
        populate: {path: "beeftype"}
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "beeftypechange"
      })
      .populate({
        path: "storestatus"
      })
      .sort({ exportdate: "DESC"})
      if (args.beeftype){
        cursor.find({
          beeftype: args.beeftype,
        });
      }
      if (args.startdate){
        cursor.find({
          exportdate: {
            $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
            $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
          },  
        })
      }
      
      return cursor;
    },

    imlumpSearch: async (parent, args, context, info) =>{
      const cursor = Imlump.find({
        name: 'นำเข้า'
      })
      .populate({
        path: "user",
        populate: {path: "imlumps"}
      })
      .populate({
        path: "lump",
        populate: {path: "status"}
      })
      .populate({
        path: "lump",    
        populate: {path: "imslaughter",}
      })
      .populate({
        path: "lump",
        populate: {path: "beeftype"}
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "beeftypechange"
      })
      .populate({
        path: "storestatus"
      })
      .sort({ importdate: "DESC"})
      if (args.beeftype){
        cursor.find({
          beeftype: args.beeftype,
        });
      }
      if (args.startdate){
        cursor.find({
          importdate: {
            $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
            $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
          },  
        })
      }
      
      return cursor;
    },

    exportlump: async (parent, args, context, info) =>{
      const cursor = Imlump.find({
        name: 'นำออก'
      })
      .populate({
        path: "user",
        populate: {path: "imlumps"}
      })
      .populate({
        path: "lump",
        populate: {path: "status"}
      })
      .populate({
        path: "lump",    
        populate: {path: "imslaughter",}
      })
      .populate({
        path: "lump",
        populate: {path: "beeftype"}
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "beeftypechange"
      })
      .populate({
        path: "storestatus"
      })
      .sort({ exportdate: "DESC"})
      if (args.beeftype){
        cursor.find({
          beeftype: args.beeftype,
        });
      }
      if (args.startdate){
        cursor.find({
          exportdate: {
            $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
            $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
          },  
        })
      }
      
      return cursor;
    },
      
    imchopSearch: async (parent, args, context, info) =>{
      const cursor = Imchop.find({
        name: 'นำเข้า'
      })
      .populate({
        path: "user",
        populate: {path: "imchops"}
      })
      .populate({
        path: "chop",
        populate: {path: "status"}
      })
      .populate({
        path: "chop",    
        populate: {path: "imslaughter",}
      })
      .populate({
        path: "chop",
        populate: {path: "beeftype"}
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "storestatus"
      })
      .sort({ importdate: "DESC"})
      if (args.beeftype){
        cursor.find({
          beeftype: args.beeftype,
        });
      }
      if (args.startdate){
        cursor.find({
          importdate: {
            $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
            $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
          },  
        })
      }
      
      return cursor;
    },

    exportchop: async (parent, args, context, info) =>{
      const cursor = Imchop.find({
        name: 'นำออก'
      })
      .populate({
        path: "user",
        populate: {path: "imchops"}
      })
      .populate({
        path: "chop",
        populate: {path: "status"}
      })
      .populate({
        path: "chop",    
        populate: {path: "imslaughter",}
      })
      .populate({
        path: "chop",
        populate: {path: "beeftype"}
      })
      .populate({
        path: "beeftype",
      })
      .populate({
        path: "storestatus"
      })
      .sort({ exportdate: "DESC"})
      if (args.beeftype){
        cursor.find({
          beeftype: args.beeftype,
        });
      }
      if (args.startdate){
        cursor.find({
          exportdate: {
            $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
            $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
          },  
        })
      }
      
      return cursor;
    },

    imentrailSearch: async (parent, args, context, info) =>{
      const cursor = Imentrail.find({
        name: 'นำเข้า'
      })
      .populate({
        path: "user",
        populate: {path: "imentrails"}
      })
      .populate({
        path: "entrail",    
        populate: {path: "imslaughter",}
      })
      .populate({
        path: "storestatus"
      })
      .sort({ importdate: "DESC"})
      if (args.beeftype){
        cursor.find({
          beeftype: args.beeftype,
        });
      }
      if (args.startdate){
        cursor.find({
          importdate: {
            $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
            $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
          },  
        })
      }
      
      return cursor;
    },

    exportentrail: async (parent, args, context, info) =>{
      const cursor = Imentrail.find({
        name: 'นำออก'
      })
      .populate({
        path: "user",
        populate: {path: "imentrails"}
      })
      .populate({
        path: "entrail",    
        populate: {path: "imslaughter",}
      })
      .populate({
        path: "storestatus"
      })
      .sort({ exportdate: "DESC"})
      if (args.beeftype){
        cursor.find({
          beeftype: args.beeftype,
        });
      }
      if (args.startdate){
        cursor.find({
          exportdate: {
            $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
            $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
          },  
        })
      }
      
      return cursor;
    },

   

  




      
};
//5f0fdb4b02b40c2ab8506563
export default Query;
