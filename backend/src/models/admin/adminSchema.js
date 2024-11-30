import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const adminSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      lowercase: true,
      trim: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      requires: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

adminSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});

adminSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.generateAccessTokens = function () {
  const payload = {
    _id: this._id,
    email: this.email,
    fullName: this.fullName,
  };

  const secretKey = process.env.ACCESS_TOKEN_SECRET;
  const options = {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  };
  return jwt.sign(payload, secretKey, options);
};

adminSchema.methods.generateRefreshTokens = function () {
  const payload = {
    _id: this._id,
  };
  const secretKey = process.env.REFRESH_TOKEN_SECRET;
  const options = {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  };
  return jwt.sign(payload, secretKey, options);
};

export const AdminUser = mongoose.model("AdminUser", adminSchema);
