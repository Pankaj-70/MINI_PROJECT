import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
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

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessTokens = function () {
  const payload = {
    _id: this._id,
    email: this.email,
    fullName: this.fullName,
    username: this.username,
  };

  const secretKey = process.env.ACCESS_TOKEN_SECRET;
  const options = {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  };
  return jwt.sign(payload, secretKey, options);
};

userSchema.methods.generateRefreshTokens = function () {
  const payload = {
    _id: this._id,
  };
  const secretKey = process.env.REFRESH_TOKEN_SECRET;
  const options = {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  };
  return jwt.sign(payload, secretKey, options);
};

export const User = mongoose.model("User", userSchema);
