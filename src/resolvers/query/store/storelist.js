
import BeefStore from "../../../models/Beefstore/beefstore";
import Imhalve from "../../../models/Beefstore/imhalve";
import Imquarter from "../../../models/Beefstore/imquarter";

import dayjs from "dayjs";
import Imlump from "../../../models/Beefstore/imlump";
import Imchop from "../../../models/Beefstore/imchop";
import Imentrail from "../../../models/Beefstore/imentrail";
import EntrailStore from "../../../models/Beefstore/entrailstore";
import Chill from "../../../models/Beefstore/chill";
import Halve from "../../../models/halve";
import Beefroom from "../../../models/Beefstore/beefroom";


const Query = {
    liststore: async (parent, args, context, info) =>{
      const cursor = await BeefStore.find({})
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
          populate: {path: "storestatus"}
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
          populate: {path: "storestatus"}
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
          populate: {path: "storestatus"}
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
          populate: {path: "storestatus"}
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
    
      if(cursor.length) {
        for (const item of cursor[0].imhalves){ 
            let data = {
            beeftypeid : item.halve.beeftype.id,
            id: 'halve',
            barcode: item.barcode,
            weightwarm: item.halve.weightwarm,
            importdate: item.importdate,
            beeftype: item.halve.beeftype.nameTH,
            cownum: item.halve.imslaughter.numcow,
            status: item.storestatus.nameTH,
            code: item.halve.beeftype.code,
            namefarmer: item.halve.imslaughter.namefarmer,
            beefroom: item.beefroom,
          }
          returnData.push(data)
        }
        ////////////////////////////////////////////////////////////
        for (const item of cursor[0].imquarters) {
          let data = {
            beeftypeid : item.quarter.beeftype.id,
            id: 'quarter',
            barcode: item.barcode,
            importdate: item.importdate,
            weight: item.quarter.weight,
            beeftype: item.quarter.beeftype.nameTH,
            cownum: item.quarter.imslaughter.numcow,
            code: item.quarter.beeftype.code,
            status: item.storestatus.nameTH,
            namefarmer: item.quarter.imslaughter.namefarmer
          }
          returnData.push(data)
        }
        ////////////////////////////////////////////////////////////
        for (const item of cursor[0].imlumps) {
          let data = {
            beeftypeid : item.lump.beeftype.id,
            id: 'lump',
            barcode: item.barcode,
            importdate: item.importdate,
            weight: item.lump.weight,
            beeftype: item.lump.beeftype.nameTH,
            cownum: item.lump.imslaughter.numcow,
            code: item.lump.beeftype.code,
            status: item.storestatus.nameTH,
            namefarmer: item.lump.imslaughter.namefarmer
          }
          returnData.push(data)
        }
        ////////////////////////////////////////////////////////////
        for (const item of cursor[0].imchops) {
          let data = {
            beeftypeid : item.chop.beeftype.id,
            id: 'chop',
            barcode: item.barcode,
            importdate: item.importdate,
            weight: item.chop.weight,
            beeftype: item.chop.beeftype.nameTH,
            cownum: item.chop.imslaughter.numcow,
            code: item.chop.beeftype.code,
            status: item.storestatus.nameTH,
            namefarmer: item.chop.imslaughter.namefarmer
          }
          returnData.push(data)
        }
      }
      returnData.sort((a , b) => b.importdate - a.importdate)
      if(args.beeftype){
        returnData = returnData.filter(e => e.beeftypeid == args.beeftype)
      }
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
      if (args.namefarmer){
        cursor.find({
          namefarmer: args.namefarmer,
        });
      }
      if (args.userName){
        cursor.find({
          userName: args.userName,
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
      if (args.namefarmer){
        cursor.find({
          namefarmer: args.namefarmer,
        });
      }
      if (args.userName){
        cursor.find({
          userName: args.userName,
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
      if (args.namefarmer){
        cursor.find({
          namefarmer: args.namefarmer,
        });
      }
      if (args.userName){
        cursor.find({
          userName: args.userName,
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
      if (args.namefarmer){
        cursor.find({
          namefarmer: args.namefarmer,
        });
      }
      if (args.userName){
        cursor.find({
          userName: args.userName,
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
      if (args.namefarmer){
        cursor.find({
          namefarmer: args.namefarmer,
        });
      }
      if (args.userName){
        cursor.find({
          userName: args.userName,
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
      if (args.namefarmer){
        cursor.find({
          namefarmer: args.namefarmer,
        });
      }
      if (args.userName){
        cursor.find({
          userName: args.userName,
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
      if (args.namefarmer){
        cursor.find({
          namefarmer: args.namefarmer,
        });
      }
      if (args.userName){
        cursor.find({
          userName: args.userName,
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
      if (args.namefarmer){
        cursor.find({
          namefarmer: args.namefarmer,
        });
      }
      if (args.userName){
        cursor.find({
          userName: args.userName,
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
      if (args.namefarmer){
        cursor.find({
          namefarmer: args.namefarmer,
        });
      }
      if (args.userName){
        cursor.find({
          userName: args.userName,
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
        populate: {path: "imslaughter"}
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
      if (args.namefarmer){
        cursor.find({
          namefarmer: args.namefarmer,
        });
      }
      if (args.userName){
        cursor.find({
          userName: args.userName,
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

    listchill: async (parent, args, context, info) =>{
      const cursor = Chill.find({
        storestatus: "6284ad73fbfac22364a6e430"
      })
      .populate({
        path: "user"
        
      })
      .populate({
        path: "halve",
        populate: {path: "beeftype"}
      })
      .populate({
        path: "halve",
        populate: {path: "imslaughter"}
      })
      .populate({
        path: "storestatus"
      })
      .populate({
        path: "chillroom"
      })
      .sort({ chilldate: "DESC"})
      if (args.beeftype){
        cursor.find({
          beeftype: args.beeftype,
          storestatus: "6284ad73fbfac22364a6e430"
        });
      }
      if (args.startdate){
        cursor.find({
          storestatus: "6284ad73fbfac22364a6e430",
          chilldate: {
            $gte: dayjs(args.startdate).add(0, "d").startOf("D"),
            $lt: dayjs(args.enddate).add(0, "d").endOf("D"),
          },  
        })
      }
      return cursor
    },

    allRoom: (parent, args, context, info) => {
      const cursor = Beefroom.find({});

      return cursor
    }


};
//5f0fdb4b02b40c2ab8506563
export default Query;
