import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";

import User from "../../models/user";
import Role from "../../models/role";

const Mutation = {
  login: async (parent, args, context, info) => {
    const { email, password } = args;

    // Find user in database
    const user = await User.findOne({ email })
      .populate({
        path: "products",
        populate: { path: "user" },
      })
      .populate({ path: "carts", populate: { path: "product" } });

    if (!user) throw new Error("Email not found, please sign up.");

    // Validate password
    if (password.trim().length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) throw new Error("Invalid email or password.");

    const token = jwt.sign({ userId: user.id }, process.env.SECRET, {
      expiresIn: "7days",
    });

    return { user, jwt: token };
  },
  signup: async (parent, args, context, info) => {
    // Trim and lower case email
    const email = args.email.trim().toLowerCase();

    // Check if email already exist in database
    const currentUsers = await User.find({});
    const isEmailExist =
      currentUsers.findIndex((user) => user.email === email) > -1;

    if (isEmailExist) {
      throw new Error("Email already exist.");
    }

    // Validate password
    if (args.password.trim().length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    const password = await bcrypt.hash(args.password, 10);

    const roleId = "5f9aafb614611d05d4600724";

    const user = await User.create({ ...args, email, password, role: roleId });

    return User.findById(user.id)
      .populate({
        path: "products",
        options: { sort: { createdAt: "desc" } },
        populate: { path: "user" },
      })
      .populate({ path: "carts", populate: { path: "product" } })
      .populate({ path: "role" });
  },
  requestResetPassword: async (parent, { email }, context, info) => {
    // 1. Find user in database by email
    const user = await User.findOne({ email });

    // 2. If no user found, throw error
    if (!user) throw new Error("Email not found, please sign up instead.");

    // 3. Create resetPasswordToken and resetTokenExpiry
    const resetPasswordToken = randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 30 * 60 * 1000;

    // 4. Update user (save reset token and token expiry)
    await User.findByIdAndUpdate(user.id, {
      resetPasswordToken,
      resetTokenExpiry,
    });

    // 5. Send link for set password to user email
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // console.log(process.env.SENDGRID_API_KEY)

    const message = {
      from: "ttnrsorawxunyyjdcs@awdrt.com",
      to: user.email,
      subject: "Reset password link",
      html: `
        <div>
          <p>Please click the link below to reset your password.</p> \n\n
          <a href='http://localhost:3000/signin/resetpassword?resetToken=${resetPasswordToken}' target='blank' style={{color: 'blue'}}>Click to reset your password</a>
        </div>
      `,
    };

    sgMail
      .send(message)
      .then(() => {
        console.log("Message sent");
      })
      .catch((error) => {
        console.log(error.response.body);
        // console.log(error.response.body.errors[0].message)
      });

    // 6. Return message to frontend
    return { message: "Please check your email to proceed reset password." };
  },
  resetPassword: async (parent, { password, token }, context, info) => {
    // Find user in database by reset token
    const user = await User.findOne({ resetPasswordToken: token });

    // If no user found throw error
    if (!user) throw new Error("Invalid token, cannot reset password.");
    // const time = Date.now()

    // console.log(time)
    // console.log(user.resetTokenExpiry)

    // Check if token is expired
    const isTokenExpired = user.resetTokenExpiry < Date.now();

    // If token is expired throw error
    if (isTokenExpired)
      throw new Error("Time out Invalid token, cannot reset password.");

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user in database (save new hashed password, delete reset token and token expiry time)
    await User.findByIdAndUpdate(user.id, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetTokenExpiry: null,
    });

    // return message
    return {
      message: "You have successfully reset your password, please sign in.",
    };
  },
  createRole: async (parent, args, { userId }, info) => {
    // Check if user logged in
    // if (!userId) throw new Error("Please log in.");

    if (!args.nameTH || !args.nameEN) {
      throw new Error("Please provide all required fields.");
    }

    return Role.create({ ...args });
  },
};

export default Mutation;
