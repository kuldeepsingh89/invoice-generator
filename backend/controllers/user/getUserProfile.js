import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

/**
 * @description Get User Profile
 * @api POST /api/v1/user/profile
 * @access PRIVATE
 *
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const userProfile = await User.findById(userId, {
    refreshToken: 0,
    roles: 0,
    _id: 0,
  }).lean();

  if (!userProfile) {
    res.status(204);
    throw new Error("User profile not found");
  }

  res.status(200).json({
    success: true,
    userProfile,
  });
});

export default getUserProfile;
