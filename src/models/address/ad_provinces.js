import mongoose from "mongoose";

const ad_provincesSchema = new mongoose.Schema({
  province_id: {
    type: String,
    required: true,
  },
  province_code: {
    type: String,
    required: true,
  },
  province_name: {
    type: String,
    required: true,
  },
  province_name_eng: {
    type: String,
    required: true,
  },
  geo_id: {
    type: String,
    required: true,
  },

});

const Ad_provinces = mongoose.model("Ad_provinces", ad_provincesSchema);

export default Ad_provinces;
