import mongoose from "mongoose";

const ad_districtsSchema = new mongoose.Schema({
  district_id: {
    type: String,
    required: true,
  },
  district_code: {
    type: String,
    required: true,
  },
  district_name: {
    type: String,
    required: true,
  },
  district_name_eng: {
    type: String,
    required: true,
  },
  geo_id: {
    type: String,
    required: true,
  },
  province_id: {
    type: String,
    required: true,
  },
  amphur_id: {
    type: String,
    required: true,
  }

});

const Ad_districts = mongoose.model("Ad_districts", ad_districtsSchema);

export default Ad_districts;
