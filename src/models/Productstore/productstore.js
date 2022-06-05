import mongoose from "mongoose";

const ProductStoreSchema = new mongoose.Schema({
  improduct: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Improduct",
    },
  ],
});
const ProductStore = mongoose.model("ProductStore", ProductStoreSchema);
export default ProductStore;
