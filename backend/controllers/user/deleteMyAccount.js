import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

/**
 * @description Delete My Account
 * @api DELETE /api/v1/user/profile
 * @access PRIVATE
 *
 */
const deleteMyAcccount = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  await User.findByIdAndDelete(userId);

  res.json({
    success: true,
    message: "Account delete successfully",
  });
});

export default deleteMyAcccount;
