
import BeefStore from "../../../models/Beefstore/beefstore";
import Imhalve from "../../../models/Beefstore/imhalve";
import Imquarter from "../../../models/Beefstore/imquarter";

import dayjs from "dayjs";


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
          populate: {path: "status"}}
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
      .populate({
          path: "imquarters",
          populate: {path: "quarter"}
      })
       .populate({
          path: "imquarters",
          populate: {path: "quarter", 
          populate: {path: "status"}}
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
            status: item.halve.status.nameTH,
            code: item.halve.beeftype.code
            /* oom: item.halve[0].curing.cureroom.room */
          }
          
          returnData.push(data)
        }
        for (const item of result[0].imquarters) {
          let data = {
            id: 'quarter',
            barcode: item.barcode,
            importdate: item.importdate,
            weight: item.quarter.weight,
            beeftype: item.quarter.beeftype.nameTH,
            cownum: item.quarter.imslaughter.numcow,
            code: item.quarter.beeftype.code,
            status: item.quarter.status.nameTH
          }
          
          returnData.push(data)
        }
      }
  
      returnData.sort((a , b) => b.importdate - a.importdate)
      
      return returnData
    },

    imhalveSearch: async (parent, args, context, info) =>{
      const cursor = Imhalve.find({
        
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


};
//5f0fdb4b02b40c2ab8506563
export default Query;
