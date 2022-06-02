import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  passsport: {
    type: String,
    required: true,
  },
  numaccount:{
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
   province: {
    type: String,
    required: true,
  },
    amphur:{
      type: String,
      required: true,
    },
     zipcode: {
      type: String,
      required: true,
    },
  resetPasswordToken: {
    type: String,
  },
  resetTokenExpiry: {
    type: Number,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  carts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CartItem",
    },
  ],
  createdAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },

  // งานจริงๆ
  statuses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
    },
  ],
  imslaughters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Imslaughter",
    },
  ],
  importcowfarm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Imslaughter",
    },
  ],
  halves: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Halve",
    },
  ],
  quarters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quarter",
    },
  ],
  lumps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lump",
    },
  ],
  chops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chop",
    },
  ],
  entrails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entrail",
    },
  ],
  imhalves: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Imhalve",
    },
  ],
  imquarters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Imquarter",
    },
  ],
  imlumps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Imlump",
    },
  ],
  imchops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Imchop",
    },
  ],
  beefproduct: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beefproduct",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
