import { asyncHandler } from "../../utils/asyncHandler.js";
import { AdminUser } from "../../models/admin/adminSchema.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { User } from "../../models/userSchema.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, fullName, password } = req.body;

  if ([fullName, email, password].some((field) => field?.trim() === "")) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  const existedUser = await AdminUser.findOne({ email });
  if (existedUser) {
    return res
      .status(400)
      .json(new ApiError(400, "User is already registered"));
  }

  const createdUser = await AdminUser.create({ fullName, email, password });
  const user = await AdminUser.findById(createdUser._id).select("-password");

  if (!user) {
    return res
      .status(500)
      .json(new ApiError(500, "Something went wrong from server side"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Registered Successfully"));
});

const generateAccessRefreshTokens = async (userId) => {
  try {
    const user = await AdminUser.findById(userId);
    const accessToken = user.generateAccessTokens();
    const refreshToken = user.generateRefreshTokens();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error in generating tokens");
    console.log(error);
    throw new ApiError(
      500,
      "Something went wrong in generating access and refresh tokens"
    );
  }
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  const user = await AdminUser.findOne({ email });
  if (!user) {
    return res.status(404).json(new ApiError(404, "User not registered yet"));
  }

  const isPasswordValid = user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res.status(401).json(new ApiError(401, "Invalid credentials"));
  }

  const { accessToken, refreshToken } = await generateAccessRefreshTokens(
    user._id
  );
  const loggedInUser = await AdminUser.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(400).json({ message: "User not found" });
  }

  await AdminUser.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

const getLoginUser = asyncHandler(async (req, res) => {
  const totalUsers = User.length;
  return res.status(200).json({
    user: req.user,
    message: "current user fetched successfully",
    totalUsers: totalUsers,
  });
});

export { registerUser, loginUser, logoutUser, getLoginUser };
