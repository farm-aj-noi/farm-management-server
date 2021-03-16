import Ad_provinces from "../../models/address/ad_provinces";
import Ad_amphures from "../../models/address/ad_amphures";
import Ad_districts from "../../models/address/ad_districts";
import Ad_zipcodes from "../../models/address/ad_zipcodes";

const Query = {
  get_provinces: async (parent) => {
    const cursor = Ad_provinces.find();
    return cursor;
  },
  get_amphures: async (parent, args) => {
    let province_id = args.province_id;
    const cursor = Ad_amphures.find({ province_id: { $regex: province_id } });
    return cursor;
  },
  get_districts: async (parent, args) => {
    let province_id = args.province_id;
    let amphur_id = args.amphur_id;
    const cursor = Ad_districts.find({
      province_id: { $regex: province_id },
      amphur_id: { $regex: amphur_id },
    });
    return cursor;
  },
  get_zipcodes: async (parent, args) => {
    let district_code = args.district_code;
    const cursor = Ad_zipcodes.find({
      district_code: district_code
    });
    return cursor;
  },
};

export default Query;
