import mongoose from "mongoose";

const ad_amphuresSchema = new mongoose.Schema({
  amphur_id: {
    type: String,
    required: true,
  },
  amphur_code: {
    type: String,
    required: true,
  },
  amphur_name: {
    type: String,
    required: true,
  },
  amphur_name_eng: {
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
  }

});

const Ad_amphures = mongoose.model("Ad_amphures", ad_amphuresSchema);

export default Ad_amphures;
