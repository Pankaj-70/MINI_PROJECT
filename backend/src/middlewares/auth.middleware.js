import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    // return next(new ApiError(401, "Unauthorized request: No token provided"));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -createdAt -updatedAt -__v"
    );

    if (!user) {
      return next(new ApiError(401, "Unauthorized request: User not found"));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(401, "Unauthorized request: Invalid token"));
  }
});
