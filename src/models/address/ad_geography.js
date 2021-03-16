import mongoose from "mongoose";

const ad_geographySchema = new mongoose.Schema({
  geo_id: {
    type: String,
    required: true,
  },
  geo_name: {
    type: String,
    required: true,
  }

});

const Ad_geography = mongoose.model("Ad_geography", ad_geographysSchema);

export default Ad_geography;
