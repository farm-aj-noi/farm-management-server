import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import dayjs from "dayjs";

import User from "../../models/user";
import Product from "../../models/product";
import CartItem from "../../models/cartItem";
import Role from "../../models/role";
import Status from "../../models/status";
import Imslaughter from "../../models/imslaughter";
import Setting from "../../models/setting";
import Beeftype from "../../models/beeftype";
import Box from "../../models/box";
import Box2 from "../../models/box2";
import Counter from '../../models/identitycounter'

const Mutation = {
  createProduct: async (parent, args, { userId }, info) => {
    // const userId = "5e132cabae30211b84ad5d4f"

    // Check if user logged in
    if (!userId) throw new Error("Please log in.");

    if (!args.description || !args.price || !args.imageUrl) {
      throw new Error("Please provide all required fields.");
    }

    const product = await Product.create({ ...args, user: userId });
    const user = await User.findById(userId);

    if (!user.products) {
      user.products = [product];
    } else {
      user.products.push(product);
    }

    await user.save();

    return Product.findById(product.id).populate({
      path: "user",
      populate: { path: "products" },
    });
  },
  updateProduct: async (parent, args, { userId }, info) => {
    const { id, description, price, imageUrl } = args;

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    // Find product in database
    const product = await Product.findById(id);

    // TODO: Check if user is the owner of the product
    // const userId = "5e132cabae30211b84ad5d4f"

    if (userId !== product.user.toString()) {
      throw new Error("You are not authorized.");
    }

    // Form updated information
    const updateInfo = {
      description: !!description ? description : product.description,
      price: !!price ? price : product.price,
      imageUrl: !!imageUrl ? imageUrl : product.imageUrl,
    };

    // Update product in database
    await Product.findByIdAndUpdate(id, updateInfo);

    // Find the updated Product
    const updatedProduct = await Product.findById(id).populate({
      path: "user",
    });

    return updatedProduct;
  },
  addToCart: async (parent, args, { userId }, info) => {
    // id --> productId
    const { id } = args;

    if (!userId) throw new Error("Please log in.");

    try {
      // Find user who perform add to cart --> from logged in
      // const userId = "5e15cb313cc0bd1270a2180d"

      // Check if the new addToCart item is already in user.carts
      const user = await User.findById(userId).populate({
        path: "carts",
        populate: { path: "product" },
      });

      const findCartItemIndex = user.carts.findIndex(
        (cartItem) => cartItem.product.id === id
      );

      if (findCartItemIndex > -1) {
        // A. The new addToCart item is already in cart
        // A.1 Find the cartItem and update in database
        user.carts[findCartItemIndex].quantity += 1;

        await CartItem.findByIdAndUpdate(user.carts[findCartItemIndex].id, {
          quantity: user.carts[findCartItemIndex].quantity,
        });

        // A.2 Find updated cartItem
        const updatedCartItem = await CartItem.findById(
          user.carts[findCartItemIndex].id
        )
          .populate({ path: "product" })
          .populate({ path: "user" });

        return updatedCartItem;
      } else {
        // B. The new addToCart item is not in cart yet
        // B.1 Create new cartItem
        const cartItem = await CartItem.create({
          product: id,
          quantity: 1,
          user: userId,
        });

        // B.2 find new cartItem
        const newCartItem = await CartItem.findById(cartItem.id)
          .populate({ path: "product" })
          .populate({ path: "user" });

        // B.2 Update user.carts
        await User.findByIdAndUpdate(userId, {
          carts: [...user.carts, newCartItem],
        });

        return newCartItem;
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteCart: async (parent, args, { userId }, info) => {
    const { id } = args;

    // TODO: Check if user logged in
    if (!userId) throw new Error("Please log in.");

    // Find cart from given id
    const cart = await CartItem.findById(id);

    // TODO: user id from request --> Find user
    // const userId = "5e15cb313cc0bd1270a2180d"

    const user = await User.findById(userId);

    // Check ownership of the cart
    if (cart.user.toString() !== userId) {
      throw new Error("Not authorized.");
    }

    // Delete cart
    const deletedCart = await CartItem.findOneAndRemove(id);

    // Update user's carts
    const updatedUserCarts = user.carts.filter(
      (cartId) => cartId.toString() !== deletedCart.id.toString()
    );

    await User.findByIdAndUpdate(userId, { carts: updatedUserCarts });

    return deletedCart;
  },

  createBox: async (parent, args, { userId }, info) => {
    // Check if user logged in
    if (!userId) throw new Error("Please log in.");

    if (!args.name) {
      throw new Error("Please provide all required fields.");
    }

    // const BoxReset = 1
    // console.log(BoxReset)
    // if (BoxReset > 0){
    //   Box.resetSequence()
    // }

    return Box.create({ ...args });
  },
  createBox2: async (parent, args, { userId }, info) => {
    // Check if user logged in
    if (!userId) throw new Error("Please log in.");

    if (!args.name) {
      throw new Error("Please provide all required fields.");
    }


    const checkcount = await Counter.findOne({
      model: "Box2"
    })

    console.log(checkcount.count)
    //
    const SettingResetdate = await Setting.findOne({});
    const chaeckDate = await parseInt(dayjs().format("YYYYMMDD").toString());

    //  console.log(SettingResetdate.id)
    //  console.log(SettingResetdate.dateResetCount)
    //  console.log(chaeckDate)
    if (SettingResetdate.dateResetCount < chaeckDate) {
      await Box2.resetCount();
      const result = await Box2.create({ ...args });
      await Setting.findByIdAndUpdate(SettingResetdate.id, {
        dateResetCount: chaeckDate,
      });

      const DateCode = await dayjs().format("YYYYMMDD").toString();
      const count = result.count.toString().padStart(4, "0")
      const bar = DateCode + count
      // console.log(bar)


      return result;
    } else {
      const result = await Box2.create({ ...args });
      const DateCode = await dayjs().format("YYYYMMDD").toString();
      const count = result.count.toString().padStart(4, "0")
      const test = 'a1'.toUpperCase();
      // test.toUpperCase();
      const bar = DateCode +test+ count
      console.log(bar)
      return result;
    }
  },
  // งานจริงๆ
  
};

export default Mutation;
