import mongoose from "mongoose";

const ad_zipcodesSchema = new mongoose.Schema({
  zipcode_id: {
    type: String,
    required: true,
  },
  district_code: {
    type: String,
    required: true,
  },
  zipcode_name: {
    type: String,
    required: true,
  }

});

const Ad_zipcodes = mongoose.model("Ad_zipcodes", ad_zipcodesSchema);

export default Ad_zipcodes;
