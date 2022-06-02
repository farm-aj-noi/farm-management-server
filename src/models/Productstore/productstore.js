import mongoose from "mongoose";

const ProductStoreSchema = new mongoose.Schema({
  beefproduct: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductStore",
    },
  ],
});
const ProductStore = mongoose.model("ProductStore", ProductStoreSchema);
export default ProductStore;
